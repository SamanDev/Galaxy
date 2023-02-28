import { FastField } from "formik";
import React, { useState, useEffect } from "react";
import { Dropdown, Header } from "semantic-ui-react";
import ConvertCart from "../../utils/convertCart";
import AmountColor from "../../utils/AmountColor";
import { doCurrency } from "../../const";
import {
  Label,
  Input,
  Divider,
  Icon,
  Button,
  Segment,
  Message,
  Form,
  Select,
} from "semantic-ui-react";
const moment = require("moment");
var cartOptions = [];
var cartsOptions = [];
const editAmount = (carts, total, formik) => {
  cartsOptions = [];
  carts.sort((a, b) => (a.id < b.id ? 1 : -1));
  carts.map((item, i) => {
    if (total) {
      item.total = (i + 1) * 10000000;
    }

    cartsOptions.push({
      key: i.toString(),
      id: item.id,
      // disabled: formik.values.amount > item.total ? true : false,
      text: item.total ? (
        <span className="farsi">
          <ConvertCart isLock cartNo={item.cardNumber} /> | {item.bankName} |{" "}
          {doCurrency(item.total)}
        </span>
      ) : (
        <>
          <span className="farsi">
            <ConvertCart cartNo={item.cardNumber} /> | {item.bankName}
          </span>
        </>
      ),
      value: item.cardNumber,
      content: (
        <>
          {item.total ? (
            <small className="farsi dropbank">
              {item.bankName} | موجودی: {doCurrency(item.total)}
            </small>
          ) : (
            <small className="farsi dropbank">{item.bankName}</small>
          )}

          <ConvertCart isLock cartNo={item.cardNumber} />
        </>
      ),
    });
  });
};
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
  namemix,
  updateCartInfo,

  loginToken,
  carts,
}) => {
  cartOptions = [];
  if (carts) {
    editAmount(carts, true, formik);
  } else {
    editAmount(loginToken?.bankInfos, false, formik);
  }
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
          as={Dropdown}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          selection
          fluid
          options={cartsOptions}
          onChange={(e, data) => {
            if (namemix) {
              updateCartInfo(
                carts ? carts : loginToken?.bankInfos,
                data.value,
                formik
              );
            }
          }}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
