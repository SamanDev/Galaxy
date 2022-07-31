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
import { forgetPasswordService } from "../../../services/auth";
import MyMsg from "../../../utils/MsgDesc";
const initialValues = {
  email: "",
  password: "",
  newPassword: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 6 کاراگتر باشد.")
    .min(6, "کلمه عبور حداقل باشد 6 کاراگتر باشد."),
  newPassword: Yup.string()
    .required("کلمه عبور حداقل باشد 6 کاراگتر باشد.")
    .min(6, "کلمه عبور حداقل باشد 6 کاراگتر باشد."),
});
const onSubmit = async (values, submitMethods, navigate) => {
  try {
    const res = await forgetPasswordService(values);
    if (res.status == 200) {
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
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
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
                بازیابی کلمه عبور
              </Header>
              <Divider hidden />

              <AuthFormikControl
                formik={formik}
                control="input"
                type="email"
                name="email"
                label="ایمیل"
                labelcolor="orange"
                size={prop.size}
              />
              <Divider inverted />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                label=" کلمه عبور جدید"
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
                size={prop.size}
              />
              <Divider inverted />
              <MyMsg
                icon="unlock"
                color="red"
                text="لینک  تایید به ایمیل شما ارسال خواهد شد. پس از کلیک روی آن کلمه عبور شما تفییر خواهد کرد."
              />

              <Button
                content="ارسال لینک  تایید"
                fluid
                type="submit"
                size="huge"
                style={{ margin: "10px 0" }}
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                className="farsi"
                color="orange"
              />
            </Segment>
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
