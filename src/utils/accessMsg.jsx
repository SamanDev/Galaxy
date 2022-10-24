import React, { useState } from "react";
import { Icon, Button, Header, Divider } from "semantic-ui-react";
import $ from "jquery";

const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [depMode, setDepMode] = useState(false);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      <span className="myaccount popupmenu">
        {prop.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        <div className="farsi text-center mymessage ui small">
          <Icon color="red" name="ban" size="huge" inverted />
          <br />
          <br />
          برای دسترسی به این قسمت باید وارد سیستم شوید.
          <br />
          <br />
          <Button
            color="orange"
            size="small"
            className="farsi"
            onClick={() => $("#openLogin").trigger("click")}
          >
            ورود
          </Button>{" "}
          <Button
            basic
            color="yellow"
            size="small"
            className="farsi"
            onClick={() => $("#openRegister").trigger("click")}
          >
            ثبت نام
          </Button>
          <Divider inverted />
          <Button
            color="blue"
            className="farsi"
            size="mini"
            as="a"
            href="https://telegram.me/GlxySupport"
            target="_blank"
          >
            <Icon
              name="telegram"
              size="large"
              style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
            />{" "}
            پشتیبانی تلگرام
          </Button>
          <Divider inverted />
          <Button
            color="blue"
            className="farsi"
            size="mini"
            as="a"
            href="https://t.me/GlxyChannel"
            target="_blank"
          >
            <Icon
              name="telegram"
              size="large"
              style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
            />{" "}
            کانال تلگرام
          </Button>
          <Button
            color="purple"
            className="farsi"
            size="mini"
            as="a"
            href="https://www.instagram.com/glxy2021.site/"
            target="_blank"
          >
            <Icon
              name="instagram"
              size="large"
              style={{ margin: "0 -0.42857143em 0 0.21428571em" }}
            />{" "}
            اینستاگرام
          </Button>
        </div>
      </span>
    </>
  );
};

export default depositArea;
