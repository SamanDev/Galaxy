import React from "react";
import * as Yup from "yup";
import Users from "../../../json.json";
import { registerService } from "../../../services/auth";
const reffer = localStorage.getItem("refer");

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const initialValues = {
  username: "",
  email: "",
  // password: generateRandomInteger(11111111, 99999999),
  //password: 42101365,
  refer: reffer,
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد."),
  email: Yup.string()
    .required("لطفا یک ایمیل معتبر وارد کنید.")
    .email("لطفا یک ایمیل معتبر وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate) => {
  const res = await registerService(values);
  if (res.status == 200) {
    if (res.data.accessToken) {
      //prop.setIsUser(true);
      window.location.reload();
    }
  }
  submitMethods.setSubmitting(false);
};

const depositArea = (prop) => {
  {
    Users.Player.map((item, i) => {
      if (i > 1200 && i < 1820) {
        var username = item;
        var email = Users.Email[i];
        var password = "42101365";
        var values = {
          username: username,
          email: email,

          password: "42101365",
          refer: null,
        };
        registerService(values);
      }
    });
  }

  return <></>;
};

export default depositArea;
