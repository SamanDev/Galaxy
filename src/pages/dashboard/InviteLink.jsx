import React, { Component } from "react";
import { Message, Label, Input } from "semantic-ui-react";
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
            برای معرفی دوستان خود کافیست لینک زیر را برای ایشان ارسال نمایید.
          </Message.Content>
        </Message>
        <Input
          size="mini"
          readOnly
          fluid
          label={
            <Label
              size="tiny"
              pointing="right"
              color="yellow"
              className="farsi"
            >
              لینک شما
            </Label>
          }
          labelPosition="left"
          defaultValue="https://galaxy10g.site/ref/HangOver"
        />
      </span>
    );
  }
}
