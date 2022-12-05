import React, { useState } from "react";
import PerfectMoney from "./PerfectMoney";
import Transfer from "./Transfer";
import USDT from "./USDT";
import BTC from "./BTC";
import Toman from "./Toman";
import Ticket from "./Ticket";
import AddCart from "./AddCart";
import Invite from "./Invite";
import ChangePass from "./ChangePass";

import AddCartMsg from "../Deposit/addCartMsg";
import ActivetMsg from "../Deposit/activetMsg";
import Report from "./Report";
import Moment from "react-moment";
const moment = require("moment");

const depositArea = (prop) => {
  const [depMode] = useState(prop.gateway);

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var _now = moment();
  var _block = moment(loginToken.blockDateOut);
  //var _block = moment("2022-12-08T19:09:55+03:30");
  //console.log(_now);
  var blnBlock = false;
  if (_now.diff(_block, "seconds") < 0) {
    blnBlock = true;
  }

  return (
    <>
      {!loginToken.userActivate ? (
        <>
          <ActivetMsg {...prop} />
        </>
      ) : (
        <>
          {prop.cashMode === "Report" && (
            <Report size="mini" labelcolor="orange" list={true} />
          )}
          {prop.cashMode === "Ticket" && (
            <Ticket size="mini" labelcolor="orange" list={true} />
          )}
          {prop.cashMode === "Invite" && (
            <Invite size="mini" labelcolor="orange" list={true} />
          )}
          {prop.cashMode === "addCart" && (
            <AddCart size="mini" labelcolor="orange" list={true} />
          )}

          {prop.cashMode === "ChangePass" && (
            <ChangePass size="mini" labelcolor="orange" list={true} />
          )}

          {prop.mode === "transfer" && (
            <Transfer {...prop} blnBlock={blnBlock} />
          )}

          {depMode == "USDT" && <USDT {...prop} blnBlock={blnBlock} />}
          {depMode == "BTC" && <BTC {...prop} blnBlock={blnBlock} />}
          {depMode == "Toman" && (
            <>
              {loginToken?.bankInfos.length > 0 ? (
                <>
                  <Toman {...prop} blnBlock={blnBlock} />
                </>
              ) : (
                <>
                  <AddCartMsg {...prop} />
                </>
              )}
            </>
          )}
          {depMode == "PerfectMoney" && (
            <PerfectMoney {...prop} blnBlock={blnBlock} />
          )}
        </>
      )}
    </>
  );
};

export default depositArea;
