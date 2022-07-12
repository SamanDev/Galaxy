import React, { useState } from "react";
import PerfectMoney from "./PerfectMoney";
import Transfer from "./Transfer";
import USDT from "./USDT";
import BTC from "./BTC";
import Toman from "./Toman";
import Ticket from "./Ticket";
import AddCart from "./AddCart";
import ChangePass from "./ChangePass";

import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (props) => {
  const [depMode] = useState(props.cashMode);

  return (
    <span className="myaccount popupmenu">
      {depMode === "Ticket" && <Ticket {...props} />}
      {depMode === "addCart" && <AddCart size="mini" />}
      {depMode === "ChangePass" && (
        <ChangePass size="mini" labelcolor="yellow" />
      )}
      {depMode === "Transfer" && <Transfer />}
      {depMode == "USDT" && <USDT mode="USDT" />}
      {depMode == "Bitcoin" && <BTC mode="BTC" />}
      {depMode == "Toman" && <Toman mode="Toman" />}
      {depMode == "PerfectMoney" && <PerfectMoney mode="PerfectMoney" />}
    </span>
  );
};

export default depositArea;
