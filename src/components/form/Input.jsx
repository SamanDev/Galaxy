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
  inputmode,
  readOnly,
  autoComplete,
}) => {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

  String.prototype.toPersianCharacter = function () {
    var string = this;
    if (inputmode == "numeric") {
      var obj = {
        "١": "۱",
        "٢": "۲",
        "٣": "۳",
        "٤": "۴",
        "٥": "۵",
        "٦": "۶",
        "٧": "۷",
        "٨": "۸",
        "٩": "۹",
        "٠": "۰",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        "۰": "0",
      };
    } else {
      var obj = {
        ك: "ک",
        دِ: "د",
        بِ: "ب",
        زِ: "ز",
        ذِ: "ذ",
        شِ: "ش",
        سِ: "س",
        ى: "ی",
        ي: "ی",
        ئ: "ی",
        "١": "۱",
        "٢": "۲",
        "٣": "۳",
        "٤": "۴",
        "٥": "۵",
        "٦": "۶",
        "٧": "۷",
        "٨": "۸",
        "٩": "۹",
        "٠": "۰",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
        "۰": "0",
      };
    }

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(key, obj[key]);
    });
    return string;
  };
  React.useEffect(() => {
    if (inputmode == "numeric") {
      var _val = formik.values[name].toPersianCharacter();
      if (_val != formik.values[name]) formik.setFieldValue(name, _val);
    }
  }, [formik.values[name]]);
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
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
          inputMode={inputmode}
          readOnly={readOnly}
          autoComplete={autoComplete}
        />
      </Form.Input>
    </Form>
  );
};

export default InputF;
