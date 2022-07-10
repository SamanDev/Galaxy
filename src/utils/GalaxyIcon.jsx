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
  if (prop.mode == "gpass") {
    return (
      <div className="avatar-center" {...prop}>
        <Image avatar>
          <i
            className={
              prop.level
                ? "fab fa-google big star lv1 " + levelPassClass(prop.level - 1)
                : "fab fa-google big star lv15 shad2"
            }
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "vip") {
    return (
      <div className="avatar-center" {...prop}>
        <Image avatar>
          <i
            className={"fab fa-vimeo-v big star yellow inverted"}
            style={{ fontSize: 27 }}
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "bonus") {
    return (
      <div className="avatar-center" {...prop}>
        <Image avatar>
          <i
            className={"fas fa-percent big star grey"}
            style={{ fontSize: 27 }}
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "league") {
    return (
      <div className="avatar-center" {...prop}>
        <Image avatar>
          <i
            className={
              "fas fa-medal big star lv1 " + levelPassClass(prop.level - 1)
            }
          ></i>
        </Image>
        <span className="levelText big">
          {prop.number ? prop.number : prop.level}
        </span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift1") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift1.png" />

        <span className="levelText big mybig"></span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift2") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift2.png" />
        <span className="levelText big mybig">+7</span>
        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "gift3") {
    return (
      <div className="avatar-center" {...prop}>
        <Image src="/assets/images/gift3.png" />
        <span className="levelText big mybig">+25</span>

        <div>{prop.text}</div>
      </div>
    );
  }
  if (prop.mode == "levels") {
    return (
      <div className="avatar-center" {...prop}>
        <Image avatar>
          <Icon
            name="star"
            inverted
            className={
              prop.level
                ? "big " + levelClass(prop.level - 1)
                : "big lv30 shad2"
            }
          >
            <span className="levelText">
              {prop.number ? prop.number : prop.level}
            </span>
          </Icon>
        </Image>

        <div>{prop.text}</div>
      </div>
    );
  }
};

export default LevelIcon;
