import React, { Component } from "react";
import { Message, Icon, Divider } from "semantic-ui-react";
import Register from "../../layouts/admin/auth/Invite";
import MyMsg from "../../utils/MsgDesc";
const AccordionExampleStandard = (prop) => {
  return (
    <span className="myaccount popupmenu">
      <MyMsg
        icon="users"
        color="yellow"
        size="mini"
        text={
          <>
            <h5 className="farsi lh-lg">ساخت اکانت برای دوستان</h5>لطفا نام
            کاربری و ایمیل دوست خود را وارد کنید. کلمه عبور و اطلاعات ورود به
            گلکسی برای ایشان ایمیل خواهد شد.
          </>
        }
      />

      <Register labelcolor="orange" size="mini" {...prop} />
    </span>
  );
};

export default AccordionExampleStandard;
