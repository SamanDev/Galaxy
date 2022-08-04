import React, { Component } from "react";
import { Accordion, Icon, Divider } from "semantic-ui-react";
import Comment from "./Comment";
import AccessMsg from "../../utils/accessMsg";
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
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));
    if (loginToken?.accessToken) {
      return (
        <span className="myaccount popupmenu">
          <Accordion inverted fluid>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              <span className="date">7/5/2022 00:02</span>
              <span className="farsi">پشتیبانی فنی</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <Comment />
            </Accordion.Content>
            <Divider inverted />
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              <span className="date">7/5/2022 00:02</span>
              <span className="farsi">پشتیبانی فنی</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Comment />
            </Accordion.Content>
            <Divider inverted />
            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              <Icon name="dropdown" />
              <span className="date">7/5/2022 00:02</span>
              <span className="farsi">پشتیبانی فنی</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <Comment />
            </Accordion.Content>
          </Accordion>
        </span>
      );
    } else {
      return <AccessMsg />;
    }
  }
}
