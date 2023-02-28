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
const editAmount = (amounts, formik, bankNameVal) => {
  cartsOptions = [];
  var _newAmount = 0;
  var getAmount = JSON.parse(localStorage.getItem("Online Cart to Cart"));
  var getAmount2 = JSON.parse(localStorage.getItem("Cart to Cart"));
  amounts.map((item, i) => {
    _newAmount = 0;
    if (getAmount) {
      getAmount.map((old, j) => {
        var _now = moment().date();
        var _date = moment(old.dateCreated).date();

        if (old.cardNumber == item.cardNumber) {
          if (_date == _now) {
            _newAmount = _newAmount + old.amount;
          } else {
          }
        }
      });
    }
    if (getAmount2) {
      getAmount2.map((old, j) => {
        var _now = moment().date();
        var _date = moment(old.dateCreated).date();

        if (old.cardNumber == item.cardNumber) {
          if (_date == _now) {
            _newAmount = _newAmount + old.amount;
          } else {
          }
        }
      });
    }
    item.total = _newAmount;
    cartOptions.push(item);
  });

  cartsOptions = [];
  cartOptions.sort((a, b) => (a.id < b.id ? 1 : -1));
  cartOptions.map((item, i) => {
    item.total = (i + 1) * 10000000;
    if (bankNameVal) {
      cartsOptions.push({
        key: i.toString(),
        id: item.id,
        text: item.bankName,
        value: item.cardNumber,
        content: (
          <>
            <small className="farsi dropbank">{item.bankName}</small>
          </>
        ),
      });
    } else {
      cartsOptions.push({
        key: i.toString(),
        id: item.id,
        text: item.total ? (
          <span className="farsi">
            <ConvertCart isLock cartNo={item.cardNumber} /> | {item.bankName} |{" "}
            {doCurrency(item.total)}
          </span>
        ) : (
          <>
            <ConvertCart isLock cartNo={item.cardNumber} />
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
    }
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
  useEffect(() => {
    updateCartInfo(cartOptions, cartsOptions[0].value, formik);
  }, []);

  if (loginToken) {
    cartOptions = [];
    if (carts) {
      editAmount(carts, formik);
    } else {
      editAmount(loginToken?.bankInfos, formik);
    }

    return (
      <Form as="div">
        {formik.errors[name] && formik.touched[name] && (
          <Label
            className="farsi"
            basic
            color="red"
            pointing="below"
            size={size}
          >
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
                updateCartInfo(cartOptions, data.value, formik);
              }
            }}
          />
        </Form.Input>
      </Form>
    );
  } else {
    return null;
  }
};

export default InputF;
