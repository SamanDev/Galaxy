import React, { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";
import { Segment, Icon, Label } from "semantic-ui-react";
import $ from "jquery";
const Rightcontent = () => {
  const { setShoeSidebar } = useContext(AdminContext);
  return (
    <div className="right_content  d-flex">
      <Segment
        basic
        className="d-none d-sm-inline"
        style={{ margin: 0, padding: 10 }}
        onClick={() => {
          $("#openMenu").trigger("click");
        }}
      >
        <Icon name="facebook messenger" circular inverted color="yellow" />
        <Label color="red" floating size="mini" style={{ top: 0, left: 30 }}>
          22
        </Label>
      </Segment>
      <Segment
        basic
        inverted
        style={{
          margin: 0,
          padding: 0,
          background: "transparent",
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
