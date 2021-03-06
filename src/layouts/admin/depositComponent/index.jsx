import React, { useState } from "react";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";
import VisaGiftCode from "./VisaGiftCode";
import PerfectMoney from "./PerfectMoney";
import BankTransfer from "./BankTransfer";
import CartToCart from "./CartToCart";
import CartToCartOnline from "./CartToCartOnline";
import AddCartMsg from "./addCartMsg";
import USDT from "./USDT";
import BTC from "./BTC";
import { depositData } from "../../../const";
import CashoutArea from "../cashout/index";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      {prop.compmode == "deposit" ? (
        <>
          <div id="dep1" className="deparea" style={{ margin: "5px 0" }}>
            <Header as="h4" className="farsi">
              لطفا روش پرداخت را انتخاب کنید
            </Header>
            <Divider inverted />
            <Button.Group size="mini" vertical labeled icon fluid>
              {depositData.map(function (dep, i) {
                if (prop.getAccess(dep.getwaykey)) {
                  return (
                    <Button
                      key={i}
                      active={depMode.value == dep.value}
                      onClick={() => {
                        setDepMode(dep);
                        $(".deparea").hide();
                        $("#dep2").show();
                      }}
                      color={depMode.value == dep.value ? selColBtn : defColBtn}
                    >
                      <Icon name={dep.icon} color="black" />
                      <span className="farsi">{dep.text}</span>
                      <Label
                        size="mini"
                        floating
                        color={depMode.value == dep.value ? selCol : defCol}
                        pointing="left"
                        className="myfloat"
                      >
                        {dep.limit}
                      </Label>
                      {dep.bonus && (
                        <Label
                          size="mini"
                          color="red"
                          style={{ position: "absolute", top: 5, right: 100 }}
                        >
                          {dep.bonus}
                        </Label>
                      )}
                    </Button>
                  );
                } else {
                  return null;
                }
              })}
            </Button.Group>
          </div>
          <div
            id="dep2"
            className="deparea"
            style={{ margin: "5px 0", display: "none" }}
          >
            <Header as="h4" floated="right" className="farsi">
              {depMode.text}
            </Header>
            <div
              className="farsi"
              style={{ cursor: "pointer", textAlign: "left" }}
              onClick={() => {
                setDepMode(false);
                $(".deparea").hide();
                $("#dep1").show();
              }}
            >
              بازگشت <Icon name="arrow alternate circle left outline" />
            </div>

            <Divider inverted />
            {depMode.value == "USDT" && prop.getAccess(depMode.getwaykey) && (
              <USDT
                mode={depMode.value}
                size="mini"
                labelcolor="orange"
                penMode="Deposit"
              />
            )}
            {depMode.value == "Bank Transfer" && (
              <>
                {loginToken?.bankInfos.length > 0 ? (
                  <>
                    <BankTransfer
                      mode={depMode.value}
                      size="mini"
                      labelcolor="orange"
                      pending={true}
                      penMode="Deposit"
                    />
                  </>
                ) : (
                  <>
                    <AddCartMsg {...prop} />
                  </>
                )}
              </>
            )}
            {depMode.value == "Cart to Cart" &&
              prop.getAccess(depMode.getwaykey) && (
                <>
                  {loginToken?.bankInfos.length > 0 ? (
                    <>
                      <CartToCart
                        mode={depMode.value}
                        size="mini"
                        labelcolor="orange"
                        penMode="Deposit"
                      />
                    </>
                  ) : (
                    <>
                      <AddCartMsg {...prop} />
                    </>
                  )}
                </>
              )}
            {depMode.value == "Online Cart to Cart" &&
              prop.getAccess(depMode.getwaykey) && (
                <>
                  {loginToken?.bankInfos.length > 0 ? (
                    <>
                      <CartToCartOnline
                        mode={depMode.value}
                        size="mini"
                        labelcolor="orange"
                        penMode="Deposit"
                      />
                    </>
                  ) : (
                    <>
                      <AddCartMsg {...prop} />
                    </>
                  )}
                </>
              )}
            {depMode.value == "BTC" && (
              <BTC
                mode="Bitcoin"
                size="mini"
                labelcolor="orange"
                penMode="Deposit"
              />
            )}
            {depMode.value == "VisaGiftCode" && (
              <VisaGiftCode
                mode={depMode.value}
                size="mini"
                labelcolor="orange"
                penMode="Deposit"
              />
            )}
            {depMode.value == "PerfectMoney" && (
              <PerfectMoney
                mode={depMode.value}
                size="mini"
                labelcolor="orange"
                penMode="Deposit"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <CashoutArea
            cashMode={depMode.value}
            size="mini"
            labelcolor="orange"
            penMode="Cashout"
            {...prop}
          />
        </>
      )}
    </>
  );
};

export default depositArea;
