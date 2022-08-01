import React, { useState, useEffect } from "react";
import { List, Segment, Tab, Icon } from "semantic-ui-react";
import Users from "./AdminUsers";
import UsersTest from "./AdminUsersTest";
import User from "./AdminUser";
import Report from "./AdminReport";
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
        menuItem: "Reports",
        pane: (
          <Tab.Pane key="Report">
            <Report removeTabData={removeTabData} addTabData={addTabData} />
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
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != username + "profile";
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: username,
      pane: (
        <Tab.Pane
          key={username + "profile"}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <User
            username={username}
            removeTabData={removeTabData}
            getwaysList={getwaysList}
            addTabData={addTabData}
          />
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
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
