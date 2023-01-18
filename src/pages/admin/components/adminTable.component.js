import React from "react";
import { Table } from "semantic-ui-react";
import CheckboxToggle from "./toggle.component";
import { isJson, haveAdmin, haveModerator, doCurrency } from "../../../const";
import CartFormat from "../../../utils/CartFormat";
var moment = require("moment");
const headerRow = ["Name", "Value"];
function capitalizeTxt(txt, obj) {
  if (txt.indexOf("-") > -1) {
    return (
      <td key={obj.id}>
        <CartFormat row={obj} />
      </td>
    );
  } else {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }
}

function isDate(
  name,
  myDate,
  user,
  setActiveIndex,
  getwaysList,
  removeTabData,
  addTabData
) {
  if (name === "country") {
    var res = (
      <>
        <img src={"/assets/images/famfamfam_flag_icons/png/" + user + ".png"} />{" "}
        {myDate}
      </>
    );
  } else if (name === "balance") {
    var res = doCurrency(myDate);
  } else if (name === "bankInfos") {
    var res = myDate;
  } else if (name === "email") {
    if (user.userActivate) {
      var res = myDate;
    } else {
      var res = (
        <>
          {myDate}{" "}
          <a
            href="#"
            className="pull-right"
            onClick={() => addTabData(myDate, getwaysList)}
          >
            Send Activation
          </a>
        </>
      );
    }
  } else if (name === "cashierGateways") {
    {
      try {
        var _len = getwaysList.length;
      } catch (error) {
        var _len = 12;
      }
    }
    var res = (
      <>
        {myDate}/{_len}
      </>
    );
  } else if (name === "refer") {
    var res = (
      <a href="#" onClick={() => addTabData(myDate, getwaysList)}>
        {myDate}
      </a>
    );
  } else {
    var res = myDate;
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") == -1
    )
      res = moment(myDate).startOf("second").fromNow();
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") > -1
    )
      res =
        moment(myDate).format("MM-DD-YYYY") +
        " (" +
        moment(myDate).startOf("second").fromNow() +
        ")";
  }

  return res;
}
function getList(obj) {
  return obj[0];
}
const TableExampleWarningShorthand = (prop) => {
  const renderBodyRow = ({ name, value, user, card }, i) => ({
    key: `row-${name}`,
    cells: [
      capitalizeTxt(name, card) || "No name specified",
      typeof value == "boolean"
        ? {
            key: `statusrow-${name}`,
            content: (
              <span style={{ float: "right", height: 20 }}>
                <CheckboxToggle
                  check={value}
                  user={user}
                  userkey={name}
                  childid={getList(prop.data)[i].id}
                  onChange={prop.updateUserObj}
                />
              </span>
            ),
          }
        : {
            key: `statusrow-${i}`,
            width: 14,

            content: isDate(
              name,
              value,
              user,
              prop.setActiveIndex,
              prop.getwaysList,
              prop.removeTabData,
              prop.addTabData
            ),
          },
    ],
  });

  return (
    <Table
      striped
      color="red"
      unstackable
      renderBodyRow={renderBodyRow}
      className="farsi-inline"
      tableData={
        prop.data[0] || [{ name: undefined, value: undefined, user: undefined }]
      }
    />
  );
};

export default TableExampleWarningShorthand;
