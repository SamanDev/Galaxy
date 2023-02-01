import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Divider,
  Icon,
  Modal,
} from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import { doCurrency } from "../../../const";
import { addDays } from "date-fns";
import AmountColor from "../../../utils/AmountColor";

import { adminGetService } from "../../../services/admin";

import DateReng from "../components/dateReng.component";
import FilterMode from "./Filter";
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
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  if (prop?.user?.username) {
    var defmde = ["cashout", "deposit", "transfer", "bonus", "poker", "casino"];
  } else {
    var defmde = ["cashout", "deposit", "transfer", "bonus"];
  }

  const [dataMode, setDataMode] = useState(defmde);
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
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
        `getReports?mode=${dataMode}&page=${page}&number=500&username=${prop.user.username}&start=${_s}&end=${_e}`
      );
    } else {
      var res = await adminGetService(
        `getReports?mode=${dataMode}&page=${page}&number=500&start=${_s}&end=${_e}`
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
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir, dataMode]);

  useEffect(() => {
    if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "username",
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
      width: "120px",
    },

    {
      name: "status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "80px",
    },
    {
      name: "start",
      selector: (row) => row.startBalance,
      format: (row) => <>{doCurrency(row.startBalance)}</>,
      sortable: true,
      width: "100px",
    },
    {
      name: "amount",
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
      name: "end",
      selector: (row) => row.endBalance,
      format: (row) => <>{doCurrency(row.endBalance)}</>,
      sortable: true,
      width: "100px",
    },
    {
      name: "mode",
      selector: (row) => row.mode,
      format: (row) => <>{row.mode}</>,
      sortable: true,
      width: "120px",
    },
    {
      name: "gateway",
      selector: (row) => (row.gateway ? row.gateway : ""),
      format: (row) => <>{row.gateway}</>,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
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
    var _s = moment(startDate).format("YY-MM-DD");
    var _e = moment(endDate).format("YY-MM-DD");
    return (
      <>
        <Button size="small" onClick={() => setFirstOpen(true)}>
          {_s} / {_e}
        </Button>
        <FilterMode
          onFilter={(e, { value }) => {
            setDataMode(value.toString());
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
