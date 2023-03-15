import React from "react";
import { Segment } from "semantic-ui-react";
import AnimIcon from "./inviteIcon";
const SegmentExampleInverted = (prop) => {
  var icon = "sroxggda";
  var name = prop.game;
  if (prop.game == "poker") {
    name = "Online Poker";
    icon = "sroxggda";
  }
  if (prop.game == "sportbet") {
    name = "Sport Bet";
    icon = "xlmenhhh";
  }
  if (prop.game == "crash") {
    name = "BoOoOoM";
    icon = "scsthizh";
  }
  if (prop.game.indexOf("roulette") > -1) {
    name = prop.game.replace("roulette", "roulette ");
    icon = "iexaoqby";
  }
  if (prop.game.indexOf("wheel") > -1) {
    name = prop.game;
    icon = "aadumupd";
  }
  if (prop.game.indexOf("slot") > -1) {
    name = prop.game.replace("slot", "Slot ");
    icon = "eagxishj";
  }
  if (prop.game.indexOf("blackjack") > -1) {
    name = prop.game.replace("blackjack", "blackjack");
    icon = "qdxgyudy";
  }
  return (
    <Segment
      inverted
      raised
      className="fadeout"
      style={{
        background: "rgba(0,0,0,.5)",
        cursor: "pointer",
        overflow: "hidden",
        height: prop.height ? prop.height : 120,
      }}
    >
      <div
        className="fadeout"
        style={{
          height: prop.height ? prop.height : 100,
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: -1,
            top: -10,
            left: "10%",
          }}
        >
          <AnimIcon
            icon={icon}
            width="300px"
            height="150px"
            trigger="hover"
            stroke="10"
          />
        </div>
        <div className="text-gold fs-4 p-3 text-capitalize">{name}</div>
      </div>
    </Segment>
  );
};

export default SegmentExampleInverted;
