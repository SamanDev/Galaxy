import React from "react";
import { Icon, Label } from "semantic-ui-react";
import { doCurrency } from "../const";
const LabelExampleBasic = (prop) => {
  if (prop.amount.indexOf("-") > -1) {
    return <span className="text-danger fs-6">{doCurrency(prop.amount)}</span>;
  } else if (prop.amount.indexOf("+") > -1) {
    return <span className="text-success fs-6">{doCurrency(prop.amount)}</span>;
  } else {
    return (
      <span className={"text-gold fs-6 " + prop.className}>
        {doCurrency(prop.amount)}
      </span>
    );
  }
};

export default LabelExampleBasic;
