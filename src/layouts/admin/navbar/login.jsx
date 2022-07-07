import React, { useState } from "react";
import { Segment, Icon, Label, Popup, Button, Modal } from "semantic-ui-react";
import LoginArea from "../auth/Login.jsx";
import RegisterArea from "../auth/Register.jsx";
import LevelIcon from "../../../utils/LevelIcon";
const Balance = (prop) => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  return (
    <>
      <Modal
        basic
        size="mini"
        className="myaccount popupmenu"
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
      >
        <Modal.Content>
          <LoginArea
            setFirstOpen={setFirstOpen}
            setSecondOpen={setSecondOpen}
          />
        </Modal.Content>
      </Modal>
      <Modal
        basic
        size="mini"
        className="myaccount popupmenu"
        onClose={() => setSecondOpen(false)}
        onOpen={() => setSecondOpen(true)}
        open={secondOpen}
      >
        <Modal.Content>
          <RegisterArea
            setFirstOpen={setFirstOpen}
            setSecondOpen={setSecondOpen}
          />
        </Modal.Content>
      </Modal>
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
          color="teal"
          size="mini"
          className="farsi"
          id="openLogin"
          onClick={() => setFirstOpen(true)}
        >
          ورود
        </Button>{" "}
        <Button
          color="red"
          size="mini"
          className="farsi"
          id="openRegister"
          onClick={() => setSecondOpen(true)}
        >
          ثبت نام
        </Button>
      </Segment>
    </>
  );
};

export default Balance;
