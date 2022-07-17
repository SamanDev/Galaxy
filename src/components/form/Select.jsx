import { FastField } from "formik";
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
  Form,
  Select,
} from "semantic-ui-react";
const InputF = ({
  formik,
  type,
  name,
  icon,
  label,
  labelcolor,
  size,
  placeholder,
  className,
  options,
  defaultValue,
  namemix,
  updateCartInfo,
}) => {
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
        <FastField
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          fluid
          options={options}
          onChange={(value) => {
            formik.setFieldValue(name, value.target.outerText);
            if (namemix) {
              updateCartInfo(value.target.outerText, formik);
            }
          }}
          as={Select}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
