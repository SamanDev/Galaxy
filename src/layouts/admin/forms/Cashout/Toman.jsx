import React, { useState } from "react";

import CashoutButton from "../../input/CashoutButton";
import FormikControl from "../../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";
import { getCashAmount, doCurrency } from "../../../../const";
import { cashierService } from "../../../../services/cashier";
import { Button, Progress, Label } from "semantic-ui-react";
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  try {
    const res = await cashierService(values, "bankTransfer", "");
    if (res.status == 200) {
      setRefresh(true);
      Alert("Done", "انجام شد.", "success");
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
  const siteInfo = prop.siteInfo;
  const validationSchema = Yup.object({
    amount: Yup.number()
      .required("لطفا این فیلد را وارد کنید.")
      .min(
        siteInfo.cashoutLimit,
        "حداقل مبلغ " + doCurrency(siteInfo.cashoutLimit) + " تومان می باشد."
      )
      .max(loginToken.balance, "موجودی ناکافی است.")
      .integer(),
  });
  var defamount = getCashAmount(loginToken.balance);
  return (
    <Formik
      initialValues={{
        action: "cashout",
        amount: getCashAmount(loginToken.balance),
        amount2: doCurrency(getCashAmount(loginToken.balance)),
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
            <span className="hiddenme7nu">
              <FormikControl
                formik={formik}
                control="amount"
                label="مبلغ به تومان"
                className="farsi"
                name="amount"
                labelcolor={prop.labelcolor}
                size={prop.size}
                inputmode="numeric"
              />
            </span>
            {formik.errors["amount"] && (
              <Label
                className="farsi"
                basic
                color="red"
                pointing="below"
                size={prop.size}
              >
                {formik.errors["amount"]}
              </Label>
            )}
            <FormikControl
              formik={formik}
              type="text"
              control="input"
              label="مبلغ به تومان"
              name="amount2"
              labelcolor={prop.labelcolor}
              size={prop.size}
              inputmode="numeric"
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
