import React, { useState } from "react";
import { Accordion, Icon, Divider, List, Segment } from "semantic-ui-react";
import Comment from "./Comment";
import AccessMsg from "../../utils/accessMsg";
import { convertDateToJalali } from "../../utils/convertDate";
import Ticket from "../../layouts/admin/forms/Cashout/Ticket";
const Balance = (prop) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  var data = loginToken?.userTickets.sort((a, b) => (a.id < b.id ? 1 : -1));
  if (loginToken?.accessToken) {
    return (
      <span
        className="myaccount popupmenu mm-listview menutitle-view"
        style={{ padding: "0 15px" }}
      >
        {loginToken.userTickets.length == 0 && (
          <>
            <List.Item>
              <List.Content>
                <List.Description className="farsi text-center">
                  <Icon
                    circular
                    color="teal"
                    name="clipboard outline"
                    size="big"
                    inverted
                  />
                  <br />
                  <br />
                  هیچ تیکتی یافت نشد.
                </List.Description>
              </List.Content>
            </List.Item>
          </>
        )}
        {loginToken.userTickets.length > 0 && (
          <Accordion inverted fluid>
            {data.map((ticket, i) => (
              <Segment key={i} inverted basic>
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={handleClick}
                >
                  <Icon name="dropdown" />
                  <span className="date">
                    {convertDateToJalali(ticket.date)}
                  </span>
                  <span className="farsi">{ticket.department}</span>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === i}>
                  <Ticket
                    departman={ticket.department}
                    id={ticket.id}
                    setRefresh={setRefresh}
                  />
                  <Divider inverted />

                  {ticket.ticketMessages
                    .sort((a, b) => (a.id < b.id ? 1 : -1))
                    .map((msg, j) => (
                      <Comment msg={msg} key={j} />
                    ))}
                </Accordion.Content>

                {activeIndex != i && (
                  <>
                    <Comment msg={ticket.ticketMessages[0]} />
                  </>
                )}
              </Segment>
            ))}
          </Accordion>
        )}
      </span>
    );
  } else {
    return <AccessMsg />;
  }
};

export default Balance;
