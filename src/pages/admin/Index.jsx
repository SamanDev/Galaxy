import React, { useState, useEffect } from "react";
import { List, Segment, Tab, Icon } from "semantic-ui-react";
import Users from "./AdminUsers";
import UsersTest from "./AdminUsersTest";
import User from "./AdminUser";
import Report from "./components/report.component";
import GetwaysList from "./components/GetwaysList.component";
var panes = [];
function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  const [tabData, setTabData] = useState([]);
  const [getwaysData, setGetwaysData] = useState([]);
  useEffect(() => {
    panes = [
      {
        menuItem: "UsersTest",
        pane: (
          <Tab.Pane key="UsersTest">
            <UsersTest
              addTabData={addTabData}
              setGetwaysData={setGetwaysData}
              removeTabData={removeTabData}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Users",
        pane: (
          <Tab.Pane key="Users">
            <Users
              addTabData={addTabData}
              setGetwaysData={setGetwaysData}
              removeTabData={removeTabData}
              search="username"
              searchValue=""
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Report",
        pane: (
          <Tab.Pane key="Report">
            <Report mode="deposit" />
          </Tab.Pane>
        ),
      },
      {
        menuItem: "Getways",
        pane: (
          <Tab.Pane key="Getways">
            <GetwaysList />
          </Tab.Pane>
        ),
      },
    ];
  }, []);
  useEffect(() => {
    if (activeIndex == 0) setTabData(panes);
    if (activeIndex == -1) {
      setActiveIndex(0);
    }
  }, [activeIndex]);
  const addTabData = (username, getwaysList) => {
    console.log(username);
    var newPanes = panes;

    const result = newPanes.filter(checkAdult);

    function checkAdult(item) {
      return item.pane.key == username + "profile";
    }

    if (result.length == 0) {
      newPanes.push({
        menuItem: username,
        pane: (
          <Tab.Pane key={username + "profile"}>
            <User
              username={username}
              removeTabData={removeTabData}
              getwaysList={getwaysList}
            />
          </Tab.Pane>
        ),
      });
    }
    setActiveIndex(newPanes.length - 1);
  };
  const removeTabData = (id) => {
    var newPanes = panes;
    const result = newPanes.filter(checkAdult);

    function checkAdult(item) {
      return item.pane.key != id;
    }
    panes = result;
    setActiveIndex(-1);
  };

  return (
    <Segment>
      <Tab
        panes={tabData}
        activeIndex={activeIndex}
        renderActiveOnly={false}
        onTabChange={handleTabChange}
      />
    </Segment>
  );
}

export default Admin;
