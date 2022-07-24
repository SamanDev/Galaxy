import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Card,
  Table,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import { List, Label, Tab } from "semantic-ui-react";
import { adminGetService } from "../../services/admin";
import TableAdmin from "./components/adminTable.component";
import Report from "./components/report.component";
import { Col } from "react-bootstrap";
import Users from "./AdminUsers";
import CheckboxToggle from "./components/toggle.component";
import { Alert } from "../../utils/alerts";
import { adminPutService } from "../../services/admin";
import { isJson, haveAdmin, haveModerator, doCurrency } from "../../const";
function getPathOfKey(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));

        for (const y in newO1) {
          if (isJson(JSON.parse(JSON.stringify(newO1[y])))) {
            var newO2 = JSON.parse(JSON.stringify(newO1[y]));
            for (const z in newO2) {
              if (isJson(JSON.parse(JSON.stringify(newO2[z])))) {
              } else {
                if (z == "active") {
                  if (x == "cashierGateways") {
                    finalObj.push({
                      id: newO2["id"],
                      name: newO2["name"],

                      value: newO2[z],
                      user: newO,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
                  if (x == "bankInfos") {
                    finalObj.push({
                      name: newO2["bankName"] + " - " + newO2["cardNumber"],
                      value: newO2[z],
                      user: newO,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
                }
              }
            }
          } else {
            if (y == "label") {
              finalObj.push({
                name: x,
                value: newO1[y],
                user: newO1["value"].toLowerCase(),
              });
              newOb[x] = newO1[y];
            }
          }
        }
      } else {
        finalObj.push({ name: x, value: newO[x], user: null });
        newOb[x] = newO[x];
      }
    }
  }
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.sort((a, b) => (a.id > b.id ? 1 : -1));
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        id: ways.id,
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  finalObj?.sort((a, b) => (a.id > b.id ? 1 : -1));

  //finalObj.push({'data':newOb})

  return finalObj;
}
function getPathOfKey2(object, keys, getwaysList) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;

  var finalObj = [];
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));
        finalObj.push({ name: x, value: newO1.length, user: null });
        newOb[x] = newO[x];
      } else {
        finalObj.push({ name: x, value: newO[x], user: null });
        newOb[x] = newO[x];
      }
    }
  }
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.sort((a, b) => (a.id > b.id ? 1 : -1));
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  finalObj.sort((a, b) => (a.name > b.name ? 1 : -1));
  //finalObj.push({'data':newOb})

  return finalObj;
}

function Admin(prop) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const handleGetReports = async () => {
    try {
      setLoading(true);
      const res = await adminGetService(
        "getUsersByAdmin?name=username&value=" + prop.username
      );
      if (res.status === 200) {
        setUser(res.data[0]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);

  const updateUserObj = async (e, data) => {
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    var values = { id: curU.id, key: _key, value: data.checked };

    try {
      const res = await adminPutService(values, "updateUserByAdmin");
      if (res.status == 200) {
        setUser(res.data);
        if (res.data?.address) {
        }
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  if (loading) {
    return (
      <>
        <Dimmer active>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  var newdataInfo = [
    getPathOfKey2(
      user,
      ",username,balance,email,fullName,refer,firstLogin,lastLogin,bankInfos,cashierGateways,userBlock,"
    ),
  ];
  var newdataBankInfo = [getPathOfKey(user, ",bankInfos,")];

  var newdataGetways = [
    getPathOfKey(user, ",cashierGateways,", prop.getwaysList),
  ];
  var newdataInfoData = JSON.parse(JSON.stringify(newdataInfo));
  var newdatabankInfoData = JSON.parse(JSON.stringify(newdataBankInfo));
  var newdataGetwaysData = JSON.parse(JSON.stringify(newdataGetways));
  const panes = [
    {
      menuItem: "Info",
      render: () => (
        <Tab.Pane as="span">
          <TableAdmin
            data={newdataInfoData}
            getwaysList={prop.getwaysList}
            setActiveIndex={setActiveIndex}
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
          <TableAdmin
            data={newdatabankInfoData}
            updateUserObj={updateUserObj}
          />
          <TableAdmin
            data={newdataGetwaysData}
            updateUserObj={updateUserObj}
            getwaysList={prop.getwaysList}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Report",
      render: () => (
        <Tab.Pane as="span" className="ui inverted segment">
          <Report
            user={user}
            mode="deposit"
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Rewards",
      render: () => (
        <Tab.Pane as="span" className="ui inverted segment">
          <Report
            user={user}
            mode="deposit"
            addTabData={prop.addTabData}
            removeTabData={prop.removeTabData}
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: "Logs",
      render: () => (
        <Tab.Pane as="span">
          <Report user={user} mode="Logs" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "DownLine",
      render: () => (
        <Tab.Pane as="span">
          <Users {...prop} search="refer" searchValue={prop.username} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      <h2>
        <Icon
          link
          name="close"
          onClick={() => {
            prop.removeTabData(user.username + "profile");
          }}
        />{" "}
        {user.username}
      </h2>
      <Tab
        panes={panes}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
        menu={{
          color: "black",
          inverted: true,
          attached: false,
          tabular: false,
        }}
      />
    </>
  );
}

export default Admin;
