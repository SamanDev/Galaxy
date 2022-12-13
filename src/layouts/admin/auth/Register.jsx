import React, { useState } from "react";
import { Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
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
  //password: 42101365,
  refer: reffer,
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
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 6 کاراکتر باشد.")
    .min(6, "کلمه عبور حداقل باشد 6 کاراکتر باشد.")

    .matches(/(?=.*\d)/, "کلمه عبور حتما باید شامل یک عدد باشد.")

    .matches(/((?=.*[A-Z]){1})/, "کلمه عبور حتما باید شامل یک حرف بزرگ باشد.")
    .matches(/(?=.*\W)/, "کلمه عبور حتما باید شامل علامت (?!@...) باشد."),
  newPassword: Yup.string()

    .required("کلمه عبور حداقل باشد 6 کاراکتر باشد.")

    .oneOf([Yup.ref("password"), null], "کلمه های عبور باید مطابقت ندارند."),
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
            <Segment
              inverted
              padded="very"
              className="fadeout"
              style={{
                paddingBottom: 300,

                boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
              }}
            >
              <Header as="h2" inverted className="farsi">
                ثبت نام در گلکسی
              </Header>
              <Divider hidden />
              <MyMsg
                icon="sign language"
                color="black"
                text={
                  <>
                    از اینکه برای ایجاد کاربر در سایت گلکسی اقدام کردید بسیار
                    سپاس گذاریم.
                    {reffer && (
                      <>
                        <br />
                        شما توسط کاربر {reffer} دعوت شده اید.
                      </>
                    )}
                  </>
                }
              />
              <Divider inverted />

              <Divider inverted />
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
              <Divider inverted />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                autoComplete="new-password"
                label=" کلمه عبور "
                labelcolor={prop.labelcolor}
                size={prop.size}
              />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="newPassword"
                label="تکرار کلمه عبور"
                labelcolor={prop.labelcolor}
                autoComplete="new-password"
                size={prop.size}
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
