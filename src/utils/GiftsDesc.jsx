import React, { useEffect } from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
  Segment,
} from "semantic-ui-react";
import { doCurrency } from "../const";
import $ from "jquery";
const LevelIcon = (prop) => {
  useEffect(() => {}, []);
  return (
    <Segment inverted basic>
      <div className="mybig">
        {prop.amount && (
          <span className="text-gold">{doCurrency(prop.amount)} </span>
        )}
        {prop.title && <span className="text-gold farsi">{prop.title}</span>}
        <div className="mysmall">
          <small className="farsi">{prop.subtitle}</small>
        </div>
      </div>
      {prop.desc && (
        <>
          <Divider />
          <div className="farsi mywrap">{prop.desc}</div>
        </>
      )}
      {prop.desc2 && (
        <>
          <Divider />
          <div className="farsi mywrap">{prop.desc2}</div>
        </>
      )}
      {prop.desc3 && (
        <>
          <Divider />
          <div className="farsi mywrap">{prop.desc3}</div>
        </>
      )}
      {prop.desc4 && (
        <>
          <Divider />
          <div className="farsi mywrap">{prop.desc4}</div>
        </>
      )}
      {prop.desc5 && (
        <>
          <Divider />
          <div className="farsi mywrap">{prop.desc5}</div>
        </>
      )}
    </Segment>
  );
};

export default LevelIcon;
