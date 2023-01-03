import React from "react";
import { doCurrency } from "../const";
const LabelExampleBasic = (prop) => {
  if (prop.amount.toString().indexOf("-") > -1 || prop.sign < 0) {
    return <span className="text-danger">-{doCurrency(prop.amount)}</span>;
  } else if (prop.amount.toString().indexOf("+") > -1 || prop.sign > 0) {
    return <span className="text-success">+{doCurrency(prop.amount)}</span>;
  } else {
    return <span className={prop.className}>{doCurrency(prop.amount)}</span>;
  }
};

export default LabelExampleBasic;
