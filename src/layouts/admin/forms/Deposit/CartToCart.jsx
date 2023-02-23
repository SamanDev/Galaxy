import React, { useState } from "react";
import { Divider, Button } from "semantic-ui-react";
import DepositButton from "../../input/DepositButton";
import Carts from "../../../../components/form/Carts";
import AmountSelect from "../../../../components/form/AmountSelect";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import CopyBtn from "../../../../utils/copyInputBtn";
import MyMsg from "../../../../utils/MsgDesc";
import { doCurrency } from "../../../../const";
import ConvertCart from "../../../../utils/convertCart";
import $ from "jquery";
import { cashierService } from "../../../../services/cashier";
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
var countryOptions = {
  key: "a4f",
  value: "6662502250225050",
  text: "6662502250225050",
  name: "Ali (Melli)",
};
var carts = [];
var cartOptions = [];
var amounts = [
  { value: 1000000 },
  { value: 1250000 },
  { value: 1500000 },
  { value: 1750000 },
  { value: 2000000 },
  { value: 2250000 },
  { value: 2500000 },
  { value: 2750000 },
  { value: 3000000 },
];
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100000, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});

const localAmount = (values, prop) => {
  var getAmount = JSON.parse(localStorage.getItem(prop.gateway));
  if (!getAmount) {
    getAmount = [];
  }
  getAmount.push(values);
  localStorage.setItem(prop.gateway, JSON.stringify(getAmount));
};
const onGetCart = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);

  try {
    const res = await cashierService(formik.values, "getBankCard");
    if (res.status == 200) {
      formik.setFieldValue("tocart", res.data.cardNumber);
      formik.setFieldValue("tocartname", res.data.holderName);
      formik.setFieldValue("tobankName", res.data.bankName);
      $(".onarea").hide();
      $(".online2").show();
      localAmount(formik.values, prop);
    } else {
      $(".onarea").hide();
      $(".online2").show();
      //Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    formik.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    formik.setSubmitting(false);
    $(".onarea").hide();
    $(".online2").show();
    //Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "Deposit", prop.mode);
    if (res.status == 200) {
      localAmount(values, prop);
      submitMethods.resetForm();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const updateCartInfo = (cartOptions, id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];

  formik.setFieldValue("cardNumber", id);

  formik.setFieldValue("bankName", selectedCart.bankName);

  formik.setFieldValue("mobile", selectedCart.mobile);
};
const updateAmount = (id, formik, mode) => {
  formik.setFieldValue("amount", id);
};
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  const [countryOption, setCountryOption] = useState(countryOptions);
  const [btnLoading, setBtnLoading] = useState(false);
  const loginToken = prop.loginToken;

  if (loginToken) {
    return (
      <Formik
        initialValues={{
          amount: 0,
          geteway: prop.gateway,
          code: "بابت بدهی " + generateRandomInteger(11111111, 99999999),
          tocart: "",
          tocartname: "",
          mobile: "",
          cardNumber: "",
          bankName: "",
          tobankName: "",
          dateCreated: new Date(),
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, navigate, prop)
        }
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <div className="onarea online1" style={{ overflow: "visible" }}>
                <MyMsg
                  icon="num"
                  num="1"
                  color="yellow"
                  size="mini"
                  text="ابتدا کارت و مبلغ مورد نظر خود را انتخاب کنید."
                />

                <Carts
                  formik={formik}
                  name="cardNumber"
                  label="واریز از"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  namemix
                  updateCartInfo={updateCartInfo}
                  gateway={prop.gateway}
                  {...prop}
                />
                <AmountSelect
                  formik={formik}
                  name="amount"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  mode={prop.mode}
                  amounts={amounts}
                  updateAmount={updateAmount}
                  {...prop}
                />
                <Divider inverted />
                <Button
                  className="farsi"
                  color="red"
                  size="mini"
                  fluid
                  loading={btnLoading}
                  disabled={btnLoading || !formik.isValid}
                  type="button"
                  onClick={() => {
                    onGetCart(formik, prop, setBtnLoading);
                  }}
                >
                  ادامه
                </Button>
              </div>
              <div className="onarea online2" style={{ display: "none" }}>
                <MyMsg
                  icon="num"
                  num="2"
                  color="yellow"
                  size="mini"
                  text={
                    <>
                      سپس از کارت{" "}
                      <span className="dir_ltr text-danger">
                        <ConvertCart isLock cartNo={formik.values.cardNumber} />
                      </span>{" "}
                      مبلغ{" "}
                      <span className="text-danger">
                        {doCurrency(formik.values.amount)} تومان
                      </span>{" "}
                      را به کارت زیر انتقال دهید.
                    </>
                  }
                />

                <Divider inverted fitted hidden />
                <MyMsg
                  icon="info"
                  color="red"
                  size="mini"
                  text={
                    <>
                      حتما در توضیحات انتقال ذکر شود:
                      <br />
                      <span className="text-danger">{formik.values.code}</span>
                    </>
                  }
                />

                <Divider inverted />
                <CopyBtn text={formik.values.tocart} />

                <FormikControl
                  formik={formik}
                  control="input"
                  name="tocart"
                  label="واریز به"
                  labelcolor="red"
                  size={prop.size}
                  readOnly
                />
                <CopyBtn text={formik.values.code} />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="code"
                  label="توضیحات"
                  labelcolor="red"
                  size={prop.size}
                  className="farsi"
                  readOnly
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="tocartname"
                  label="به نام"
                  labelcolor="red"
                  size={prop.size}
                  className="farsi"
                  readOnly
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="tobankName"
                  label="نام بانک"
                  labelcolor="red"
                  size={prop.size}
                  className="farsi"
                  readOnly
                />

                <DepositButton {...prop} />
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  } else {
    return null;
  }
};

export default depositArea;
