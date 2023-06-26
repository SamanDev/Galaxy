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

import DepositButton from "../../input/DepositButton";
import Password from "../../input/Password";
import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { cashierService } from "../../../../services/cashier";
import { getCashAmount } from "../../../../const";
const initialValues = {
  amount: 0,

  amountDollar: 100,
};
const validationSchema = Yup.object({
  amount: Yup.number().required("لطفا این فیلد را وارد کنید.").integer(),

  amountDollar: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "createCashoutPM", "");
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
  });
  var _bal = getCashAmount(loginToken.balance);
  return (
    <Formik
      initialValues={{
        amount: _bal,

        amountDollar: _bal / getRate >= 100 ? _bal / getRate : 100,
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
