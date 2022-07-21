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
    <>
      {depMode === "Ticket" && (
        <span className="myaccount popupmenu">
          <Ticket size="mini" labelcolor="orange" list={true} />
        </span>
      )}
      {depMode === "addCart" && (
        <span className="myaccount popupmenu">
          {props.title && (
            <>
              <Header
                as="h4"
                inverted
                className="farsi"
                style={{ marginTop: 10 }}
              >
                {props.title}
              </Header>

              <Divider inverted section />
            </>
          )}
          <AddCart size="mini" labelcolor="orange" list={true} />
        </span>
      )}
      {depMode === "ChangePass" && (
        <span className="myaccount popupmenu">
          <ChangePass size="mini" labelcolor="orange" list={true} />
        </span>
      )}
      {depMode === "Transfer" && <Transfer />}
      {depMode == "USDT" && <USDT mode={depMode} />}
      {depMode == "BTC" && <BTC mode={depMode} {...props} />}
      {depMode == "Toman" && <Toman mode={depMode} />}
      {depMode == "PerfectMoney" && <PerfectMoney mode="PerfectMoney" />}
    </>
  );
};

export default depositArea;
