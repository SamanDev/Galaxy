import React, { useEffect, useState, useContext } from "react";

import Report from "./components/report.component";
import AdminDeposit from "./AdminDeposit.js";
import AdminCashout from "./AdminCashout.js";
import AdminPDeposit from "./AdminPaparaDeposit.js";
import AdminPCashout from "./AdminPaparaCashout.js";

import { Helmet } from "react-helmet";
// react-bootstrap components

import { Tab, Segment, Dimmer, Divider } from "semantic-ui-react";

function profile(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);

  const context = useContext(UserContext);

  const panes = [
    {
      id: 1,
      menuItem: "All Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminDeposit {...prop} mode="getDeposit" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "All Cashout ",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminDeposit {...prop} mode="getCashout" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "Papara Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminPDeposit {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: "Papara Cashout",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminPCashout {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 5,
      menuItem: "Admin Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminCashout {...prop} mode="getAdminDeposit" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 6,
      menuItem: "Admin Cashout ",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminCashout {...prop} mode="getAdminCashout" />
          </Segment>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Active {...prop} />

      <Tab
        panes={panes}
        className="maxheight"
        defaultActiveIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyProfile", data.activeIndex);
        }}
      />
    </>
  );
}

export default profile;
