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

const initialValues = {
  username: "",
  email: "",
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
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
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
              <Message
                color="yellow"
                compact
                className="mymessage"
                size="mini"
                icon
              >
                <Icon
                  circular
                  inverted
                  color="black"
                  name="info"
                  style={{ fontSize: 20 }}
                />

                <Message.Content className="farsi">
                  کلمه عبور به ایمیل شما ارسال خواهد شد. لطفا در وارد کردن آن
                  دقت نمایید.
                </Message.Content>
              </Message>

              <Button
                content="ساخت اکانت"
                fluid
                type="submit"
                size={prop.size}
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="red"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
