import React from "react";
import { Icon, Label } from "semantic-ui-react";
import Accordion from "../pages/dashboard/AccordionCashier";
const LabelExampleBasic = (prop) => {
  if (prop.status === true) {
    return <Icon name="check" color="green" />;
  }
  if (prop.status === false) {
    return <Icon name="spinner" loading />;
  }
  if (prop.status === "Done") {
    return (
      <Label size={prop.size} color={prop.color ? prop.color : "green"}>
        <Icon name="check" color={prop.icon && "green"} />
        {!prop.icon && <> {prop.status}</>}
      </Label>
    );
  }
  if (prop.status === "Canceled") {
    return (
      <Label size={prop.size} color={prop.color ? prop.color : "red"}>
        <Icon name="times" color={prop.icon && "red"} />
        {!prop.icon && <> {prop.status}</>}
      </Label>
    );
  }
  if (prop.status === "Pending") {
    return (
      <Label size={prop.size} color={prop.color ? prop.color : "teal"}>
        <Icon name="spinner" loading />
        {!prop.icon && <> {prop.status}</>}
      </Label>
    );
  }
  if (prop.status === "Info") {
    return (
      <Accordion size={prop.size} color={prop.color ? prop.color : "blue"} />
    );
  }
};

export default LabelExampleBasic;
