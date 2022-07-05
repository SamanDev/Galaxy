import React from "react";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import DepositArea from "../deposit/index.jsx";
import CashoutArea from "../cashout/index.jsx";

const Balance = () => (
  <>
    <Segment
      basic
      inverted
      style={{
        margin: 0,
        padding: 0,
        background: "transparent",
        marginRight: 20,
        paddingTop: 12,
        paddingLeft: 15,
      }}
    >
      <mm-burger
        id="openMenu"
        menu="menuleft"
        fx="spin"
        ease="funky"
        role="button"
        tabindex="0"
        title="Open the menu"
      ></mm-burger>
    </Segment>

    <Segment
      className="myaccount"
      inverted
      style={{ margin: 0, padding: 10, color: "#fff" }}
    >
      <Icon
        name="star"
        inverted
        size="big"
        className="lv30"
        style={{ position: "relative", textAlign: "center", top: -3 }}
      >
        <Label
          size="tiny"
          style={{
            margin: 0,
            padding: 0,
            color: "#fff",
            background: "transparent",
            position: "relative",
            top: "-120%",
            fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
          }}
        >
          30
        </Label>
      </Icon>
      <Label color="black" className="balanceLable">
        HangOver
      </Label>
      <Label color="black" className="balanceLable amount">
        1,000,000
      </Label>
      <Popup
        on="click"
        className="myaccount"
        inverted
        position="bottom center"
        offset={[-50, 0]}
        basic
        trigger={
          <Icon circular size="small" inverted name="plus" color="green" />
        }
      >
        <DepositArea />
      </Popup>{" "}
      <Popup
        on="click"
        className="myaccount"
        inverted
        position="bottom center"
        offset={[-78, 0]}
        basic
        trigger={
          <Icon circular size="small" inverted color="red" name="minus" />
        }
      >
        <CashoutArea />
      </Popup>{" "}
      <Popup
        on="click"
        className="myaccount"
        inverted
        position="bottom center"
        offset={[-106, 0]}
        basic
        trigger={<i className="fas fa-ellipsis-h  d-none d-sm-inline"></i>}
      >
        <Label color="black">
          Balance:
          <Label.Detail>1,000,000</Label.Detail>
        </Label>
        <br />
        <Label color="black">
          On Table:
          <Label.Detail>500,000</Label.Detail>
        </Label>
        <br />
        <Label color="black">
          Total:
          <Label.Detail>1,0500,000</Label.Detail>
        </Label>
        <br />
        <Progress
          percent={90}
          inverted
          indicating
          size="small"
          style={{
            margin: 0,

            marginTop: 5,
          }}
        >
          50%
        </Progress>
      </Popup>
      <Progress
        percent={50}
        inverted
        indicating
        size="tiny"
        style={{
          margin: 0,
          padding: 0,
          height: 3,
          position: "absolute",
          marginTop: 5,
          right: 5,
          left: 5,
        }}
      />
    </Segment>
  </>
);

export default Balance;
