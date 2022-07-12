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

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراگتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراگتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراگتر باشد."),
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 6 کاراگتر باشد.")
    .min(6, "کلمه عبور حداقل باشد 6 کاراگتر باشد."),
});
const onSubmit = async (values, submitMethods, navigate) => {
  console.log(values);
  try {
    const res = await loginService(values);
    if (res.status == 200) {
      localStorage.setItem("loginToken", JSON.stringify(res.data));
      navigate("/");
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 200,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">
                ورود به گلکسی
              </Header>
              <Divider hidden />

              <AuthFormikControl
                formik={formik}
                control="input"
                type="text"
                name="username"
                label="نام کاربری"
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                label=" کلمه عبور"
                labelcolor={prop.labelcolor}
                size={prop.size}
              />

              <Label
                color="black"
                className="farsi-inline"
                style={{
                  textAlign: "right",
                  display: "block",
                  padding: "10px 10px",
                }}
                size="mini"
                onClick={() => {
                  prop.setFirstOpen(false);
                  prop.setThirdOpen(true);
                }}
              >
                کلمه عبور را فراموش کرده اید؟
              </Label>

              <Button
                content="ورود"
                fluid
                type="submit"
                size={prop.size}
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="red"
              />
              <Divider inverted />

              <Button
                color="black"
                fluid
                className="farsi-inline"
                size="mini"
                onClick={() => {
                  prop.setFirstOpen(false);
                  prop.setSecondOpen(true);
                }}
              >
                اکانت ندارید؟ ثبت نام کنید
              </Button>
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
