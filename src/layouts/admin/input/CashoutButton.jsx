import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";

import Report from "../../../pages/dashboard/ReportCash";
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
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text"></span>
          </li>
        </ul>

        <Report mode={prop.mode} />
      </>
    )}
  </>
);

export default CashoutButton;
