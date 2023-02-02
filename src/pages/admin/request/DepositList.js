import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Segment, Button, Dimmer, Icon, Modal, Grid } from "semantic-ui-react";
import { convertDateToJalali } from "../../../utils/convertDate";
import ActionBtn from "../../../utils/actionBtn";
import AmountColor from "../../../utils/AmountColor";
import ConvertCart from "../../../utils/convertCart";
import { addDays } from "date-fns";
const moment = require("moment");
import { adminGetService } from "../../../services/admin";

import DateReng from "../utils/dateReng";
import FilterMode from "./Filter";

var _data = [
  {
    id: 1,

    amount: 1000000,

    status: "Pending",
    mode: "Deposit",
    gateway: "CartToCart",

    username: "HangOver",
    description: {
      id: 1,
      date: "2022-07-26T17:29:52.377+00:00",
      cardNumber: "5022291011223333",
      accountNumber: "4454554454",
      shebaNumber: "454545645645645645646456",
      holderName: "شسالا",
      cvv: "458",
      expiration: "01/01",
      mobile: "09158885887",
      bankName: "بانک اقتصاد نوین",
      active: true,
      desc: "بابت بدهی 79798873",
      toCard: "6662502250225050",
    },
    readMsg: false,
    createDate: "2022-07-26T18:18:14.249+00:00",
    updateDate: "2022-07-26T18:18:14.250+00:00",
  },
  {
    id: 2,

    amount: 5000000,

    status: "Done",
    mode: "Deposit",
    gateway: "CartToCart",

    username: "HangOver",
    description: {
      id: 1,
      date: "2022-07-26T17:29:52.377+00:00",
      cardNumber: "5022291011223333",
      accountNumber: "4454554454",
      shebaNumber: "454545645645645645646456",
      holderName: "شسالا",
      cvv: "458",
      expiration: "01/01",
      mobile: "09158885887",
      bankName: "بانک اقتصاد نوین",
      active: true,
      desc: "بابت بدهی 79798873",
      toCard: "6662502250225050",
    },
    readMsg: false,
    createDate: "2022-07-26T18:18:14.249+00:00",
    updateDate: "2022-07-26T18:18:14.250+00:00",
  },
  {
    id: 6,

    amount: 50000,

    status: "Canceled",
    mode: "Deposit",
    gateway: "CartToCart",

    username: "HangOver",
    description: {
      id: 1,
      date: "2022-07-26T17:29:52.377+00:00",
      cardNumber: "5022291011223333",
      accountNumber: "4454554454",
      shebaNumber: "454545645645645645646456",
      holderName: "شسالا",
      cvv: "458",
      expiration: "01/01",
      mobile: "09158885887",
      bankName: "بانک اقتصاد نوین",
      active: true,
      desc: "بابت بدهی 79798873",
      toCard: "6662502250225050",
    },
    readMsg: false,
    createDate: "2022-07-26T18:18:14.249+00:00",
    updateDate: "2022-07-26T18:18:14.250+00:00",
  },
];
const conditionalRowStyles = [
  {
    when: (row) => row.status == "Pending",
    style: {
      backgroundColor: "rgba(0,0,255,.1)",
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
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataMode, setDataMode] = useState("Pending");
  const [getwaysList, setGetwaysData] = useState([]);

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);
  var filteredItems = data.filter((item) => item.username);
  if (dataMode != "All") {
    filteredItems = data.filter((item) => {
      return dataMode == item.status;
    });
  }
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  // data provides access to your row data
  const ExpandedComponent = ({ data }) => (
    <div style={{ overflow: "auto", width: "90vw" }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );

  const fetchUsers = async (page) => {
    setLoading(true);
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");

    try {
      const res = await adminGetService(
        `getReports?mode=deposit&gateway=CartToCart&page=${page}&number=500&start=${_s}&end=${_e}`
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
    fetchUsers(1); // fetch page 1 of users
  }, [dataSorted, dataSortedDir]);

  useEffect(() => {
    if (!firstOpen && filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk, firstOpen]);
  const updateStatus = (row, status) => {
    var pay = JSON.parse(row.description);
    var id = pay.userId;
    adminService.changeReportStatus("deposit", id, status).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {});
      }
    });
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
      name: "Status",
      selector: (row) => row.status,
      format: (row) => <>{row.status}</>,
      sortable: true,
      width: "80px",
    },
    {
      name: "From",
      selector: (row) => row.description,
      format: (row) => (
        <div className="farsi" style={{ padding: 10, direction: "ltr" }}>
          {JSON.parse(row.description).holderName}
          <br />
          <ConvertCart cartNo={JSON.parse(row.description).cardNumber} />
          <br />
          {JSON.parse(row.description).bankName}
        </div>
      ),
      sortable: true,
      width: "200px",
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
      name: "ToCart",
      selector: (row) => row.description.toCard,
      format: (row) => (
        <ConvertCart cartNo={JSON.parse(row.description).toCard} />
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Desc",
      selector: (row) => row.description.desc,
      format: (row) => <>{JSON.parse(row.description).desc}</>,
      sortable: true,
      width: "200px",
    },

    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => (
        <div className="blacktext">{convertDateToJalali(row.createDate)}</div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      format: (row) => <ActionBtn row={row} updateStatus={updateStatus} />,
      sortable: false,
      width: "200px",
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
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
                size="small"
                floating="left"
                onClick={() => setFirstOpen(true)}
              >
                {_s} / {_e}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <FilterMode
                onFilter={(e, { value }) => {
                  setDataMode(value.toString());
                }}
                value={dataMode}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [filterText, resetPaginationToggle, data]);

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
          defaultSortFieldId={dataSortedID}
          paginationPerPage={perPage}
          defaultSortAsc={false}
          conditionalRowStyles={conditionalRowStyles}
          noDataComponent={noDataComponent}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
          persistTableHead
          paginationRowsPerPageOptions={[10, 25, 50, 100, 500]}
        />
      </div>
    </>
  );
}

export default Admin;
