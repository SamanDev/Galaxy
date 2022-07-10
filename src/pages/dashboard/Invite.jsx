import React, { Component } from "react";
import { Message, Icon, Divider } from "semantic-ui-react";
import Register from "../../layouts/admin/auth/Invite";
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
        <Message color="red" compact className="mymessage" size="mini">
          <Message.Content className="farsi">
            لطفا نام کاربری و ایمیل دوست خود را وارد کنید. کلمه عبور و اطلاعات
            ورود به گلکسی برای ایشان ایمیل خواهد شد.
          </Message.Content>
        </Message>
        <Register />
      </span>
    );
  }
}
