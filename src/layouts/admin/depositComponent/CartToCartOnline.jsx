import React, { useState, useEffect } from "react";
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
import Select from "../input/Select";
import DepositButton from "../input/DepositButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import $ from "jquery";
import FormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import MyMsg from "../../../utils/MsgDesc";
import { cashierService } from "../../../services/cashier";
const cartOptions = [
  {
    id: 2,
    value: "6104337830282164",
    text: "6104337830282164",
    date: "2022-04-19T04:48:34.122+00:00",
    cardNumber: "6104337830282164",
    holdername: "محمد عباسی",
    cvv: "237",
    expiration: "0302",
    mobile: "09122266208",
    gateway: "IranShetab",
    gatewayname: "Hamrahcart",
    active: true,
  },
];
const carts = [];

var countryOptions = [];

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100000, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
const onSendCode = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabVerify"
    );
    if (res.status == 200) {
      $(".onarea").hide();
      $(".online1").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    submitMethods.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSendCodeVerify = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabVerifyConfirm"
    );
    if (res.status == 200) {
      $(".onarea").hide();
      $(".online2").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    submitMethods.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSendPass = async (formik, prop, setBtnLoading) => {
  setBtnLoading(true);
  try {
    const res = await cashierService(
      formik.values,
      "createDepositShetabGetPassCode"
    );
    if (res.status == 200 && res.data?.txID) {
      formik.setFieldValue("txID", res.data.txID);
      $(".onarea").hide();
      $(".online2").show();
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
    setBtnLoading(false);
    submitMethods.setSubmitting(false);
  } catch (error) {
    setBtnLoading(false);
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(
      values,
      "createDepositShetabDoTransaction"
    );
    if (res.status == 200) {
      if (res.data?.message) {
        Alert("متاسفم...!", res.data.message, "error");
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
const updateCartInfo = (id, formik) => {
  var selectedCart = cartOptions.filter((d) => d.cardNumber == id)[0];

  console.log(selectedCart);
  formik.setFieldValue("cvv", selectedCart.cvv);
  formik.setFieldValue("expire", selectedCart.expiration);
};
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var initialValues = {
    amount: 100000,

    geteway: countryOptions[0] ? countryOptions[0].value : "",
    mobile: cartOptions[0].mobile,

    cvv: cartOptions[0].cvv,
    expire: cartOptions[0].expiration,
    pin: "",
    code: "",
    txID: "",

    cardNumber: carts[0] ? carts[0].value : "",
  };
  if (loginToken) {
    countryOptions = [];
    loginToken?.cashierGateways.map((item, i) => {
      if (item.mode == "IranShetab" && item.active) {
        countryOptions.push({
          key: i.toString(),
          value: item.name,
          text: item.name,
        });
      }
    });

    loginToken?.bankInfos.map((item, i) => {
      if (item.active) {
        cartOptions.push(item);
      }
    });

    cartOptions.map((item, i) => {
      carts.push({
        key: i.toString(),
        id: item.id,
        value: item.cardNumber,
        text: item.cardNumber,
      });
    });
    initialValues = {
      amount: 100000,

      geteway: countryOptions[0] ? countryOptions[0].value : "",
      mobile: cartOptions[0].mobile,

      cvv: cartOptions[0].cvv,
      expire: cartOptions[0].expiration,
      pin: "",
      code: "",
      txID: "",

      cardNumber: carts[0] ? carts[0].value : "",
    };

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
              <FormikControl
                formik={formik}
                control="select"
                name="cardNumber"
                namemix="cardNumberSelect"
                label="واریز از"
                labelcolor={prop.labelcolor}
                size={prop.size}
                options={carts}
                updateCartInfo={updateCartInfo}
              />
              <FormikControl
                formik={formik}
                control="amount"
                name="amount"
                labelcolor={prop.labelcolor}
                size={prop.size}
                def="1000000"
              />
              <FormikControl
                formik={formik}
                control="select"
                name="geteway"
                label="توسط"
                labelcolor="black"
                size={prop.size}
                options={countryOptions}
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
              <Button.Group
                fluid
                size="mini"
                widths="2"
                style={{ marginTop: "10px" }}
              >
                <Button
                  className="farsi"
                  color="blue"
                  loading={btnLoading}
                  disabled={btnLoading}
                  type="button"
                  onClick={() => {
                    onSendCode(formik, prop, setBtnLoading);
                  }}
                >
                  ارسال کد فعالسازی
                </Button>
                <Button.Or text="یا" className="farsi" />
                <Button
                  loading={btnLoading}
                  disabled={btnLoading}
                  color="green"
                  className="farsi"
                  type="button"
                  onClick={() => {
                    onSendPass(formik, prop, setBtnLoading);
                  }}
                >
                  ارسال رمز پویا
                </Button>
              </Button.Group>
              <div className="onarea online1" style={{ display: "none" }}>
                <Divider inverted />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="code"
                  label="کد فعالسازی"
                  labelcolor="blue"
                  size={prop.size}
                  inputmode="numeric"
                />

                <Button
                  content={"تایید"}
                  fluid
                  style={{ margin: "10px 0" }}
                  className="farsi"
                  color="blue"
                  size="mini"
                  loading={btnLoading}
                  disabled={btnLoading}
                  type="button"
                  onClick={() => {
                    onSendCodeVerify(formik, prop, setBtnLoading);
                  }}
                />
              </div>
              <div className="onarea online2" style={{ display: "none" }}>
                <Divider inverted />
                <FormikControl
                  formik={formik}
                  control="input"
                  name="pin"
                  label="رمز پویا"
                  labelcolor="green"
                  size={prop.size}
                  inputmode="numeric"
                />

                <DepositButton
                  {...prop}
                  type="submit"
                  disabled={formik.isSubmitting}
                  loading={formik.isSubmitting}
                />
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
