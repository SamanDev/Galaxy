import React, { useState } from "react";
import { Label, Header, Divider, Button, Segment } from "semantic-ui-react";
import AuthFormikControl from "../../../components/authForm/AuthFormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import { loginService } from "../../../services/auth";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد."),

  password: Yup.string()
    .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
    .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    var _newValues = values;
    _newValues.username = _newValues.username.trim();

    const res = await loginService(_newValues);
    if (res.status == 200) {
      if (res.data.accessToken) {
        if (res.data.userBlock) {
          Alert("متاسفم...!", "اکانت شما مسدود می باشد.", "error");
        } else {
          prop.setIsUser(true);
          //window.location.reload();
        }
      }
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
                maxLength="12"
                autoComplete="username"
              />
              <AuthFormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                label=" کلمه عبور"
                labelcolor={prop.labelcolor}
                size={prop.size}
                autoComplete="password"
              />

              <Label
                color="black"
                className="farsi-inline"
                style={{
                  textAlign: "right",
                  display: "block",
                  padding: "20px 10px",
                  cursor: "pointer",
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
                size="huge"
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
