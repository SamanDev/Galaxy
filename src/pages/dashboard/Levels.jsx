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
import { doCurrency } from "../../const";
const levelList = "1,5,15,30,50,100,200,300,400,500,600,700,800,900,1000,1200,1400,1600,1800,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,10000".split(
  ","
);

const LevelList = () => {
  return (
    <span className="myaccount popupmenu">
      <List divided inverted verticalAlign="middle" className="myaccount">
        {levelList.map((lvl, i) => {
          return (
            <List.Item key={i}>
              <List.Content floated="right" className="farsi">
                <List.Header>Level {i + 1}</List.Header>

                <Label size="mini" color="red" className="farsi detail">
                  پاداش
                  <Label.Detail className="nof">
                    {doCurrency(levelList[i] * 1000)}
                  </Label.Detail>
                </Label>
                <Divider hidden fitted />
                <Label size="mini" color="black" className="farsi detail">
                  کمیسیون
                  <Label.Detail className="nof">{i + 10}٪</Label.Detail>
                </Label>
              </List.Content>

              <Image avatar>
                <Icon
                  name="star"
                  inverted
                  size="big"
                  className={"lv" + (i + 1)}
                >
                  <span className="levelText">{i + 1}</span>
                </Icon>
              </Image>
              <Divider hidden fitted />
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
