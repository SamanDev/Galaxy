import React, { useState, useEffect } from "react";
import { List, Segment, Tab, Icon } from "semantic-ui-react";
import Users from "./AdminUsers";
import Bots from "./AdminBots";
import { Navigate } from "react-router-dom";
import User from "./AdminUser";
import Report from "./AdminReport";
import GetwaysList from "./components/GetwaysList.component";
import SiteCartsList from "./components/SiteCartsList.component";
import Requests from "./Requests";
import RisingPitch from "./PlayAlert";
import { adminGetService } from "../../services/admin";
import { isJson, haveAdmin, haveModerator, doCurrency } from "../../const";
var panes = [];
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  const [tabData, setTabData] = useState([]);
  const [getwaysData, setGetwaysData] = useState([]);
  const handleGetGeteways = async () => {
    if (getGateways) {
      setGetwaysData(getGateways);
    } else {
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setGetwaysData(sorted);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    panes = [
      {
        menuItem: "Users",
        pane: (
          <Tab.Pane key="Users">
            <Users
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              handleGetGeteways={handleGetGeteways}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
              getwaysList={getwaysData}
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
        menuItem: "Requests",
        pane: (
          <Tab.Pane key="Requests">
            <Requests
              addTabData={addTabData}
              addMainTabData={addMainTabData}
              setGetwaysData={setGetwaysData}
              addGatewayTabData={addGatewayTabData}
              removeTabData={removeTabData}
            />
          </Tab.Pane>
        ),
      },
    ];
  }, []);
  useEffect(() => {
    console.log(panes);
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
  const addMainTabData = (mode) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != mode;
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: mode,
      pane: (
        <Tab.Pane
          key={mode}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Bots
            addTabData={addTabData}
            setGetwaysData={setGetwaysData}
            removeTabData={removeTabData}
            search="refer"
            searchValue={mode}
          />
        </Tab.Pane>
      ),
    });

    panes = newPanes2;
    setTabData(newPanes2);
    setActiveIndex(newPanes2.length - 1);
  };
  const addGatewayTabData = (mode) => {
    var newPanes1 = panes;
    const result1 = newPanes1.filter(checkAdult1);

    function checkAdult1(item) {
      return item.pane.key != mode;
    }

    var newPanes2 = result1;

    newPanes2.push({
      menuItem: mode,
      pane: (
        <Tab.Pane
          key={mode}
          className="ui inverted segment"
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          {mode == "Gateways" ? (
            <GetwaysList removeTabData={removeTabData} />
          ) : (
            <SiteCartsList removeTabData={removeTabData} />
          )}
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
  if (!haveAdmin(loginToken?.roles) && !haveModerator(loginToken?.roles)) {
    return <Navigate to="/" />;
  }

  return (
    <Segment>
      <RisingPitch />
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
