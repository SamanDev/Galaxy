import React from "react";
import { Icon, Label } from "semantic-ui-react";
import Accordion from "../pages/dashboard/AccordionCashier";
const LabelExampleBasic = (prop) => {
  if (prop.status === "Done") {
    return (
      <Label {...prop}>
        <Icon name="check" /> {prop.status}
      </Label>
    );
  }
  if (prop.status === "Canceled") {
    return (
      <Label {...prop}>
        <Icon name="times" /> {prop.status}
      </Label>
    );
  }
  if (prop.status === "Pending") {
    return (
      <Label {...prop}>
        <Icon name="spinner" loading /> {prop.status}
      </Label>
    );
  }
  if (prop.status === "Info") {
    return <Accordion {...prop} />;
  }
};

export default LabelExampleBasic;
