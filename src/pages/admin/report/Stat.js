import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Divider,
  Icon,
  Modal,
  Label,
  Grid,
} from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import { doCurrency, activeColorList2 } from "../../../const";
import { addDays } from "date-fns";
import AmountColor from "../../../utils/AmountColor";
import $ from "jquery";
import { adminGetService } from "../../../services/admin";

import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";
import FilterModeGateway from "./FilterGateway";
import Chart from "chart.js/auto";

const moment = require("moment");
const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending",
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.endBalance > row.startBalance,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
];
const noDataComponent = (
  <div
    style={{
      minHeight: 300,
      position: "relative",
      marginTop: 20,
      width: "100%",
    }}
  >
    <Dimmer active inverted>
      <div
        style={{
          textAlign: "center",
          color: "rgba(0,0,0,.5)",
          paddingTop: 30,
          width: "100%",
        }}
      >
        <Icon size="huge" color="grey" name="list ul" />
        <h4>Empty List.</h4>
      </div>
    </Dimmer>
  </div>
);
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
    var _am =
      currentValue.endBalance >= currentValue.startBalance
        ? currentValue.amount
        : currentValue.amount;
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
    case "Cashout IranShetab":
      text = "rgba(255, 0, 0, 0.1)";
      break;
    case "Cashout USDT":
      text = "rgba(255, 0, 0, 0.2)";
      break;
    case "Deposit":
      text = "rgba(120, 255, 0, 1)";
      break;
    case "Deposit IranShetab":
      text = "rgba(13, 140, 0, 0.1)";
      break;
    case "Bonus":
      text = "rgba(255, 170, 0, 1)";
      break;
    case "gift":
      text = "rgba(255, 170, 0, 0.1)";
      break;
    case "GPass":
      text = "rgba(255, 170, 0, 0.2)";
      break;
    case "Levels":
      text = "rgba(255, 170, 0, 0.3)";
      break;
    case "commission":
      text = "rgba(255, 170, 0, 0.4)";
      break;

    default:
      text = "green";
      break;
  }
  return text;
};
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [totalRows, setTotalRows] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
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

  const [startDate, setStartDate] = useState(addDays(new Date(), -24));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const filteredItems = data
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .filter((item) => item.id);
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data

  const sortData = (data) => {
    return data.sort((a, b) => (a.id < b.id ? 1 : -1));
  };
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    if (prop?.user?.username) {
      var res = await adminGetService(
        `getReports?mode=${dataMode}&page=${page}&number=500&username=${prop.user.username}&start=${_s}&end=${_e}&gateway=${dataSearch}`
      );
    } else {
      var res = await adminGetService(
        `getReports?mode=${dataMode}&page=${page}&number=500&start=${_s}&end=${_e}&gateway=${dataSearch}`
      );
    }
    try {
      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const handleSort = (column, sortDirection) => {
    console.log(sortDirection);
    setDataSortedID(column.id);
    setDataSorted(column.name);
    setDataSortedDir(sortDirection);
  };
  const gettotal = (data, status, target) => {
    var _data = data.filter(
      (d) => d.status.toLowerCase() === status.toLowerCase()
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
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir, dataMode, dataSearch]);

  useEffect(() => {
    if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  useEffect(() => {
    var labels = [];

    var _s = moment(startDate);
    var _e = moment(endDate);
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
            parseInt(moment(d.createDate).date()) ===
              parseInt(moment(i).date()) &&
            parseInt(moment(d.createDate).month()) ===
              parseInt(moment(i).month())
        );
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
      if (dataMode.toString().indexOf(",") == -1) {
        for (const rec in _ggateway) {
          oop = oop + 50;
          tdata.push({
            type: "bar",
            label: rec,
            data: getdays(_ggateway[rec]),
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
      selector: (row) => row.startBalance,
      format: (row) => <>{doCurrency(row.startBalance)}</>,
      sortable: true,
      width: "100px",
    },
    {
      name: "Amount",
      selector: (row) =>
        row.endBalance >= row.startBalance ? row.amount : row.amount * -1,
      format: (row) => (
        <>
          <AmountColor
            amount={row.amount}
            sign={row.endBalance - row.startBalance}
          />
        </>
      ),
      sortable: true,
      width: "100px",
    },
    {
      name: "End",
      selector: (row) => row.endBalance,
      format: (row) => <>{doCurrency(row.endBalance)}</>,
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
  }, [filterText, resetPaginationToggle, data, dataSearch]);

  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        style={{ height: "auto" }}
      >
        <DateReng
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setFilterOk={setFilterOk}
        />
      </Modal>

      <div
        className="reportTable"
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        {subHeaderComponentMemo}
        <Segment style={{ height: "calc(100vh - 250px)", overflow: "auto" }}>
          <div
            style={{
              width: "calc(70vw)",
              margin: "auto",
            }}
            id="chart"
          ></div>
          <DataTable
            columns={columns}
            data={filteredItems}
            progressPending={loading}
            onChangeRowsPerPage={handlePerRowsChange}
            defaultSortFieldId={dataSortedID}
            paginationPerPage={perPage}
            defaultSortAsc={true}
            expandOnRowClicked={true}
            expandableRowsHideExpander={true}
            conditionalRowStyles={conditionalRowStyles}
            noDataComponent={noDataComponent}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            persistTableHead
            paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            paginationComponentOptions={{
              rowsPerPageText: footerTxt,
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: false,
              selectAllRowsItemText: "All",
            }}
          />
        </Segment>
      </div>
    </>
  );
}

export default Admin;
