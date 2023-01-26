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
  Divider,
  Icon,
  Modal,
  Form,
  Select,
} from "semantic-ui-react";
import Moment from "react-moment";
import { convertDateToJalali } from "../../utils/convertDate";
import CurrencyInput from "react-currency-input-field";
import AmountColor from "../../utils/AmountColor";
import { addDays } from "date-fns";
const moment = require("moment");
import {
  adminGetService,
  adminPutService,
  getReportServiceAdmin,
} from "../../services/admin";
import { Alert } from "../../utils/alerts";
import Comment from "../admin/Comment";

import Ticket from "../../layouts/admin/forms/Cashout/AdminTicket";
import { Col } from "react-bootstrap";

import CheckboxToggle from "./components/toggle.component";
import DateReng from "./components/dateReng.component";
import AddGift from "./AddGift";
import Filter from "./Filter";
import FilterMode from "./FilterMode";

import { isJson, haveAdmin, haveModerator, doCurrency } from "../../const";

const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending",
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },

  {
    when: (row) => row.status == "Done",
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
  const [data, setData] = useState(prop.user.userTickets);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("all");
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(new Date());
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
    <div style={{ overflow: "auto" }}>
      <Segment inverted basic padded="very">
        <Ticket
          departman={data.department}
          id={data.id}
          userid={prop.user.id}
          {...prop}
        />
        <Divider inverted />
        {data.ticketMessages
          .sort((a, b) => (a.id < b.id ? 1 : -1))
          .map((msg, j) => (
            <Comment msg={msg} key={j} username={prop.user.username} />
          ))}
      </Segment>
    </div>
  );
  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getReports?username=${prop.user.username}&mode=${dataMode.replace(
          "all",
          ""
        )}&page=${page}&number=500&sort=${dataSorted}&order=${dataSortedDir}&start=${_s}&end=${_e}`
      );
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
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    //fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir, dataMode]);

  useEffect(() => {
    //if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },

    {
      name: "status",
      selector: (row) => row.status,
      format: (row) => (
        <>
          {row.status} - {row.ticketMessages[0].adminUser}
        </>
      ),
      sortable: true,
      width: "180px",
    },

    {
      name: "department",
      selector: (row) => row.department,
      format: (row) => <span className="farsi">{row.department}</span>,
      sortable: true,
      width: "120px",
    },
    {
      name: "Last Msg",
      selector: (row) => sortData(row.ticketMessages)[0].message,
      format: (row) => (
        <span className="farsi">{sortData(row.ticketMessages)[0].message}</span>
      ),
      sortable: true,
      width: "520px",
    },

    {
      name: "date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    return (
      <>
        <Button size="small" onClick={() => setFirstOpen(true)}>
          {_s} to {_e}
        </Button>
        <FilterMode
          onFilter={(e) => {
            setDataMode(e.target.outerText);
            console.log(e.target.outerText);
          }}
          value={dataMode}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, data]);

  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        dimmer="inverted"
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
        style={{ height: "calc(100vh - 300px)", overflow: "auto" }}
      >
        <DataTable
          title={prop.user.username + " Tickets"}
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          onChangeRowsPerPage={handlePerRowsChange}
          defaultSortFieldId={dataSortedID}
          paginationPerPage={perPage}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          expandableRowsHideExpander={true}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
}

export default Admin;
