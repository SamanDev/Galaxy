import React, { useState, useEffect } from "react";
import { Segment, Label } from "semantic-ui-react";
import Balance from "./balance";
import Login from "./login";
import $ from "jquery";
const Leftcontent = (prop) => {
  const [loginToken, setloginToken] = useState(prop.loginToken);
  const [tCount, setTCount] = useState(0);

  const ticketCount = () => {
    var _data = loginToken?.userTickets
      .filter((d) => d.status !== "Closed")
      .sort((a, b) => (a.id < b.id ? 1 : -1));
    try {
      var d2 = _data.filter(
        (element) =>
          element.ticketMessages.sort((a, b) => (a.id < b.id ? 1 : -1))[0]
            .adminUser != loginToken?.username
      );
    } catch (error) {
      var d2 = [];
    }

    return d2.length;
  };
  useEffect(() => {
    if (loginToken?.username) {
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
    }
  }, [loginToken]);

  return (
    <div className="left_content d-flex">
      <Segment
        basic
        style={{
          color: "#fff",
          position: "relative",
          top: 7,
        }}
        as="a"
        href="#menuleft"
        aria-label="openmenu"
        title="openmenu"
        id="nav-icon2"
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Segment>
      {!prop.loginToken ? (
        <>
          <Login {...prop} />
        </>
      ) : (
        <>
          <Balance {...prop} />
        </>
      )}
    </div>
  );
};

export default Leftcontent;
