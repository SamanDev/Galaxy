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
import { levelClass, levelPassClass } from "../const";
const LevelIcon = (prop) => {
  if (prop.text) {
    return (
      <div className="avatar-center">
        {prop.icon ? (
          <>
            <Image avatar>
              <i
                className={prop.icon + " " + levelPassClass(prop.level - 1)}
              ></i>
            </Image>
            <span className="levelText big">
              {prop.number ? prop.number : prop.level}
            </span>
          </>
        ) : (
          <>
            <Image avatar>
              <Icon
                name="star"
                inverted
                size="big"
                className={levelClass(prop.level - 1)}
              >
                <span className="levelText">
                  {prop.number ? prop.number : prop.level}
                </span>
              </Icon>
            </Image>
          </>
        )}

        <b>{prop.text}</b>
      </div>
    );
  } else {
    return (
      <Icon
        name="star"
        inverted
        size="big"
        className={levelClass(prop.level - 1)}
        {...prop}
      >
        <span className="levelText">
          {prop.number ? prop.number : prop.level}
        </span>
      </Icon>
    );
  }
};

export default LevelIcon;
