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

const supportDepartments = "خرید چیپ,برداشت,پشتیبانی فنی".split(",");

const countryOptions = [];
supportDepartments.map(function (bank, i) {
  countryOptions.push({ key: i, value: bank, text: bank });
});

const validationSchema = Yup.object({
  message: Yup.string()
    .required("لطفا این فیلد را وارد کنید.")
    .min(10, "لطفا این فیلد را درست وارد کنید."),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  try {
    const res = await cashierService(values, "addTicket", "");
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
  const initialValues = {
    departman: prop.departman ? prop.departman : countryOptions[0].value,
    ticketID: prop.id ? prop.id : 0,
    message: "",
  };
  const [refresh, setRefresh] = useState(false);
  const [depMode, setDepMode] = useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, submitMethods) =>
        onSubmit(values, submitMethods, navigate, prop, setRefresh)
      }
    >
      {(formik) => {
        return (
          <Form>
            {!prop.departman && (
              <FormikControl
                formik={formik}
                control="select"
                name="departman"
                label="دپارتمان"
                labelcolor="yellow"
                size={prop.size}
                className="farsi"
                options={countryOptions}
                value={countryOptions[0].value}
              />
            )}

            <FormikControl
              formik={formik}
              control="textarea"
              type="text"
              name="message"
              labelcolor="orange"
              size={prop.size}
            />

            <Button
              content={"ثبت"}
              fluid
              style={{ margin: "10px 0" }}
              className="farsi"
              type="submit"
              color="olive"
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
