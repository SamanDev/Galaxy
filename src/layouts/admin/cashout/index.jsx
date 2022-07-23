import React, { useState } from "react";
import { Icon, Label, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";
import PerfectMoney from "./PerfectMoney";
import USDT from "./USDT";
import BTC from "./BTC";
import Toman from "./Toman";
import AddCartMsg from "../depositComponent/addCartMsg";
import { cashoutData } from "../../../const";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      <div id="dep1" className="deparea" style={{ margin: "5px 0" }}>
        <Header as="h4" className="farsi">
          لطفا روش برداشت را انتخاب کنید
        </Header>
        <Divider inverted />
        <Button.Group size="mini" vertical labeled icon fluid>
          {cashoutData.map(function (dep, i) {
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
        {depMode.value == "Toman" && (
          <>
            {loginToken?.bankInfos.length > 0 ? (
              <>
                <Toman mode={depMode.value} {...prop} />
              </>
            ) : (
              <>
                <AddCartMsg {...prop} />
              </>
            )}
          </>
        )}
        {depMode.value == "USDT" && <USDT mode={depMode.value} {...prop} />}
        {depMode.value == "BTC" && <BTC mode={depMode.value} {...prop} />}

        {depMode.value == "PerfectMoney" && (
          <PerfectMoney mode={depMode.value} {...prop} />
        )}
      </div>
    </>
  );
};

export default depositArea;
