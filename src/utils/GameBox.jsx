import React from "react";
import { Segment } from "semantic-ui-react";
import AnimIcon from "./inviteIcon";
const SegmentExampleInverted = (prop) => {
  var icon = "sroxggda";
  var classn = "text-gold farsi";
  var name = prop.game;
  if (prop.game == "more") {
    name = "لیست بازی ها...";
    icon = "rwotyanb";
    var classn = "text-secondary-emphasis opacity-50 farsi";
  }
  if (prop.game == "poker") {
    name = "Online Poker";
    name = "پوکر آنلاین";
    icon = "sroxggda";
  }
  if (prop.game == "sportbet") {
    name = "شرط بندی ورزشی";
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
      className="fadeou5t"
      style={{
        background: "rgba(0,0,0,.5)",
        cursor: "pointer",
        overflow: "hidden",
        height: prop.height ? prop.height : 120,
      }}
    >
      <div
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
          }}
        >
          <AnimIcon
            icon={icon}
            width={prop.height ? prop.height : 100}
            height={prop.height ? prop.height : 100}
            trigger={prop.trigger}
            delay="5500"
            stroke="10"
          />
        </div>

        <div
          className={classn}
          style={{
            fontSize: prop.height ? parseInt(prop.height) / 8 + "px" : 20,
            padding: prop.height ? parseInt(prop.height) / 10 + "px" : 20,
          }}
        >
          {name}
        </div>
      </div>
    </Segment>
  );
};

export default SegmentExampleInverted;
