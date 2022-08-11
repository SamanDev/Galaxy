import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import { Tab } from "semantic-ui-react";
import Deposit from "./AdminDepositList";
import Cashout from "./AdminCashoutList";
import Carts from "./AdminCartList";
function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(0);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const panes = [
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
  ];
  return (
    <Tab
      panes={panes}
      activeIndex={activeIndex}
      onTabChange={handleTabChange}
    />
  );
}

export default Admin;
