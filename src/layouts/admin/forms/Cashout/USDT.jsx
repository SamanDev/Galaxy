import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import { getCashAmount } from "../../../../const";
const initialValues = {
  action: "cashout",
  amount: 0,
  coin: "USDT.TRC20",
  amountDollar: 100,
  userWalletAddress: "",
  username: "",
  password: "",
};

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "coinPayments", "");
    if (res.status == 200) {
      if (res.data?.address) {
        setRefresh(true);
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
  console.log();
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const getRate = localStorage.getItem("getRate") || 31250;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(100000, "لطفا این فیلد را درست وارد کنید.")
      .max(loginToken.balance, "لطفا این فیلد را درست وارد کنید.")
      .integer(),

    amountDollar: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(100, "لطفا این فیلد را درست وارد کنید.")
      .integer(),
    userWalletAddress: Yup.string()
      .required("لطفا این فیلد را وارد کنید.")
      .min(10, "لطفا این فیلد را درست وارد کنید."),
    password: Yup.string()
      .required("کلمه عبور حداقل باشد 8 کاراکتر باشد.")
      .min(8, "کلمه عبور حداقل باشد 8 کاراکتر باشد."),
  });
  var _bal = getCashAmount(loginToken.balance);
  return (
    <Formik
      initialValues={{
        amount: _bal,

        action: "cashout",

        coin: "USDT.TRC20",
        amountDollar: _bal / getRate >= 100 ? _bal / getRate : 100,
        userWalletAddress: "",
        username: "",
        password: "",
      }}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              formik={formik}
              control="amount"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              dollar={true}
            />
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              name="userWalletAddress"
              label="TRC20 Wallet"
              labelcolor="red"
              size={prop.size}
              autoComplete="trc20-wallet"
            />
            <span style={{ position: "absolute", opacity: 0, zIndex: -1 }}>
              <FormikControl
                formik={formik}
                control="input"
                type="text"
                name="username"
                labelcolor={prop.labelcolor}
                size={prop.size}
                label="مبلغ به دلار"
              />
            </span>
            <FormikControl
              formik={formik}
              control="input"
              type="password"
              name="password"
              label=" کلمه عبور"
              autoComplete="password"
              labelcolor="red"
              size={prop.size}
            />

            <CashoutButton
              {...prop}
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              refresh={refresh}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
