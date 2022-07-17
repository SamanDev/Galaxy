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

import FormikControl from "../../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../../utils/alerts";
import MyMsg from "../../../utils/MsgDesc";
import { cashierService } from "../../../services/cashier";
const countryOptions = [
  {
    key: "a4f",
    value: "6662502250225050",
    text: "6662502250225050",
    name: "Ali (Melli)",
  },
  { key: "af", value: "5022502250225050", text: "5022502250225050" },
];
const initialValues = {
  amount: 100000,

  tocart: countryOptions[0].value,
  tocartname: countryOptions[0].name,
  cardNumber: countryOptions[0].value,
};
const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100000, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
});
const onSubmit = async (values, submitMethods, navigate, prop) => {
  console.log(values);
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
  const [copy, setCopy] = useState(false);

  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
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
            <MyMsg
              icon="fire"
              color="red"
              text="ابتدا مبلغ مورد نظر (یک تا سه میلیون) را به کارت زیر انتقال
              دهید."
            />
            <CopyToClipboard
              text={formik.values.tocart}
              onCopy={() => copyDo()}
            >
              <Button
                icon
                size="tiny"
                color={copy ? "green" : "yellow"}
                type="button"
                className="farsi"
                style={{ position: "absolute", zIndex: 3 }}
              >
                {!copy ? (
                  <>
                    <Icon name="copy outline" /> کپی
                  </>
                ) : (
                  <>
                    <Icon name="check" /> کپی
                  </>
                )}
              </Button>
            </CopyToClipboard>
            <FormikControl
              formik={formik}
              control="input"
              name="tocart"
              label="واریز به"
              labelcolor="red"
              size={prop.size}
              readOnly
            />

            <FormikControl
              formik={formik}
              control="input"
              name="tocartname"
              label="به نام"
              labelcolor="red"
              size={prop.size}
              readOnly
            />

            <Divider inverted />
            <MyMsg
              icon="check"
              color="red"
              text="سپس اطلاعات زیر را وارد نمایید و منتظر تائید باشید."
            />

            <FormikControl
              formik={formik}
              control="select"
              name="cardNumber"
              label="واریز از"
              labelcolor={prop.labelcolor}
              size={prop.size}
              options={countryOptions}
            />
            <FormikControl
              formik={formik}
              control="amount"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              def="1000000"
            />

            <DepositButton {...prop} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
