import React, { useState, useEffect } from "react";

import CurrencyInput from "react-currency-input-field";
import { FastField } from "formik";

import FormikControl from "./FormikControl";
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
import { rateService } from "../../services/cashier";

const Amount = (prop) => {
  const getRate = localStorage.getItem("getRate");
  const [amount, setAmount] = useState(prop.def || 100000);
  const [amountDollar, setAmountDollar] = useState(100);
  const [rate, setRate] = useState(getRate || 31250);
  const handleGetRate = async () => {
    try {
      const res = await rateService();
      if (res.status === 200) {
        localStorage.setItem("getRate", res.data);
        setRate(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (prop.dollar || prop.rate) handleGetRate();
  }, []);

  useEffect(() => {
    setVal("amount", prop.formik.values.amount);
  }, [prop.formik.values.amount, rate]);
  useEffect(() => {
    if (prop.dollar) setVal("amountDollar", prop.formik.values.amountDollar);
  }, [prop.formik.values.amountDollar, rate]);
  const setVal = (name, value) => {
    var _value = value;
    if (name == "amount") {
      if (_value == null || _value == "") {
        if (prop.dollar) {
          _value = rate * 100;
        } else {
          _value = 100000;
        }
      }
      try {
        prop.formik.setFieldValue("txID", "");
      } catch (error) {}

      setAmount(_value);
      if (prop.dollar) setAmountDollar(_value / rate);
      prop.formik.setFieldValue("amount", _value);
      if (prop.dollar) prop.formik.setFieldValue("amountDollar", _value / rate);
    }
    if (name == "amountDollar") {
      if (_value == null || _value == "") {
        _value = 100;
      }
      setAmount(_value * rate);
      setAmountDollar(_value);
      prop.formik.setFieldValue("amount", _value * rate);
      prop.formik.setFieldValue("amountDollar", _value);
    }
  };

  return (
    <>
      {prop.rate ? (
        <>
          <Input size="mini" readOnly fluid labelPosition="left" value={rate}>
            <Label size="tiny" color="black" pointing="right" className="farsi">
              نرخ تبدیل
            </Label>
            <CurrencyInput
              name="rate"
              value={rate}
              allowDecimals={true}
              decimalsLimit={2}
            />
          </Input>
        </>
      ) : (
        <>
          <span className="hiddenmenu">
            <FormikControl
              formik={prop.formik}
              control="input"
              type="text"
              name="amount"
              labelcolor={prop.labelcolor}
              size={prop.size}
              label="مبلغ به تومان"
              className="farsi"
              disabled={prop.disabled}
            />
          </span>
          {prop.formik.errors[prop.name] && (
            <Label
              className="farsi"
              basic
              color="red"
              pointing="below"
              size={prop.size}
              disabled={prop.disabled}
            >
              {prop.formik.errors[prop.name]}
            </Label>
          )}
          <Input size="mini" fluid labelPosition="left">
            <Label
              pointing="right"
              color={prop.formik.errors[prop.name] ? "red" : prop.labelcolor}
              size={prop.size}
              className="farsi"
            >
              مبلغ به تومان
            </Label>
            <CurrencyInput
              name="amount"
              value={amount}
              defaultValue="1000000"
              allowDecimals={false}
              maxLength="10"
              disabled={prop.disabled}
              onValueChange={(value, name) => setVal(name, value)}
            />
          </Input>
          {prop.dollar && (
            <>
              <span className="hiddenmenu">
                <FormikControl
                  formik={prop.formik}
                  control="input"
                  type="text"
                  name="amountDollar"
                  labelcolor={prop.labelcolor}
                  size={prop.size}
                  label="مبلغ به دلار"
                  disabled={prop.disabled}
                />
              </span>
              {prop.formik.errors["amountDollar"] &&
                prop.formik.touched["amountDollar"] && (
                  <Label
                    className="farsi"
                    basic
                    color="red"
                    pointing="below"
                    size={prop.size}
                    disabled={prop.disabled}
                  >
                    {prop.formik.errors["amountDollar"]}
                  </Label>
                )}
              <Input size="mini" fluid labelPosition="left">
                <Label
                  pointing="right"
                  color={
                    prop.formik.errors["amountDollar"] &&
                    prop.formik.touched["amountDollar"]
                      ? "red"
                      : prop.labelcolor
                  }
                  size={prop.size}
                  className="farsi"
                >
                  مبلغ به دلار
                </Label>
                <CurrencyInput
                  value={amountDollar}
                  allowDecimals={true}
                  decimalsLimit={2}
                  name="amountDollar"
                  maxLength="6"
                  disabled={prop.disabled}
                  onValueChange={(value, name) => setVal(name, value)}
                />
              </Input>
              <Input
                size="mini"
                readOnly
                fluid
                labelPosition="left"
                value={rate}
              >
                <Label
                  size="tiny"
                  color="black"
                  pointing="right"
                  className="farsi"
                >
                  نرخ تبدیل
                </Label>
                <CurrencyInput
                  name="rate"
                  value={rate}
                  allowDecimals={true}
                  decimalsLimit={2}
                  disabled={prop.disabled}
                />
              </Input>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Amount;
