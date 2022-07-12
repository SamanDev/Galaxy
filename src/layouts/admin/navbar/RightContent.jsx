import React from "react";

import { Segment, Icon, Label, Popup } from "semantic-ui-react";
import BonusArea from "../bonus/index.jsx";

import { useIsLogin } from "../../../hook/authHook";
const Rightcontent = (prop) => {
  const [loading, isLogin] = useIsLogin();
  return (
    <div className="right_content  d-flex">
      {loading ? (
        <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
      ) : !isLogin ? (
        <></>
      ) : (
        <>
          <Segment
            basic
            className="d-none d-sm-inline"
            style={{ margin: 0, padding: "10px 5px", lineHeight: "27px" }}
          >
            <Popup
              on="click"
              className="myaccount"
              inverted
              position="bottom center"
              offset={[-78, 0]}
              basic
              trigger={
                <Icon name="gift" size="large" link inverted color="red">
                  <Label
                    color="red"
                    floating
                    size="mini"
                    className="farsi-inline"
                    style={{ top: 0, left: 10 }}
                  >
                    2
                  </Label>
                </Icon>
              }
            >
              <BonusArea {...prop} />
            </Popup>{" "}
          </Segment>
          <Segment
            basic
            className="d-none d-sm-inline"
            style={{ margin: 0, padding: "10px 5px", lineHeight: "27px" }}
            onClick={() => {
              prop.openPanel(".support");
            }}
          >
            <Icon
              name="facebook messenger"
              size="large"
              inverted
              link
              color="yellow"
            >
              <Label
                color="red"
                floating
                size="mini"
                className="farsi-inline"
                style={{ top: 0, left: 10 }}
              >
                2
              </Label>
            </Icon>
          </Segment>
        </>
      )}

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
