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

const initialValues = {
  amount: 100000,

  amountDollar: 0,
};

const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "createCashoutShetab", "");
    if (res.status == 200) {
      if (res.data?.accessToken) {
        //setRefresh(true);
        //Alert("Done", "انجام شد.", "success");
      }
    } else {
      Alert("متاسفم...!", res.data, "error");
    }

    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);
    var _err = error.response.data;
    _err = _err.replace("balanceError", "موجودی کافی نیست.");
    Alert("متاسفم...!", _err, "error");
  }
};

const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(100000, "لطفا این فیلد را درست وارد کنید.")
      .max(loginToken.balance, "لطفا این فیلد را درست وارد کنید.")
      .integer(),
  });
  return (
    <Formik
      initialValues={{
        amount: parseInt(loginToken.balance / 100000) * 100000,

        amountDollar: 0,
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
