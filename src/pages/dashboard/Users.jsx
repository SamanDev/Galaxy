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
const SelectB = "hamid3509,Teepees".split(",");
const bankOptions = [];
SelectB.map(function(bank, i) {
  bankOptions.push({ key: i, user: bank, level: 30, amount: 2150525 });
});
const LevelList = () => {
  return (
    <span className="myaccount popupmenu">
      <List inverted verticalAlign="middle" className="userblock">
        {bankOptions.map((lvl, i) => {
          return (
            <List.Item key={i}>
              <List.Content floated="right" className="farsi">
                مجموع پاداش ها
                <List.Header>{doCurrency(lvl.amount)}</List.Header>
              </List.Content>
              <div className="avatar-center">
                <Image avatar>
                  <Icon
                    name="star"
                    inverted
                    size="big"
                    className={"lv" + lvl.level}
                  >
                    <span className="levelText">{lvl.level}</span>
                  </Icon>
                </Image>
                <span className="text-gold">{lvl.user}</span>
              </div>
              <Divider inverted fitted />
            </List.Item>
          );
        })}
        {bankOptions.map((lvl, i) => {
          return (
            <List.Item key={i}>
              <List.Content floated="right" className="farsi">
                مجموع پاداش ها
                <List.Header>{doCurrency(lvl.amount)}</List.Header>
              </List.Content>
              <div className="avatar-center">
                <Image src="https://galaxy10x.site/images/tophand3.png" />
                <span className="levelText">{lvl.level}</span>

                <span className="text-gold">{lvl.user}</span>
              </div>
              <Divider inverted fitted />
            </List.Item>
          );
        })}
      </List>
    </span>
  );
};

export default LevelList;
