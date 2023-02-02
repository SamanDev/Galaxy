import React, { useState, useEffect } from "react";

import { Tab, Menu, Label } from "semantic-ui-react";
import Deposit from "./request/DepositList";
import Cashout from "./request/CashoutList";
import Carts from "./request/CartList";
import Tickets from "./support/List";
import Reports from "./report/List";
var panes = [];
function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(0);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tabData, setTabData] = useState([]);
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  useEffect(() => {
    panes = [
      {
        menuItem: "Deposits",
        render: () => (
          <Tab.Pane>
            <Deposit {...prop} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Cashouts",
        render: () => (
          <Tab.Pane>
            <Cashout {...prop} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Carts",
        render: () => (
          <Tab.Pane>
            <Carts {...prop} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: (
          <Menu.Item key="Tickets">
            Tickets
            <Label color="red">{prop.tickets}</Label>
          </Menu.Item>
        ),
        render: () => (
          <Tab.Pane>
            <Tickets {...prop} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Last Actions",
        render: () => (
          <Tab.Pane>
            <Reports {...prop} />
          </Tab.Pane>
        ),
      },
    ];
    setTabData(panes);
  }, [prop.tickets]);

  return (
    <Tab
      panes={tabData}
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
    />
  );
}

export default Admin;
