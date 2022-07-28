import React from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
} from "semantic-ui-react";
import {
  doCurrency,
  levelList,
  levelReward,
  levelRewardPercent,
  levelPercent,
} from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import LevelBar from "../../utils/LevelBar";
const LevelList = () => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  return (
    <>
      {loginToken && (
        <List.Item>
          <List.Content floated="right" className="rtl">
            <span className="text-gold">{doCurrency(1000000)} </span>
            <span className="mysmall">
              <small className="farsi">تومان پاداش</small>
            </span>
            <div className="mysmall">
              {doCurrency(12542515)}{" "}
              <small className="farsi mysmall">امتیاز امروز</small>
            </div>
          </List.Content>
          <span style={{ float: "left" }}>
            <LevelIcon
              icon="fas fa-medal big star noNext"
              level={1}
              text={"User name"}
            />
          </span>
          <div
            style={{
              position: "relative",
              left: -50,
              transform: "scale(.8)",
            }}
          >
            <LevelIcon level={loginToken.level} text={loginToken.username} />
          </div>
          <div className="levelbar">
            <>
              <LevelBar progress />
            </>
          </div>
        </List.Item>
      )}
    </>
  );
};

export default LevelList;
