import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Grid,
  Popup,
  Header,
} from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";
import { convertDateToJalali } from "../../../utils/convertDate";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";
import DateReng from "../utils/dateReng";

import { doCurrency } from "../../../const";
const style = {
  opacity: 0.9,
  padding: "1.5em",
};
const conditionalRowStyles = [
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.endBalance > row.startBalance,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
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
      zIndex: 0,
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

function listgames(list) {
  return list.map((link, i) => (
    <small key={i} className="dplock">
      {link.gameName}:
      <span className="float-end">
        {link.currency == "Dollar" && <>$</>}
        {doCurrency(link.amount)}
      </span>
    </small>
  ));
}

function listadmin(list) {
  var newlist = [];

  return list
    .sort((a, b) => (a.pokerPercent < b.pokerPercent ? 1 : -1))
    .map((link, i) => (
      <Grid.Column key={i}>
        <Segment inverted color="black" size="tiny" attached="top">
          {link.user}
        </Segment>
        <Segment raised attached>
          {listadminchild(link)}
        </Segment>
      </Grid.Column>
    ));
}
function listadminchild(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (
      key != "id" &&
      key != "date" &&
      key != "user" &&
      key.indexOf("Percent") == -1
    ) {
      newlist.push({ name: key, value: value });
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {link.name.indexOf("2") > -1 && <>$</>}
          {doCurrency(link.value)}
        </span>
      </small>
    ));
}
function listpoker(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (key.indexOf("poker") > -1 || key.indexOf("tourney") > -1) {
      if (key.indexOf("Total") == -1 && key.indexOf("Cost") == -1) {
        newlist.push({ name: key, value: value });
      }
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {link.name.indexOf("2") > -1 && <>$</>}
          {doCurrency(link.value)}
        </span>
      </small>
    ));
}
function listfinal(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (
      key.indexOf("Total") > -1 ||
      key.indexOf("Cost") > -1 ||
      key.indexOf("Rewards") > -1 ||
      key.indexOf("casino") > -1
    ) {
      if (
        key.indexOf("finalTotal") == -1 &&
        key.indexOf("casinoGamesSet") == -1
      ) {
        newlist.push({ name: key, value: value });
      }
    }
  }
  return newlist
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {(link.name.indexOf("2") > -1 || link.name.indexOf("Dollar")) >
            -1 && <>$</>}
          {doCurrency(link.value)}
        </span>
      </small>
    ));
}
function listreward(list) {
  var newlist = [];
  for (const [key, value] of Object.entries(list)) {
    if (key != "id" && key != "date") {
      newlist.push({ name: key, value: value });
    }
  }
  return newlist
    .sort((a, b) => (a.value < b.value ? 1 : -1))
    .map((link, i) => (
      <small key={i} className="dplock">
        {link.name}:
        <span className="float-end">
          {link.name.indexOf("2") > -1 && <>$</>}
          {doCurrency(link.value)}
        </span>
      </small>
    ));
}
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = prop.loginToken;
  const [totalRows, setTotalRows] = useState(1000);
  const [perPage, setPerPage] = useState(100);
  const [dataSortedID, setDataSortedID] = useState(1);
  const params = useParams();
  const [dataSearch, setDataSearch] = useState("");
  const [live, setLive] = useState(false);
  const [startDate, setStartDate] = useState(addDays(new Date(), -1));
  const [endDate, setEndDate] = useState(addDays(new Date(), -1));
  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  var columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
    },

    {
      name: "pokerTotal",
      selector: (row) => row.pokerTotal,
      width: "240px",
      format: (row) => (
        <>
          <Segment inverted color="green" size="tiny" attached="top">
            {doCurrency(row.pokerTotal)}
            <span className="float-end">${doCurrency(row.pokerTotal2)}</span>
          </Segment>
          <Segment raised inverted attached>
            {listpoker(row)}
          </Segment>
        </>
      ),
    },
    {
      name: "casino",
      selector: (row) => row.casinoToman,
      width: "240px",
      format: (row) => (
        <>
          <Segment inverted color="blue" size="tiny" attached="top">
            {doCurrency(row.casinoToman)}
            <span className="float-end">${doCurrency(row.casinoDollar)}</span>
          </Segment>
          <Segment raised inverted attached>
            {listgames(row.casinoGamesSet)}
          </Segment>
        </>
      ),
    },
    {
      name: "totalRewards",
      selector: (row) => row.totalRewards,
      width: "240px",
      format: (row) => (
        <>
          <Segment inverted color="red" size="tiny" attached="top">
            {doCurrency(row.totalRewards)}
            <span className="float-end">${doCurrency(row.totalRewards2)}</span>
          </Segment>
          <Segment raised inverted attached>
            {listreward(row.rewards)}
          </Segment>
        </>
      ),
    },

    {
      name: "finalTotal",
      selector: (row) => row.finalTotal,
      width: "240px",
      format: (row) => (
        <>
          <Segment inverted color="grey" size="tiny" attached="top">
            {doCurrency(row.finalTotal)}
            <span className="float-end">${doCurrency(row.finalTotal2)}</span>
          </Segment>
          <Segment raised inverted attached>
            {listfinal(row)}
          </Segment>
        </>
      ),
    },

    {
      name: "Result",
      selector: (row) => row.finalTotal,
      width: "100%",
      format: (row) => (
        <>
          <Grid centered divided inverted columns={row.adminIncomeSet.length}>
            {listadmin(row.adminIncomeSet)}
          </Grid>
        </>
      ),
    },
  ];

  const fetchUsers = async (page) => {
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    setLoading(true);
    try {
      var res;
      if (live) {
        res = await adminGetService(`getIncome?page=${page}&number=${perPage}`);
      } else {
        res = await adminGetService(
          `getIncome?page=${page}&number=${perPage}&startDate=${_s}&endDate=${_e}`
        );
      }

      if (res.status === 200) {
        setData(res.data);
        setFilterOk(false);
        //setTotalRows(res.data.count);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setFilterOk(true);
  };
  const handlePageChange = (page) => {
    fetchUsers(page);
  };
  var filteredItems = data;

  useEffect(() => {
    // fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);

  useEffect(() => {
    //if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  useEffect(() => {
    if (firstOpen) setLive(false); // fetch page 1 of users
  }, [firstOpen]);
  useEffect(() => {
    if (filterOk) {
      setFilterOk(false);
    } else {
      setFilterOk(true);
    }
  }, [live]);
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YY-MM-DD");
    var _e = moment(endDate).format("YY-MM-DD");
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
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
              <Button
                onClick={() => {
                  setLive(true);
                  fetchUsers(1);
                }}
              >
                Live
              </Button>

              <Button onClick={() => prop.addMainTabData("Runner")}>
                Bankroll
              </Button>
              <Button
                className="float-end"
                color="red"
                onClick={() => {
                  if (filterOk) {
                    setFilterOk(false);
                  } else {
                    setFilterOk(true);
                  }
                  fetchUsers(1);
                }}
              >
                Search
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Button
                size="small"
                floating="left"
                onClick={() => setFirstOpen(true)}
              >
                {_s} / {_e}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [filterText, resetPaginationToggle, data, selectedList]);
  const CustomLoader = () => (
    <>
      <Segment
        basic
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    </>
  );
  if (loading && 1 == 2) {
    return (
      <>
        <Segment
          basic
          style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        >
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <div
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        className="ttotal"
      >
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
        {subHeaderComponentMemo}
        <DataTable
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          paginationPerPage={perPage}
          expandOnRowClicked={true}
          defaultSortFieldId={dataSortedID}
          defaultSortAsc={false}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          paginationServer
          progressComponent={<CustomLoader />}
          paginationTotalRows={totalRows}
        />
      </div>
    </>
  );
}

export default Admin;
