import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";
import List from "../../../pages/dashboard/ListDeposit";
const DepositButton = (prop) => (
  <>
    <Button
      content={prop.val ? prop.val : "واریز"}
      fluid
      style={{ margin: "10px 0" }}
      className="farsi"
      color="teal"
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

export default DepositButton;
