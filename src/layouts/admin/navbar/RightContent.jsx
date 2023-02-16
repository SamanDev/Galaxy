import React from "react";

import { Segment } from "semantic-ui-react";
import $ from "jquery";
const Rightcontent = (prop) => {
  const activePanel = prop.activePanel;
  return (
    <div className="right_content  d-flex">
      <Segment
        basic
        style={{
          color: "#fff",
          position: "absolute",
          top: 8,
          right: 5,
          opacity: 1,
          padding: 0,
          cursor: "pointer",
        }}
        onClick={() => {
          prop.setActivePanel(!activePanel);
          $(".picn").toggleClass("open");
        }}
      >
        <div id="nav-icon1" className="picn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Segment>
    </div>
  );
};

export default Rightcontent;
