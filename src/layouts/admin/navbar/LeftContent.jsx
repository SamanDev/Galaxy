import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Segment, Icon, Label, Popup, Progress } from "semantic-ui-react";
import Balance from "./balance";
import Login from "./login";
import $ from "jquery";
const Leftcontent = (prop) => {
  var loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [isUser, setIsUser] = useState(loginToken ? true : false);
  const [tCount, setTCount] = useState(0);
  useEffect(() => {
    setIsUser(prop.isLogin);
  }, []);
  useEffect(() => {
    setIsUser(prop.isLogin);
  }, [prop.isLogin]);

  const ticketCount = () => {
    var _data = loginToken?.userTickets.sort((a, b) => (a.id < b.id ? 1 : -1));
    try {
      var d2 = _data.filter(
        (element) =>
          element.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
            .adminUser != loginToken.username
      );
    } catch (error) {
      var d2 = [];
    }

    return d2.length;
  };
  useEffect(() => {
    loginToken = JSON.parse(localStorage.getItem("loginToken"));
    var _tCount = ticketCount();
    if (_tCount > 0) {
      if ($(".tcuntmenu").length) {
        $(".tcuntmenu").text(_tCount);
      } else {
        $(".support")
          .closest("a")
          .append(
            '<small class="ui red  mini label myfloatmenubonus tcuntmenu">' +
              _tCount +
              "</small>"
          );
      }
    } else {
      $(".tcuntmenu").remove();
    }
    setTCount(_tCount);
  });

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
              hidden={tCount == 0}
              className="farsi-inline"
              style={{ top: 0, left: 20 }}
            >
              {tCount}
            </Label>
          </Segment>

          <Balance {...prop} />
        </>
      )}
    </div>
  );
};

export default Leftcontent;
