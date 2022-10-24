import React, { useState } from "react";
import {
  Label,
  Input,
  Header,
  Divider,
  Icon,
  Button,
  Segment,
  Message,
} from "semantic-ui-react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import { loginService } from "../../../services/auth";
import { checkBlock } from "../../../services/httpService";

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  var loginToken;

  try {
    loginToken = JSON.parse(localStorage.getItem("loginToken"));
  } catch (error) {}
  return (
    <Segment
      inverted
      padded="very"
      style={{
        paddingBottom: 50,
        boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
      }}
    >
      <Header as="h2" inverted className="farsi">
        قطع ارتباط با سرور
      </Header>
      <Divider hidden />

      <p className="farsi">
        ارتباط شما با سرور گلکسی قطع شده است. برای اتصال مجدد از دکمه زیر
        استفاده نمایید.
      </p>
      <Divider inverted />
      <Button
        content="اتصال مجدد"
        fluid
        type="button"
        size="huge"
        style={{ margin: "10px 0" }}
        disabled={depMode}
        loading={depMode}
        onClick={() => {
          checkBlock(loginToken);
          setDepMode(true);
        }}
        className="farsi"
        color="red"
      />
    </Segment>
  );
};

export default depositArea;
