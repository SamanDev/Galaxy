import React, { useState } from "react";
import { Button, Message, Icon } from "semantic-ui-react";
import $ from "jquery";
import { resendActivationLink } from "../../../../services/auth";
import { MyConfirm, MyToast, MyDeposit } from "../../../../utils/myAlert";
import { Alert } from "../../../../utils/alerts";
const defCol = "black";
const selCol = "green";
const defColBtn = "grey";
const selColBtn = "orange";
const depositArea = (prop) => {
  const [loading, setLoading] = useState(false);
  const loginToken = prop.loginToken;
  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await resendActivationLink();
      if (res.status == 200) {
        setLoading(false);
        MyToast("ارسال شد");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
  return (
    <>
      <Message color="red" compact className="mymessage" size="mini" icon>
        <Icon
          circular
          inverted
          color="black"
          name="mail outline"
          style={{ fontSize: 20 }}
        />

        <Message.Content className="farsi">
          برای استفاده از این سرویس ابتدا باید ایمیل خود را تایید نمایید.
        </Message.Content>
      </Message>
      <Button
        fluid
        style={{ margin: "10px 0" }}
        className="farsi"
        color="red"
        disabled={loading}
        loading={loading}
        onClick={() => onSubmit()}
      >
        ارسال لینک تایید
      </Button>
    </>
  );
};

export default depositArea;
