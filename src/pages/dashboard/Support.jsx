import React, { useState, useEffect } from "react";
import { Accordion, Icon, Divider, List, Segment } from "semantic-ui-react";
import Comment from "./Comment";
import AccessMsg from "../../utils/accessMsg";
import { convertDateToJalali } from "../../utils/convertDate";
import Ticket from "../../layouts/admin/forms/Cashout/Ticket";
import $ from "jquery";
import eventBus from "../../services/eventBus";
import { useUser } from "../../hook/userHook";
const Balance = (prop) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [refresh, setRefresh] = useState(false);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const [loginToken] = useUser();

  var data = loginToken?.userTickets
    .filter((d) => d.status !== "Closed")
    .sort((a, b) => (a.id < b.id ? 1 : -1));
  useEffect(() => {
    data = loginToken?.userTickets
      .filter((d) => d.status !== "Closed")
      .sort((a, b) => (a.id < b.id ? 1 : -1));
  });

  if (loginToken?.accessToken) {
    return (
      <span
        className="myaccount popupmenu mm-listview menutitle-view"
        style={{ padding: "0 15px" }}
      >
        {data.length == 0 && (
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
        {data.length > 0 && (
          <Accordion inverted fluid>
            {data.map((ticket, i) => (
              <Segment
                key={i}
                inverted
                basic
                className={activeIndex === i ? "" : "fadeout opacity-75"}
              >
                <Accordion.Title
                  active={activeIndex === i}
                  index={i}
                  onClick={handleClick}
                  id={"ticket" + ticket.id}
                >
                  <Icon name="dropdown" />
                  <span className="date">
                    {convertDateToJalali(ticket.date)}
                  </span>
                  <span className="farsi fw-bold text-gold">
                    {ticket.department}
                  </span>
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
                    <Ticket
                      departman={ticket.department}
                      id={ticket.id}
                      setRefresh={setRefresh}
                      status="Close"
                    />
                    <span
                      onClick={() => {
                        $("#ticket" + ticket.id).trigger("click");
                      }}
                    >
                      <Comment short={true} msg={ticket.ticketMessages[0]} />
                    </span>
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
