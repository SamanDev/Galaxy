import React from "react";
import { Link } from "react-router-dom";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import Balance from "./balance";
import Login from "./login";
import { useIsLogin } from "../../../hook/authHook";
const Leftcontent = (prop) => {
  const [loading, isLogin] = useIsLogin();
  return (
    <div className="left_content d-flex">
      <Segment
        basic
        inverted
        style={{
          color: "#fff",
          position: "relative",
          top: 3,
          padding: "0 20px",
        }}
        menu="menuleft"
        tabIndex="0"
        fx="spin"
        ease="funky"
        role="button"
        as="mm-burger"
      ></Segment>
      {loading ? (
        <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
      ) : !isLogin ? (
        <Login {...prop} />
      ) : (
        <Balance {...prop} />
      )}
    </div>
  );
};

export default Leftcontent;
