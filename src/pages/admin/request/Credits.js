import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Segment,
  Button,
  Dimmer,
  Icon,
  Modal,
  Grid,
  Divider,
} from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import ActionBtn from "../../../utils/actionBtn";
import AmountColor from "../../../utils/AmountColor";
import { addDays } from "date-fns";
import CartFormat from "../../../utils/CartFormat";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";

import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";
import Confirm from "./Confirm";
import CshList from "./getcashlistadmin";
import AddCashier from "../AddCashier";
import {
  haveAdmin,
  haveModerator,
  haveRoot,
  doCurrency,
  levelDataInfo,
} from "../../../const";
const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending" && row.amount == row.pendingAmount,
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
    },
  },
  {
    when: (row) => row.status == "Pending" && row.amount != row.pendingAmount,
    style: {
      backgroundColor: "rgb(105 28 242 / 10%)",
    },
  },

  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.status == "Done",
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
  {
    when: (row) => row.status == "Canceled",
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
var _timer = 10000;
function Admin(prop) {
  console.log(prop);
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(6);

  const loginToken = prop.loginToken;

  const [loading, setLoading] = useState(false);

  const [filterOk, setFilterOk] = React.useState(false);
  var filteredItems = data;

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [cashierOpen, setCashierOpen] = React.useState(false);
  // data provides access to your row data

  const fetchUsers = async (page, load) => {
    setLoading(true);

    try {
      const res = await adminGetService(`getCredits`);
      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      //console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
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
          <span className="msglink fw-bold">{row.username}</span>
        </>
      ),
      sortable: true,
    },
    {
      name: "Admin",
      selector: (row) => row.admin,
      format: (row) => (
        <>
          <span className="msglink fw-bold">{row.admin}</span>
        </>
      ),
      sortable: true,
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => (
        <>
          <AmountColor amount={row.amount} sign={true} />
        </>
      ),
      sortable: true,
      width: "200px",
    },

    {
      name: "Amount2",
      selector: (row) => row.amount2,
      format: (row) => (
        <>
          <AmountColor amount={row.amount2} sign={true} />
        </>
      ),
      sortable: true,
      width: "200px",
    },

    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.date)}</div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Date",
      selector: (row) => row.updateDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.updateDate)}</div>
      ),
      sortable: true,
      width: "200px",
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <>
        <Grid
          verticalAlign="middle"
          columns={1}
          centered
          as={Segment}
          color="red"
        >
          <Grid.Row>
            <Grid.Column>
              {haveAdmin(loginToken.roles) && (
                <>
                  <Button
                    color="blue"
                    className="float-end"
                    onClick={() => setCashierOpen(true)}
                  >
                    Cashier
                  </Button>
                </>
              )}
              <Button color="red" onClick={() => fetchUsers(1)}>
                Search
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, []);

  return (
    <>
      <Modal
        onClose={() => setCashierOpen(false)}
        onOpen={() => setCashierOpen(true)}
        open={cashierOpen}
        size="large"
        style={{ height: "auto" }}
      >
        <AddCashier setCashierOpen={setCashierOpen} />
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
          //onChangeRowsPerPage={handlePerRowsChange}
          defaultSortFieldId={dataSortedID}
          paginationPerPage={perPage}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          paginationComponentOptions={{
            rangeSeparatorText: "of",
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: "All",
          }}
          //onChangePage={handlePageChange}
          //paginationServer
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500, 1000, 5000]}
          paginationTotalRows={totalRows}
        />
      </div>
    </>
  );
}

export default Admin;
