import React, { Component } from "react";
import { Message, Icon, Divider } from "semantic-ui-react";
import Register from "../../layouts/admin/auth/Invite";
import MyMsg from "../../utils/MsgDesc";
export default class AccordionExampleStandard extends Component {
  state = { activeIndex: 0 };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

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

        <Register labelcolor="orange" size="mini" />
      </span>
    );
  }
}
