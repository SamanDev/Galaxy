import React, { useState } from "react";
import PerfectMoney from "./PerfectMoney";
import Transfer from "./Transfer";
import USDT from "./USDT";
import BTC from "./BTC";
import Toman from "./Toman";
import Ticket from "./Ticket";
import AddCart from "./AddCart";
import ChangePass from "./ChangePass";
import AddCartMsg from "../Deposit/addCartMsg";
import Report from "./Report";
import AccessMsg from "../../../../utils/accessMsg";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (prop) => {
  const [depMode] = useState(prop.gateway);

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  return (
    <>
      {prop.cashMode === "Report" && (
        <Report size="mini" labelcolor="orange" list={true} />
      )}
      {prop.cashMode === "Ticket" && (
        <Ticket size="mini" labelcolor="orange" list={true} />
      )}
      {prop.cashMode === "addCart" && (
        <AddCart size="mini" labelcolor="orange" list={true} />
      )}
      {prop.cashMode === "ChangePass" && (
        <ChangePass size="mini" labelcolor="orange" list={true} />
      )}
      {prop.mode === "transfer" && <Transfer {...prop} />}

      {depMode == "USDT" && <USDT {...prop} />}
      {depMode == "BTC" && <BTC {...prop} />}
      {depMode == "Toman" && (
        <>
          {loginToken?.bankInfos.length > 0 ? (
            <>
              <Toman {...prop} />
            </>
          ) : (
            <>
              <AddCartMsg {...prop} />
            </>
          )}
        </>
      )}
      {depMode == "PerfectMoney" && <PerfectMoney {...prop} />}
    </>
  );
};

export default depositArea;
