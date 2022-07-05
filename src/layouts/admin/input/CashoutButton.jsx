import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";
import List from "../../../pages/dashboard/ListCashier";
const CashoutButton = (prop) => (
  <>
    <Button
      content={prop.val ? prop.val : "برداشت"}
      fluid
      style={{ margin: "10px 0" }}
      className="farsi"
      color={prop.color ? prop.color : "orange"}
      onClick={() => {
        $("#dep1").hide();
        $("#dep2").show();
      }}
    />
    {prop.mode && (
      <>
        <Divider inverted fitted />
        <List mode={prop.mode} />
      </>
    )}
  </>
);

export default CashoutButton;
