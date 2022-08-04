import React, { useState } from "react";
import VisaGiftCode from "./VisaGiftCode";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import BankTransfer from "./BankTransfer";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";
import Cashout from "../cashout/cashoutComponent";

import AddCartMsg from "../cashout/AddCart";
import AccessMsg from "../../../utils/accessMsg";

import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(prop.depMode);
  const [refresh, setRefresh] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  if (loginToken?.accessToken) {
    return (
      <span className="myaccount popupmenu">
        {prop.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        {prop.compmode == "deposit" ? (
          <>
            {depMode == "Bank Transfer" && (
              <>
                {loginToken?.bankInfos.length > 0 ? (
                  <>
                    <BankTransfer
                      mode={depMode}
                      size="mini"
                      labelcolor="orange"
                      list={true}
                    />
                  </>
                ) : (
                  <>
                    <AddCartMsg
                      size="mini"
                      labelcolor="orange"
                      list={true}
                      setRefresh={setRefresh}
                    />
                  </>
                )}
              </>
            )}
            {depMode == "Online Cart to Cart" && (
              <>
                {loginToken?.bankInfos.length > 0 ? (
                  <>
                    <CartToCartOnline
                      mode={depMode}
                      size="mini"
                      labelcolor="orange"
                      list={true}
                    />
                  </>
                ) : (
                  <>
                    <AddCartMsg
                      size="mini"
                      labelcolor="orange"
                      list={true}
                      setRefresh={setRefresh}
                    />
                  </>
                )}
              </>
            )}
            {depMode == "Cart to Cart" && (
              <>
                {loginToken?.bankInfos.length > 0 ? (
                  <>
                    <CartToCart
                      mode={depMode}
                      size="mini"
                      labelcolor="orange"
                      list={true}
                    />
                  </>
                ) : (
                  <>
                    <AddCartMsg
                      size="mini"
                      labelcolor="orange"
                      list={true}
                      setRefresh={setRefresh}
                    />
                  </>
                )}
              </>
            )}

            {depMode == "USDT" && (
              <USDT
                mode={depMode}
                size="mini"
                labelcolor="orange"
                list={true}
              />
            )}
            {depMode == "BTC" && (
              <BTC mode="Bitcoin" size="mini" labelcolor="orange" list={true} />
            )}
            {depMode == "VisaGiftCode" && (
              <VisaGiftCode
                mode={depMode}
                size="mini"
                labelcolor="orange"
                list={true}
              />
            )}
            {depMode == "PerfectMoney" && (
              <PerfectMoney
                mode={depMode}
                size="mini"
                labelcolor="orange"
                list={true}
              />
            )}
          </>
        ) : (
          <>
            <Cashout
              mode={depMode}
              cashMode={depMode}
              size="mini"
              labelcolor="orange"
              list={true}
            />
          </>
        )}
      </span>
    );
  } else {
    return <AccessMsg />;
  }
};

export default depositArea;
