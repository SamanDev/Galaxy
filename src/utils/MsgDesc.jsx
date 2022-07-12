import React, { useState } from "react";
import {
  Message,
  Label,
  Input,
  Button,
  Icon,
  Segment,
} from "semantic-ui-react";

const myMessage = (prop) => {
  return (
    <Message
      color={prop.color}
      as={Segment}
      className="mymessage"
      size="small"
      icon={prop.icon ? true : false}
      inverted
    >
      {prop.icon && <Icon name={prop.icon} />}
      <Message.Content className="farsi">{prop.text}</Message.Content>
    </Message>
  );
};
export default myMessage;
