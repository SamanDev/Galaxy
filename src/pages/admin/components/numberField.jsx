import { Form, Formik, useField, useFormikContext } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Icon, Message } from "semantic-ui-react";
import * as Yup from "yup";
import FormikControl from "../../../components/form/FormikControl";

const depositArea = (prop) => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        bonus: prop.defaultValue,
      }}
      onSubmit={(values, submitMethods) => {
        onSubmit(values, submitMethods, navigate, prop);
      }}
    >
      {(formik) => {
        return (
          <Form style={prop.style}>
            <FormikControl
              formik={formik}
              control="input"
              type="text"
              label=""
              placeholder=""
              labelcolor="red"
              inputmode="numeric"
              {...prop}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default depositArea;
