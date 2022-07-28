import React, { useState } from "react";
import PerfectMoney from "./PerfectMoney";
import Transfer from "./Transfer";
import USDT from "./USDT";
import BTC from "./BTC";
import Toman from "./Toman";
import Ticket from "./Ticket";
import AddCart from "./AddCart";
import ChangePass from "./ChangePass";
import AddCartMsg from "./AddCart";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (props) => {
  const [depMode] = useState(props.cashMode);
  const [refresh, setRefresh] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
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
      {depMode === "Transfer" && (
        <span className="myaccount popupmenu">
          <Transfer
            size="mini"
            labelcolor="orange"
            list={true}
            mode={depMode}
          />
        </span>
      )}

      {depMode == "USDT" && (
        <USDT mode={depMode} size="mini" labelcolor="orange" list={true} />
      )}
      {depMode == "BTC" && (
        <BTC
          mode={depMode}
          size="mini"
          labelcolor="orange"
          list={true}
          {...props}
        />
      )}
      {depMode == "Toman" && (
        <>
          {loginToken?.bankInfos.length > 0 ? (
            <>
              <Toman
                size="mini"
                labelcolor="orange"
                list={true}
                mode={depMode}
              />
            </>
          ) : (
            <>
              <AddCartMsg {...props} setRefresh={setRefresh} />
            </>
          )}
        </>
      )}
      {depMode == "PerfectMoney" && (
        <PerfectMoney
          size="mini"
          labelcolor="orange"
          list={true}
          mode={depMode}
        />
      )}
    </>
  );
};

export default depositArea;
