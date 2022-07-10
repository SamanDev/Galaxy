import React, { useState } from "react";
import { Segment, Icon, Label, Popup, Button, Modal } from "semantic-ui-react";
import LoginArea from "../auth/Login.jsx";
import RegisterArea from "../auth/Register.jsx";
import LevelIcon from "../../../utils/LevelIcon";
import { Outlet, unstable_HistoryRouter, useParams } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";

const Balance = (prop) => {
  return (
    <>
      <Segment
        className="myaccount"
        inverted
        style={{
          margin: 0,
          padding: 10,
          color: "#fff",
          background: "transparent",
        }}
      >
        <Button
          color="orange"
          size="mini"
          className="farsi"
          id="openLogin"
          onClick={() => prop.setFirstOpen(true)}
        >
          ورود
        </Button>{" "}
        <Button
          color="yellow"
          size="mini"
          basic
          className="farsi"
          id="openRegister"
          onClick={() => prop.setSecondOpen(true)}
        >
          ثبت نام
        </Button>
      </Segment>
    </>
  );
};

export default Balance;
