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
import MyMsg from "../../../utils/MsgDesc";
import { registerService } from "../../../services/auth";
const reffer = localStorage.getItem("refer");
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const initialValues = {
  username: "",
  email: "",
  password: generateRandomInteger(11111111, 99999999),
  refer: reffer,
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراگتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراگتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراگتر باشد."),
  email: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate) => {
  const res = await registerService(values);
  if (res.status == 200) {
    localStorage.setItem("loginToken", JSON.stringify(res.data));

    window.location.reload();
  } else {
    Alert("متاسفم...!", res.data.message, "error");
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
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
                ثبت نام در گلکسی
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
                type="email"
                name="email"
                label="ایمیل"
                labelcolor={prop.labelcolor}
                size={prop.size}
              />

              <Divider inverted />
              <MyMsg
                icon="info"
                color="red"
                text="کلمه عبور به ایمیل شما ارسال خواهد شد. لطفا در وارد کردن آن
        دقت نمایید."
              />

              <Button
                content="ساخت اکانت"
                fluid
                type="submit"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
                size="huge"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
