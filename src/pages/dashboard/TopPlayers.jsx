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
import { doCurrency, levelPassReward, levelDataInfo } from "../../const";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import GiftsDesc from "../../utils/GiftsDesc";
import TopPlayerResult from "./TopPlayersResult";
const LevelList = () => {
  var totalReward = 0;
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className=" text-center">
            <GalaxyIcon
              mode="topplayer"
              level=""
              text="Top Players"
              classinside="iconinside0"
              number=""
              width="60px"
              amin="inline animated flipInY"
              iconamin=""
            />
          </List.Content>
        </List.Item>
        <TopPlayerResult />
      </List>
    </span>
  );
};

export default LevelList;
