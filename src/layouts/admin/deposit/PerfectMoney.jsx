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
import Amount from "../input/Amount";
import DepositButton from "../input/DepositButton";

import FormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import { cashierService } from "../../../services/cashier";

const initialValues = {
  voucherNumber: "",
  voucherCode: "",
};
const validationSchema = Yup.object({
  voucherNumber: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
  voucherCode: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(8, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "Deposit", prop.mode);
    if (res.status == 200) {
      localStorage.setItem("loginToken", JSON.stringify(res.data));
      prop.setIsUser(true);
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
              control="input"
              type="text"
              inputMode="number"
              name="voucherNumber"
              label="eVoucher Number"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              inputMode="number"
              name="voucherCode"
              label="Activition Code"
              labelcolor={prop.labelcolor}
              size={prop.size}
            />
            <Amount rate={true} />
            <DepositButton {...prop} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
