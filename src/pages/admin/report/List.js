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
import { adminGetService } from "../../../services/admin";
import { convertDateToJalali } from "../../../utils/convertDate";
import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";
import FilterModeGateway from "./FilterGateway";
const moment = require("moment");
const conditionalRowStyles = [
  // You can also pass a callback to style for additional customization
  {
    when: (row) =>
      row.endBalance > row.startBalance || row.endBalance2 > row.startBalance2,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
  {
    when: (row) =>
      row.endBalance < row.startBalance || row.endBalance2 < row.startBalance2,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  {
    when: (row) => row.status == "Canceled",
    style: {
      backgroundColor: "rgba(255,0,0,.4)",
    },
  },
  {
    when: (row) => row.status == "Pending",
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
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
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  if (prop?.user?.username) {
    var defmde = [
      "cashout",
      "deposit",
      "transfer",
      "bonus",
      "poker",
      "casino",
      "totalincome",
    ];
  } else {
    var defmde = ["cashout", "deposit", "transfer", "bonus", "totalincome"];
  }

  const [dataMode, setDataMode] = useState(defmde);
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -14));
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const filteredItems = data
    .sort((a, b) => (a.createDate < b.createDate ? 1 : -1))
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
    if (loading) return;
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    try {
      if (prop?.user?.username) {
        var res = await adminGetService(
          `getReports?mode=${dataMode}&page=${page}&number=${perPage}&username=${prop.user.username}&start=${_s}&end=${_e}&gateway=${dataSearch}`
        );
      } else {
        var res = await adminGetService(
          `getReports?mode=${dataMode}&page=${page}&number=${perPage}&start=${_s}&end=${_e}&gateway=${dataSearch}`
        );
      }

      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setFilterOk(true);
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
        if (_am == 0) {
          _am = x.endBalance2 >= x.startBalance2 ? x.amount2 : x.amount2;
        }
        _totalReward = _totalReward + _am;
      });
    }
    if (target == "total") return _totalReward;
    if (target == "count") return _data.length;
  };

  useEffect(() => {
    //fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir, dataMode, dataSearch]);

  useEffect(() => {
    if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      format: (row) => <>{parseInt(row.id)}</>,

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
        style={{ height: "calc(100vh - 250px)", overflow: "auto" }}
      >
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationPerPage={perPage}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          expandableRows
          expandableRowsComponent={ExpandedComponent}
          paginationComponentOptions={{
            rowsPerPageText: footerTxt,
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
          onChangePage={handlePageChange}
          paginationServer
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000]}
          paginationTotalRows={totalRows}
        />
      </div>
    </>
  );
}

export default Admin;
