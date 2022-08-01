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
  Icon,
  Modal,
  Form,
  Select,
} from "semantic-ui-react";
import Moment from "react-moment";
import { convertDateToJalali } from "../../utils/convertDate";
import CurrencyInput from "react-currency-input-field";
import { addDays } from "date-fns";
const moment = require("moment");
import {
  adminGetService,
  adminPutService,
  getReportServiceAdmin,
} from "../../services/admin";
import { Alert } from "../../utils/alerts";

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

var testData = [
  {
    id: 3,
    fromName: "Casino",
    toName: "HangOver",
    amount: 3193000,
    pendingAmount: null,
    coinValue: "153.13644000",
    startBalance: 0,
    endBalance: 3193000,
    status: "Done",
    mode: "Deposit",
    gateway: "CoinPayments",
    coin: "BTC",
    voucherNumber: null,
    voucherCode: null,
    cardNumber: null,
    username: "HangOver",
    description:
      '{"amount":"153.13644000","address":"3FtKTSVp86xr81e7ayyN7uAjjMZ1NiCcNF","qrcode_url":"https://www.coinpayments.net/qrgen.php?id=CPGG6QADJYZJCVYNUU0LRBTPLN&key=628421d35d5a574d50641c6c40a9692a","confirms_needed":"2","timeout":28800}',
    readMsg: false,
    createDate: "2022-07-26T18:49:58.311+00:00",
    updateDate: "2022-07-26T18:49:58.311+00:00",
  },
  {
    id: 2,
    fromName: "Casino",
    toName: "HangOver",
    amount: 3193000,
    pendingAmount: null,
    coinValue: "152.42291000",
    startBalance: 0,
    endBalance: 0,
    status: "Pending",
    mode: "Deposit",
    gateway: "CoinPayments",
    coin: "BTC",
    voucherNumber: null,
    voucherCode: null,
    cardNumber: null,
    username: "HangOver",
    description:
      '{"amount":"152.42291000","address":"3PReiacVhx3aYcrUyhNUeqB6HzPZLdvkaJ","qrcode_url":"https://www.coinpayments.net/qrgen.php?id=CPGG6J20QZMIX6BLOWLDQK2FFE&key=4ccc2da119c79414364fbf505c7d8482","confirms_needed":"2","timeout":28800}',
    readMsg: false,
    createDate: "2022-07-26T18:23:37.175+00:00",
    updateDate: "2022-07-26T18:23:37.175+00:00",
  },
  {
    id: 1,
    fromName: "Casino",
    toName: "HangOver",
    amount: 3193000,
    pendingAmount: null,
    coinValue: "152.42291000",
    startBalance: 0,
    endBalance: 0,
    status: "Pending",
    mode: "Deposit",
    gateway: "CoinPayments",
    coin: "BTC",
    voucherNumber: null,
    voucherCode: null,
    cardNumber: null,
    username: "HangOver",
    description:
      '{"amount":"152.42291000","address":"3F1uyDMRBXkUh6i37zJ25rQAzr3FFKZ27T","qrcode_url":"https://www.coinpayments.net/qrgen.php?id=CPGG50XI72NMDSUIDWWWIUIMND&key=56d9e078dd9394d7a67208b2c2916e0c","confirms_needed":"2","timeout":28800}',
    readMsg: false,
    createDate: "2022-07-26T18:18:14.249+00:00",
    updateDate: "2022-07-26T18:18:14.250+00:00",
  },
  {
    id: 3548547,
    fromName: "GangeshBalas",
    toName: "HangOver",
    amount: 1000000,
    pendingAmount: null,
    coinValue: "153.13644000",
    startBalance: 0,
    endBalance: 4193000,
    status: "Done",
    mode: "Transfer",
    gateway: "",
    coin: "",
    voucherNumber: null,
    voucherCode: null,
    cardNumber: null,
    username: "HangOver",
    description: "",
    readMsg: false,
    createDate: "2022-07-26T18:49:58.311+00:00",
    updateDate: "2022-07-26T18:49:58.311+00:00",
  },
];

function Admin(prop) {
  const [data, setData] = useState([]);

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
  const filteredItems = data.filter((item) => item.username);

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
      const res = await getReportServiceAdmin(
        `getReportsByUser?id=${prop.user.id}&mode=${dataMode}&page=${page}&per_page=${perPage}&sort=${dataSorted}&order=${dataSortedDir}&start=${_s}&end=${_e}`
      );
      if (res.status === 200) {
        setData(res.data);

        setFilterOk(false);
      }
    } catch (error) {
      console.log(error.message);
      setData(testData);

      setFilterOk(false);
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
    setLoading(true);

    try {
      const res = await adminGetService(
        `getUsersByAdmin?name=${prop.search ? prop.search : "username"}&value=${
          prop.searchValue
        }&page=1&per_page=${newPerPage}`
      );
      if (res.status === 200) {
        setData(res.data);
        setPerPage(newPerPage);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
      name: "from",
      selector: (row) => row.fromName,
      format: (row) => (
        <>
          {row.fromName != "Casino" && row.fromName != "Poker" ? (
            <a
              href="#"
              onClick={() => prop.addTabData(row.fromName, getwaysList)}
            >
              {row.fromName}
            </a>
          ) : (
            row.fromName
          )}
        </>
      ),
      sortable: true,
      width: "120px",
    },
    {
      name: "to",
      selector: (row) => row.toName,
      format: (row) => (
        <>
          <a href="#" onClick={() => prop.addTabData(row.toName, getwaysList)}>
            {row.toName}
          </a>
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
      selector: (row) => row.amount,
      format: (row) => <>{doCurrency(row.amount)}</>,
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
      selector: (row) => row.gateway,
      format: (row) => <>{row.gateway}</>,
      sortable: true,
      width: "120px",
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
    var _s = moment(startDate).format("YYYY-MM-DD");
    var _e = moment(endDate).format("YYYY-MM-DD");
    return (
      <>
        <Button size="small" onClick={() => setFirstOpen(true)}>
          {_s} to {_e}
        </Button>
        <FilterMode
          onFilter={(e) => setDataMode(e.target.outerText)}
          value={dataMode}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, data]);

  if (loading) {
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
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <DataTable
          title="Reports"
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          paginationServer
          paginationTotalRows={totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          defaultSortFieldId={dataSortedID}
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
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          onSort={handleSort}
          sortServer
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </div>
    </>
  );
}

export default Admin;
