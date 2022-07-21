import React from "react";
import { Button, Divider } from "semantic-ui-react";
import $ from "jquery";

import Report from "../../../pages/dashboard/ReportCash";
import ReportPen from "../../../pages/dashboard/ReportPen";
const CashoutButton = (prop) => (
  <>
    <Button
      content={prop.val ? prop.val : "برداشت"}
      fluid
      style={{ margin: "10px 0" }}
      className="farsi"
      type="submit"
      color={prop.color ? prop.color : "orange"}
      onClick={() => {
        $("#dep1").hide();
        $("#dep2").show();
      }}
    />
    {prop.mode && (
      <>
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
              <ReportPen mode={prop.mode} pending={true} {...prop} />
            </div>
          </div>
        )}
      </>
    )}
  </>
);

export default CashoutButton;
