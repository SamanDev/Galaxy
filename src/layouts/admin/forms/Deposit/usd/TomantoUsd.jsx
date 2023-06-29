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
import Select from "../../../input/Select";
import DepositButton from "../../../input/DepositButton";
import Carts from "../../../../../components/form/Carts";
import { CopyToClipboard } from "react-copy-to-clipboard";
import $ from "jquery";
import FormikControl from "../../../../../components/form/FormikControl";
import AmountSelect from "../../../../../components/form/AmountSelect";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../../utils/alerts";
import { MyToastDone } from "../../../../../utils/myAlert";
import { doCurrency } from "../../../../../const";
import MyMsg from "../../../../../utils/MsgDesc";
import { cashierServiceGame } from "../../../../../services/cashier";
import { rateService } from "../../../../../services/cashier";
var countryOptions = [];
var amounts = [
  { value: 5 },
  { value: 10 },
  { value: 25 },
  { value: 50 },
  { value: 100 },
];
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(5, "لطفا این فیلد را درست وارد کنید.")
    .max(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
  password: Yup.string()
    .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
    .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
});

const onSubmit = async (values, submitMethods, getRate, prop) => {
  try {
    var newValues = values;
    newValues.amountDollar = values.amount;
    newValues.amount = values.amount * getRate;
    const res = await cashierServiceGame(newValues, "exChanger");
    if (res.status == 200) {
      MyToastDone("انجام شد", "success");
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
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const getRate = localStorage.getItem("getRate");
  const loginToken = prop.loginToken;
  const [rate, setRate] = useState(getRate || 31250);
  const handleGetRate = async () => {
    try {
      const res = await rateService();
      if (res.status === 200) {
        localStorage.setItem("getRate", res.data);
        setRate(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetRate();
  }, []);
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

    return (
      <Formik
        initialValues={{
          amount: 0,
          password: "",
        }}
        onSubmit={(values, submitMethods) =>
          onSubmit(values, submitMethods, rate, prop)
        }
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <Button.Group vertical fluid size="mini" type="button">
                {amounts.map((amo) => {
                  return (
                    <Button
                      icon
                      labelPosition="left"
                      type="button"
                      key={amo.value}
                      active={formik.values.amount == amo.value ? true : false}
                      color={formik.values.amount == amo.value ? "red" : "grey"}
                      onClick={() => {
                        formik.setFieldValue("amount", amo.value);
                      }}
                      disabled={
                        loginToken.balance < amo.value * rate ? true : false
                      }
                    >
                      <Icon className="usdbtn">${amo.value}</Icon> <> </>
                      {doCurrency(amo.value * getRate)}
                    </Button>
                  );
                })}
              </Button.Group>

              <span style={{ position: "absolute", opacity: 0, zIndex: -1 }}>
                <FormikControl
                  formik={formik}
                  control="amountusd"
                  name="amount"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  rate={true}
                  dollar={true}
                />
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="username"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  label="مبلغ به دلار"
                  autoComplete="off"
                />
              </span>
              <FormikControl
                formik={formik}
                control="input"
                type="password"
                name="password"
                label=" کلمه عبور"
                labelcolor="red"
                size={prop.size}
                autoComplete="password"
              />
              <Divider inverted />

              <DepositButton
                {...prop}
                val="تبدیل"
                type="submit"
                disabled={formik.isSubmitting || formik.values.amount == 0}
                loading={formik.isSubmitting}
              />
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
