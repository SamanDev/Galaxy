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
import { cashierService } from "../../../services/cashier";
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
  name: "",
  mobile: "09",
  bankname: "",
  shebano: "",
  accountno: "",
  cartno: "",
  cvv2: "",
  monthno: "",
  yearno: "",
};
const validationSchema = Yup.object({
  name: Yup.string()
    .required("نام کامل خود را به فارسی وارد کنید.")
    .min(5, "نام کامل خود را به فارسی وارد کنید."),
  bankname: Yup.string().required("لطفا بانک خود را انتخاب کنید."),
  mobile: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(11, "لطفا این فیلد را درست وارد کنید.")
    .max(11, "لطفا این فیلد را درست وارد کنید."),

  shebano: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(24, "لطفا این فیلد را درست وارد کنید.")
    .max(24, "لطفا این فیلد را درست وارد کنید."),
  accountno: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
  cartno: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(16, "لطفا این فیلد را درست وارد کنید.")
    .max(16, "لطفا این فیلد را درست وارد کنید."),
  cvv2: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(3, "لطفا این فیلد را درست وارد کنید."),
  monthno: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(1, "حداقل این فیلد 01 است.")
    .max(12, "حداکثر این فیلد 12 است."),
  yearno: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(1401, "حداقل این فیلد 1401 است.")
    .max(1421, "حداکثر این فیلد 1430 است."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "addCart", "");
    if (res.status == 200) {
      if (res.data) {
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
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop)
      }
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="name"
              label="نام و نام خانوادگی"
              placeholder="Full Name"
              labelcolor="red"
              size={prop.size}
              className="farsi"
            />
            <FormikControl
              formik={formik}
              control="input"
              name="mobile"
              label=" شماره همراه"
              labelcolor="red"
              size={prop.size}
              inputmode="numeric"
            />
            <Divider inverted />
            <FormikControl
              formik={formik}
              control="select"
              name="bankname"
              label=" نام بانک"
              labelcolor="black"
              size={prop.size}
              className="farsi"
              options={bankOptions}
              value={bankOptions[0].value}
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
                این اظلاعات برای برداشت نقدی شما استفاده می شود
              </Message.Content>
            </Message>
            {accs.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={accsName[i]}
                placeholder={accsNameHolder[i]}
                label={item}
                labelcolor="yellow"
                size={prop.size}
              />
            ))}
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
                این اظلاعات برای سهولت در واریز شما استفاده می شود
              </Message.Content>
            </Message>
            {carts.map((item, i) => (
              <FormikControl
                formik={formik}
                key={i}
                control="input"
                type="text"
                name={cartsName[i]}
                placeholder={cartsNameHolder[i]}
                label={item}
                labelcolor="orange"
                size={prop.size}
              />
            ))}
            <Button
              content={"ثبت"}
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              type="submit"
              color="olive"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
            />

            <List title="کارت های بانکی" mode="cart" {...prop} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
