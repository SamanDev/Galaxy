import React, { useState } from "react";

import FormikControl from "../../components/form/FormikControl";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "../../utils/alerts";
import { adminPostService } from "../../services/admin";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Select,
  Radio,
} from "semantic-ui-react";

const validationSchema = Yup.object({
  amount: Yup.number()
    .required("لطفا این فیلد را وارد کنید.")
    .min(100, "لطفا این فیلد را درست وارد کنید.")
    .integer(),
  username: Yup.string()

    .required("نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .min(3, "نام کاربری حداقل باشد 3 کاراکتر باشد.")
    .max(12, "نام کاربری حداکثر باشد 12 کاراکتر باشد.")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "نام کاربری فقط می تواند شامل حروف لاتین و اعداد باشد."
    ),
});
const onSubmit = async (values, submitMethods, navigate, prop, setRefresh) => {
  setRefresh(true);
  try {
    const res = await adminPostService(values, "adminChipService");
    if (res.status == 200) {
      setRefresh(false);
      prop.setCashierOpen(false);
    }

    submitMethods.setSubmitting(false);
  } catch (error) {
    submitMethods.setSubmitting(false);

    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Modal.Header>Cashier System</Modal.Header>
      <Modal.Content className="myaccount popup">
        <Formik
          initialValues={{
            mode: "add",
            amount: 0,
            dollarAmount: 0,
            usd: false,
            credit: false,

            username: prop.username ? prop.username : "",
          }}
          onSubmit={(values, submitMethods) =>
            onSubmit(values, submitMethods, navigate, prop, setRefresh)
          }
          validationSchema={validationSchema}
        >
          {(formik) => {
            return (
              <Form>
                <Button.Group fluid widths={3}>
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "remove");
                    }}
                    positive={formik.values.mode === "remove"}
                  >
                    Remove
                  </Button>
                  <Button.Or text="or" />
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("mode", "add");
                    }}
                    positive={formik.values.mode === "add"}
                  >
                    Add
                  </Button>
                </Button.Group>
                <br /> <br />
                <Button.Group fluid widths={2}>
                  <Button
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("credit", !formik.values.credit);
                    }}
                    positive={formik.values.credit}
                  >
                    Credit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      if (formik.values.usd) {
                        formik.setFieldValue("amount", 0);
                      } else {
                        formik.setFieldValue("dollarAmount", 0);
                      }
                      formik.setFieldValue("usd", !formik.values.usd);
                    }}
                    positive={formik.values.usd}
                  >
                    Usd
                  </Button>
                </Button.Group>
                {formik.values.usd ? (
                  <FormikControl
                    formik={formik}
                    control="inputamount"
                    type="text"
                    name="dollarAmount"
                    label="DollarAmount"
                    labelcolor={"red"}
                    size={"large"}
                    autoComplete="off"
                  />
                ) : (
                  <FormikControl
                    formik={formik}
                    control="amount"
                    type="text"
                    name="amount"
                    label="Amount"
                    labelcolor={"red"}
                    size={"large"}
                    autoComplete="off"
                  />
                )}
                <FormikControl
                  formik={formik}
                  control="input"
                  type="text"
                  name="username"
                  label="username"
                  labelcolor={"grey"}
                  size={"large"}
                  autoComplete="off"
                />
                <br />
                <Button
                  size="large"
                  color="red"
                  icon="times"
                  loading={refresh}
                  disabled={refresh}
                  fluid
                >
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Modal.Content>
    </>
  );
};

export default depositArea;