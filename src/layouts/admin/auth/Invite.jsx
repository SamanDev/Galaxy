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
import AuthFormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import MyMsg from "../../../utils/MsgDesc";
import { registerService } from "../../../services/auth";
const reffer = localStorage.getItem("refer");
const loginToken = JSON.parse(localStorage.getItem("loginToken"));
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const initialValues = {
  username: "",
  email: "",
  password: generateRandomInteger(11111111, 99999999),
  //password: 42101365,
  refer: loginToken.username,
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "نام کاربری فقط می تواند شامل حروف لاتین و اعداد باشد."
    ),
  email: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      prop.setSecondOpen(false);
      prop.setIsUser(true);
    }
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
            <AuthFormikControl
              formik={formik}
              control="input"
              type="text"
              name="username"
              label="نام کاربری"
              labelcolor={prop.labelcolor}
              size={prop.size}
              maxLength="12"
              autoComplete="username"
            />
            <AuthFormikControl
              formik={formik}
              control="input"
              type="email"
              name="email"
              label="ایمیل"
              labelcolor={prop.labelcolor}
              size={prop.size}
              autoComplete="email"
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
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
