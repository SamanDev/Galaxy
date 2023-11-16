import React, { useState, useEffect } from "react";

import { Tab, Menu, Label } from "semantic-ui-react";
import Carts from "./request/CartList";
import Tickets from "./support/List";
import Reports from "./report/List";
import Cashout from "./request/CashoutList";
import Costs from "./request/Costs";
import Stats from "./report/Stat";
var panes = [];
function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(3);
  const loginToken = prop.loginToken;
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tabData, setTabData] = useState([]);
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  useEffect(() => {
    panes = [
      {
        menuItem: "Last Actions",
        render: () => (
          <Tab.Pane>
            <Reports {...prop} />
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
        menuItem: "Costs",
        render: () => (
          <Tab.Pane>
            <Costs {...prop} />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Stats",
        render: () => (
          <Tab.Pane>
            <Stats {...prop} />
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
      renderActiveOnly={true}
      onTabChange={handleTabChange}
    />
  );
}

export default Admin;
