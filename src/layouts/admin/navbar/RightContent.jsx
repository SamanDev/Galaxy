import React from "react";

import { Segment, Icon, Label, Popup } from "semantic-ui-react";
import BonusArea from "../bonus/index.jsx";

const Rightcontent = (prop) => {
  return (
    <div className="right_content  d-flex">
      <Segment
        basic
        inverted
        style={{
          margin: 0,
          padding: 0,
          background: "transparent",
          zIndex: 2000,
          position: "relative",
        }}
      >
        <a className="menu-link-wrapper" href="#panelright">
          <div className="menu-link menu-trigger-open">
            <span className="lines"></span>
          </div>
        </a>
      </Segment>
    </div>
  );
};

export default Rightcontent;
