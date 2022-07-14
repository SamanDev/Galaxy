import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import Balance from "./balance";
import Login from "./login";

const Leftcontent = (prop) => {
  const [isUser, setIsUser] = useState(prop.isLogin);
  useEffect(() => {
    setIsUser(prop.isLogin);
  });

  return (
    <div className="left_content d-flex">
      {!isUser ? (
        <>
          <a href="#menuleft">
            <Segment
              basic
              inverted
              style={{
                color: "#fff",
                position: "relative",
                top: 2,
                padding: "14px 20px",
              }}
              menu="menuleft"
              tabIndex="0"
              fx="spin"
              ease="funky"
              role="button"
              as="mm-burger"
            ></Segment>
          </a>
          <Login {...prop} />
        </>
      ) : (
        <>
          <Segment
            basic
            inverted
            style={{
              color: "#fff",
              position: "relative",
              top: 2,
              padding: "0 20px",
            }}
            menu="menuleft"
            tabIndex="0"
            fx="spin"
            ease="funky"
            role="button"
            as="mm-burger"
          ></Segment>

          <Balance {...prop} />
        </>
      )}
    </div>
  );
};

export default Leftcontent;
