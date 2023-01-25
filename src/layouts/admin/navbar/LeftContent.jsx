import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import Balance from "./balance";
import Login from "./login";

const Leftcontent = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [isUser, setIsUser] = useState(loginToken ? true : false);
  useEffect(() => {
    setIsUser(prop.isLogin);
  }, []);
  useEffect(() => {
    setIsUser(prop.isLogin);
  }, [prop.isLogin]);

  return (
    <div className="left_content d-flex">
      {!isUser ? (
        <>
          <a href="#menuleft" aria-label="openmenu" title="openmenu">
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
              aria-label="openmenu"
            ></Segment>
          </a>

          <Login {...prop} />
        </>
      ) : (
        <>
          <Segment
            basic
            className="d-none d-sm-inline"
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
            name="openmenu"
          >
            <Label
              color="red"
              floating
              size="mini"
              hidden={loginToken?.userTickets?.length == 0}
              className="farsi-inline"
              style={{ top: 0, left: 20 }}
              onClick={() => {
                prop.openPanel(".support");
              }}
            >
              {loginToken?.userTickets?.length}
            </Label>
          </Segment>

          <Balance {...prop} />
        </>
      )}
    </div>
  );
};

export default Leftcontent;
