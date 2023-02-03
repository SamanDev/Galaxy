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
import { doCurrency } from "../../../const";
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
  const gettotal = (data, status, target, mode, i, gateway) => {
    var _data = data.filter(
      (d) =>
        parseInt(moment(d.createDate).date()) === parseInt(i) &&
        d.mode.toLowerCase() == mode.toLowerCase()
      // && d.status.toLowerCase() == status.toLowerCase()
    );
    if (gateway) {
      _data = _data.filter(
        (d) => d.gateway.toLowerCase() == gateway.toLowerCase()
      );
    }
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
    var tdata = [];
    var labels = [];
    var cvalues = [];
    var dvalues = [];
    var bvalues = [];
    var _s = moment(startDate);
    var _e = moment(endDate);
    var _d = _e.diff(_s, "days");
    for (let index = 0; index < _d; index++) {
      var _day = moment(_s).add(index, "days").format("MM-DD");
      var _dayX = moment(_s).add(index, "days").format("D");

      labels.push(_day);
      dvalues.push(gettotal(filteredItems, "Done", "total", "deposit", _dayX));
      cvalues.push(gettotal(filteredItems, "Done", "total", "cashout", _dayX));
      bvalues.push(gettotal(filteredItems, "Done", "total", "bonus", _dayX));
      tdata.push({
        createDate: _day,
        dtoman: gettotal(
          filteredItems,
          "Done",
          "total",
          "deposit",
          _dayX,
          "IranShetab"
        ),
        dbtc: gettotal(
          filteredItems,
          "Done",
          "total",
          "cashout",
          _dayX,
          "bitcoin"
        ),
        ctoman: gettotal(
          filteredItems,
          "Done",
          "total",
          "cashout",
          _dayX,
          "IranShetab"
        ),
      });
    }
    setTotalRows(tdata);
    var data = {
      labels: labels,
      datasets: [
        {
          label: "Deposit",
          data: dvalues,
          borderColor: "#36A2EB",
          backgroundColor: "#9BD0F5",
          tension: 0.1,
        },
        {
          label: "Cashout",
          data: cvalues,
          borderColor: "#FF6384",
          backgroundColor: "#FFB1C1",
          tension: 0.1,
        },
        {
          label: "Bonus",
          data: bvalues,
          backgroundColor: "#00ff00",
          borderColor: "#00ff00",
          tension: 0.1,
        },
      ],
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
            title: {
              display: true,
              text: "Value",
            },
            suggestedMin: -10,
            suggestedMax: 200,
          },
        },
      },
    });
  }, [getwaysList]);
  const columns = [
    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
      ),
      sortable: true,
    },
    {
      name: "Toman",
      selector: (row) => row.dtoman,
      format: (row) => <>{row.dtoman}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Bitcoin",
      selector: (row) => row.dbtc,
      format: (row) => <>{row.dbtc}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Cash Tman",
      selector: (row) => row.ctoman,
      format: (row) => <>{row.ctoman}</>,
      sortable: true,
      width: "120px",
    },
  ];
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
        <Segment>
          <div
            style={{
              width: "calc(80vw )",
              margin: "auto",
            }}
            id="chart"
          ></div>
          <DataTable
            columns={columns}
            data={totalRows}
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
          />
        </Segment>
      </div>
    </>
  );
}

export default Admin;
