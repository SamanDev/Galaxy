import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Icon,
  Modal,
  Label,
  Grid,
} from "semantic-ui-react";
import { doCurrency } from "../../../const";
import { addDays } from "date-fns";
import AmountColor from "../../../utils/AmountColor";
import $ from "jquery";
import { adminGetService } from "../../../services/admin";
import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";
import List from "./List";
import FilterModeGateway from "./FilterGateway";
import Chart from "chart.js/auto";
import { convertDateToJalali } from "../../../utils/convertDate";
const moment = require("moment");

const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
const sumOf = (array) => {
  return array.reduce((sum, currentValue) => {
    try {
      var desc = JSON.parse(currentValue.description);
    } catch (error) {
      var desc = { dollarPrice: 50000 };
    }
    var _am =
      currentValue.endBalance != currentValue.startBalance
        ? currentValue.amount
        : currentValue.amount2 * desc.dollarPrice;
    if (_am < 0) {
      _am = _am * -1;
    }
    return sum + _am;
  }, 0);
};
const getChartColor = (name) => {
  var text = "blue";
  var _name = name.replace("Bonus ", "");
  switch (_name) {
    case "Cashout":
      text = "rgba(255, 0, 0, 1)";
      break;

    case "Deposit":
      text = "rgba(120, 255, 0, 1)";
      break;
    case "Transfer":
      text = "rgba(0, 0, 255, 1)";
      break;
    case "Bonus":
      text = "rgba(255, 170, 0, 1)";
      break;
    case "TotalIncome":
      text = "rgba(25, 170, 190, 1)";
      break;

    default:
      text = "green";
      break;
  }
  if (name.indexOf("Bonus ") > -1) {
    text = "rgba(255, 170, 0,0.3)";
  }
  if (name.indexOf("Transfer ") > -1) {
    text = "rgba(0,0,255,0.3)";
  }
  if (name.indexOf("Deposit ") > -1) {
    text = "rgba(0,255,0,0.3)";
  }
  if (name.indexOf("TotalIncome ") > -1) {
    text = "rgba(25, 170, 190,0.3)";
  }
  if (name.indexOf("Cashout ") > -1) {
    text = "rgba(255,0,0,0.3)";
  }
  return text;
};
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(9);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  if (prop?.user?.username) {
    var defmde = ["cashout", "deposit"];
  } else {
    var defmde = ["cashout", "deposit"];
  }

  const [dataMode, setDataMode] = useState(defmde);
  const [getwaysList, setGetwaysData] = useState();

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const filteredItems = data
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .filter(
      (item) =>
        item.status != "Canceled" &&
        item.gateway != "AdminSystem" &&
        item.gateway
    );
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data

  const gettotal = (data, status, target) => {
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase() && d.amount2 == 0
    );
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.endBalance >= x.startBalance ? x.amount : x.amount * -1;
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };
  const gettotal2 = (data, status, target) => {
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase() && d.amount == 0
    );
    var _totalReward = 0;
    {
      _data.map((x, i) => {
        var _am = x.endBalance2 >= x.startBalance2 ? x.amount2 : x.amount2 * -1;
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };

  useEffect(() => {
    var labels = [];

    var _s = moment(startDate);
    var _e = moment(endDate);
    if (_s == _e) {
      _e = moment(_s).add("day", 1).format("YYYY-MM-DD");
    }
    var _d = _e.diff(_s, "days");
    for (let index = 0; index < _d; index++) {
      var _day = moment(_s).add(index, "days").format("MM-DD");

      labels.push(_day);
    }
    const getdays = (data) => {
      var _data = data;
      var newdata = [];

      for (let index = 0; index < _d; index++) {
        var i = moment(_s).add(index, "days").format("YYYY-MM-DD");
        var ffdata = _data.filter(
          (d) =>
            parseInt(moment(d.createDate.replace("-08:00", "")).date()) ===
              parseInt(moment(i).date()) &&
            parseInt(moment(d.createDate.replace("-08:00", "")).month()) ===
              parseInt(moment(i).month()) &&
            d.status == "Done"
        );
        //console.log(ffdata);
        newdata.push(sumOf(ffdata));
      }
      return newdata;
    };
    var _gmode = groupBy(filteredItems, "mode");
    var tdata = [];

    for (const property in _gmode) {
      tdata.push({
        label: property,
        data: getdays(_gmode[property]),
        borderColor: getChartColor(property),
        backgroundColor: getChartColor(property),
        tension: 0.2,
      });
      //console.log(property + ": " + sumOf(_gmode[property]));
      var _ggateway = groupBy(_gmode[property], "gateway");

      var oop = 0;
      if (dataMode.toString().indexOf(",") == -1 || 1 == 1) {
        for (const rec in _ggateway) {
          oop = oop + 50;
          tdata.push({
            type: "bar",
            label: rec,
            data: getdays(_ggateway[rec]),
            borderColor: getChartColor(property + " " + rec),
            backgroundColor: getChartColor(property + " " + rec),
          });
          //console.log(rec + ": " + sumOf(_ggateway[rec]));
        }
      }
    }
    console.log(tdata);
    var data = {
      labels: labels,
      datasets: tdata,
    };
    setGetwaysData(data);
  }, [data]);
  useEffect(() => {
    $("#chart").html("");
    $("#chart").append('<canvas id="acquisitions"></canvas>');
    new Chart(document.getElementById("acquisitions"), {
      type: "line",
      data: getwaysList,

      options: {
        responsive: true,

        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,

            title: {
              display: true,
            },
          },
          y: {
            display: true,
          },
        },
      },
    });
  }, [getwaysList]);
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username)}
          >
            {row.username}
          </span>
        </>
      ),
      sortable: true,
      width: "180px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Start",
      selector: (row) => (row.amount2 ? row.startBalance2 : row.startBalance),
      format: (row) => (
        <>
          {row.amount2 ? (
            <>{doCurrency(row.startBalance2)} $</>
          ) : (
            doCurrency(row.startBalance)
          )}
        </>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Amount",
      selector: (row) =>
        row.amount2
          ? row.endBalance2 >= row.startBalance2
            ? row.amount2
            : row.amount2 * -1
          : row.endBalance >= row.startBalance
          ? row.amount
          : row.amount * -1,
      format: (row) => (
        <>
          {row.amount2 ? (
            <>
              <AmountColor
                amount={row.amount2}
                sign={row.endBalance2 - row.startBalance2}
              />{" "}
              $
            </>
          ) : (
            <AmountColor
              amount={row.amount}
              sign={row.endBalance - row.startBalance}
            />
          )}
        </>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "End",
      selector: (row) => (row.amount2 ? row.endBalance2 : row.endBalance),

      format: (row) => (
        <>
          {row.amount2 ? (
            <>{doCurrency(row.endBalance2)} $</>
          ) : (
            doCurrency(row.endBalance)
          )}
        </>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => <>{row.mode}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Gateway",
      selector: (row) => (row.gateway ? row.gateway : ""),
      format: (row) => (
        <span onClick={() => setDataSearch(row.gateway)}>{row.gateway}</span>
      ),
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
      ),
      sortable: true,
    },
  ];
  var footerTxt = "";
  if (doCurrency(gettotal2(filteredItems, "Done", "count")) > 0) {
    footerTxt =
      footerTxt +
      "Done (" +
      doCurrency(gettotal2(filteredItems, "Done", "count")) +
      "): " +
      doCurrency(gettotal2(filteredItems, "Done", "total")) +
      "$  َ  َ  َ |  َ  َ  َ  ";
  }
  if (doCurrency(gettotal2(filteredItems, "Pending", "count")) > 0) {
    footerTxt =
      footerTxt +
      " Pending (" +
      doCurrency(gettotal2(filteredItems, "Pending", "count")) +
      "): " +
      doCurrency(gettotal2(filteredItems, "Pending", "total")) +
      "$  َ  َ  َ |  َ  َ  َ  ";
  }
  if (doCurrency(gettotal(filteredItems, "Done", "count")) > 0) {
    footerTxt =
      footerTxt +
      "Done (" +
      doCurrency(gettotal(filteredItems, "Done", "count")) +
      "): " +
      doCurrency(gettotal(filteredItems, "Done", "total")) +
      "  َ  َ  َ |  َ  َ  َ  ";
  }
  if (doCurrency(gettotal(filteredItems, "Pending", "count")) > 0) {
    footerTxt =
      footerTxt +
      " Pending (" +
      doCurrency(gettotal(filteredItems, "Pending", "count")) +
      "): " +
      doCurrency(gettotal(filteredItems, "Pending", "total")) +
      "  َ  َ  َ |  َ  َ  َ  ";
  }
  footerTxt = footerTxt + "Rows per page:";
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YY-MM-DD");
    var _e = moment(endDate).format("YY-MM-DD");
    return (
      <>
        <Grid
          verticalAlign="middle"
          columns={2}
          centered
          as={Segment}
          color="red"
        >
          <Grid.Row>
            <Grid.Column>
              <FilterMode
                onFilter={(e, { value }) => {
                  setDataMode(value.toString());
                }}
                value={dataMode}
              />
            </Grid.Column>
            <Grid.Column>
              <Button
                size="small"
                floating="left"
                onClick={() => setFirstOpen(true)}
              >
                {_s} / {_e}
              </Button>
              <Button
                className="float-end"
                color="red"
                onClick={() => fetchUsers(1)}
              >
                Search
              </Button>
              {dataSearch != "" ? (
                <Label
                  as="a"
                  color="red"
                  className="float-end"
                  tag
                  onClick={() => setDataSearch("")}
                >
                  {dataSearch}
                </Label>
              ) : (
                <FilterModeGateway
                  onFilter={(e) => {
                    setDataSearch(e.target.value);
                  }}
                  value={dataSearch}
                  placeholder={"Gateway filter"}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [
    filterText,
    resetPaginationToggle,
    data,
    dataSearch,
    dataMode,
    startDate,
    endDate,
  ]);
  const mychaty = (
    <div
      style={{
        width: "100%",
        margin: "auto",
      }}
      id="chart"
    ></div>
  );
  return (
    <>
      <List
        setData={setData}
        mychaty={mychaty}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
      />
    </>
  );
}

export default Admin;
