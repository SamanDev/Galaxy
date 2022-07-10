import { FastField } from "formik";
import React from "react";
import {
  Label,
  Input,
  Header,
  Divider,
  Icon,
  Button,
  Segment,
  Message,
  Form,
} from "semantic-ui-react";
const InputF = ({ formik, type, name, icon, label, labelcolor, size }) => {
  console.log(formik);
  return (
    <Form as="div">
      {formik.errors[name] && formik.touched[name] && (
        <Label className="farsi" basic color="red" pointing="below" size={size}>
          {formik.errors[name]}
        </Label>
      )}
      <Form.Input size={size} fluid labelPosition="left" defaultValue="">
        <Label
          size="tiny"
          pointing="right"
          color={
            formik.errors[name] && formik.touched[name] ? "red" : labelcolor
          }
          className="farsi"
        >
          {label}
        </Label>
        <FastField type={type} name={name} placeholder={name} />
      </Form.Input>
    </Form>
  );
};

export default InputF;
