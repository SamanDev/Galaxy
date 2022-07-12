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
  Select,
} from "semantic-ui-react";
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";
import FormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";

import CashoutButton from "../input/CashoutButton";
import List from "../../../pages/dashboard/List";
import SelectInput from "../input/Select";
const SelectB =
  "بانک ملّی ایران,بانک اقتصاد نوین,بانک قرض‌الحسنه مهر ایران,بانک سپه,بانک پارسیان,بانک قرض‌الحسنه رسالت,بانک صنعت و معدن,بانک کارآفرین,بانک کشاورزی,بانک سامان,بانک مسکن,بانک سینا,بانک توسعه صادرات ایران,بانک خاور میانه,بانک توسعه تعاون,بانک شهر,پست بانک ایران,بانک دی,بانک صادرات,بانک ملت,بانک تجارت,بانک رفاه,بانک حکمت ایرانیان,بانک گردشگری,بانک ایران زمین,بانک قوامین,بانک انصار,بانک سرمایه,بانک پاسارگاد,بانک مشترک ایران-ونزوئلا".split(
    ","
  );
const accs = "شماره شبا,شماره حساب".split(",");
const accsName = "shebano,accountno".split(",");
const accsNameHolder = "Sheba Number,Account Number".split(",");
const carts = "شماره کارت,cvv2 کارت,ماه انقضاکارت,سال انقضا کارت".split(",");
const cartsName = "cartno,cvv2,monthno,yearno".split(",");
const cartsNameHolder = "Cart Number,CVV2,Mount,Year".split(",");
const bankOptions = [];
SelectB.map(function (bank, i) {
  bankOptions.push({ key: i, value: bank, text: bank });
});
const initialValues = {
  password: "",
  newpassword: "",
  repeatnewpassword: "",
};
const validationSchema = Yup.object({
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 6 کاراگتر باشد.")
    .min(6, "کلمه عبور حداقل باشد 6 کاراگتر باشد."),
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
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="newpassword"
              label="کلمه عبور جدید"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="repeatnewpassword"
              label="تکرار کلمه عبور"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />

            <Divider inverted />
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              label="کلمه عبور فعلی"
              labelcolor="red"
              size={prop.size}
            />

            <CashoutButton val="ثبت" color="olive" />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
