import React, { useState } from "react";
import {
  Message,
  Label,
  Input,
  Button,
  Icon,
  Segment,
} from "semantic-ui-react";

import Swal from "sweetalert2";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MyMsg from "../../utils/MsgDesc";
const Toast = Swal.mixin({
  toast: false,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: false,
});

const depositArea = () => {
  const [copy, setCopy] = useState(false);

  const copyDo = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  return (
    <span className="myaccount popupmenu">
      <MyMsg
        icon="linkify"
        color="red"
        text="برای معرفی دوستان خود کافیست لینک زیر را برای ایشان ارسال نمایید."
      />

      <Input
        size="mini"
        readOnly
        fluid
        label={
          <Label size="tiny" pointing="right" color="yellow" className="farsi">
            لینک شما
          </Label>
        }
        labelPosition="left"
        defaultValue="https://galaxy10g.site/ref/HangOver"
      />

      <CopyToClipboard
        text="https://galaxy10g.site/ref/HangOver"
        onCopy={() => copyDo()}
      >
        <Button
          icon
          labelPosition="left"
          size="small"
          color={copy ? "green" : "orange"}
          fluid
          className="farsi"
        >
          {!copy ? (
            <>
              <Icon name="copy outline" />
              کپی کردن لینک
            </>
          ) : (
            <>
              <Icon name="check" /> کپی شد
            </>
          )}
        </Button>
      </CopyToClipboard>
    </span>
  );
};
export default depositArea;
