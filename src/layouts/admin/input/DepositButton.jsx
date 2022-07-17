import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";
import Report from "../../../pages/dashboard/ReportDep";
const DepositButton = (prop) => (
  <>
    <Button
      content={prop.val ? prop.val : "واریز"}
      fluid
      style={{ margin: "10px 0" }}
      className="farsi"
      color="teal"
      type="submit"
      loading={prop.loading}
      disabled={prop.disabled}
      onClick={() => {
        $("#dep1").hide();
        $("#dep2").show();
      }}
    />
    {prop.mode && prop.list ? (
      <>
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text"></span>
          </li>
        </ul>

        <Report mode={prop.mode} {...prop} />
      </>
    ) : (
      <div style={{ overflow: "hidden" }}>
        <ul
          className="mm-listview"
          style={{ opacity: 0.2, position: "relative", top: -12 }}
        >
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text"></span>
          </li>
        </ul>
        <div style={{ overflow: "auto", maxHeight: 300, marginTop: 10 }}>
          <Report mode={prop.mode} pending={true} {...prop} />
        </div>
      </div>
    )}
  </>
);

export default DepositButton;
