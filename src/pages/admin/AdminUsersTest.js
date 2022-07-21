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
import CurrencyInput from "react-currency-input-field";
const moment = require("moment");
import { adminGetService } from "../../services/admin";
import { adminGetServiceTest } from "../../services/report";

import { Col } from "react-bootstrap";

import CheckboxToggle from "./components/toggle.component";
import AddGift from "./AddGift";

import { isJson, haveAdmin, haveModerator, doCurrency } from "../../const";

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
  <Col xl="12" style={{ textAlign: "center", color: "rgba(0,0,0,.5)" }}>
    <div>
      <h4>Empty List.</h4>
      <h5>You currently don't have any record.</h5>
    </div>
  </Col>
);

const FilterComponent = ({ filterText, onFilter, onClear, setExMode }) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);
const updateUserObj = (e, data) => {
  //console.log(data);
  var _key = data.userkey;
  var curU = JSON.parse(JSON.stringify(data.user));
  //curU[''+_key+'']=data.checked

  //console.log(data);
  adminService
    .updateUserByAdmin(curU.id, _key, data.checked)
    .then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: response.data,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        });
      }
    });
};

const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  };
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      /* const res = await adminGetServiceTest(
        `getUsersByAdmin?name=username&value=&page=${page}&per_page=${perPage}&delay=1`
      ); */
      const res = await adminGetServiceTest(
        `getReportsByUser/?id=2&mode=all&page=${page}&number=${perPage}`
      );
      if (res.status === 200) {
        setData(res.data);

        setTotalRows(17);
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

  const handlePerRowsChange = async (newPerPage, page) => {
    setLoading(true);
    setResetPaginationToggle(!resetPaginationToggle);
    try {
      /* const res = await adminGetService(
        `getUsersByAdmin?name=username&value=page=1&per_page=${newPerPage}`
      ); */
      const res = await adminGetServiceTest(
        `getReportsByUser/?id=2&mode=all&page=1&number=${newPerPage}`
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
  }, []);
  const [getwaysList, setGetwaysData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const filteredItems = data.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );

  const [firstOpen, setFirstOpen] = React.useState(false);

  const contextActions = React.useMemo(() => {
    return <Button onClick={() => setFirstOpen(true)}>Gift</Button>;
  }, [data, selectedRows, toggledClearRows]);
  const handleChange33 = ({ selectedRows }) => {
    console.log(selectedRowsTotal);
    if (selectedRows.length > 0) {
      console.log("Selected Rows: ", selectedRows);
      var newSelect = [];
      {
        selectedRows.map((user, i) => {
          var newUser = {};
          newUser.username = user.username;

          newSelect.push(newUser);
        });
      }
      //setSelectedTotal(newSelect);
    }
  };

  const handleGetGeteways = async () => {
    if (getGateways) {
      setGetwaysData(getGateways);
    } else {
      setLoading(true);
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setGetwaysData(sorted);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleGetGeteways();
  }, []);
  const columns2 = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <a
            href="#"
            onClick={() => prop.addTabData(row.username, getwaysList)}
          >
            {row.username}
          </a>
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "Refer",
      selector: (row) => (row.refer ? row.refer : ""),
      format: (row) => (
        <>
          {row.refer && (
            <a href="#" onClick={() => prop.addTabData(row.refer, getwaysList)}>
              {row.refer}
            </a>
          )}
        </>
      ),
      sortable: true,
      grow: 2,
    },

    {
      name: "Balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },

    {
      name: "Ban",
      selector: (row) => row.userBlock,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.userBlock}
            user={row}
            userkey="userBlock"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "Admin",
      selector: (row) => row.roles,
      format: (row) => (
        <CheckboxToggle
          check={haveAdmin(row.roles)}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
          disabled={true}
        />
      ),
      sortable: true,
    },
    {
      name: "Moderator",
      selector: (row) => row.roles,
      format: (row) => (
        <CheckboxToggle
          check={haveModerator(row.roles)}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
          disabled={true}
        />
      ),
      sortable: true,
    },
  ];
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <a
            href="#"
            onClick={() => prop.addTabData(row.username, getwaysList)}
          >
            {row.username}
          </a>
        </>
      ),
      sortable: true,
      grow: 2,
    },
  ];
  const rowSelectCritera = (row) => row.id > 6;
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
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
        size="large"
        style={{ height: "auto" }}
      >
        <AddGift selectedList={selectedRows} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        <DataTable
          title="Desserts"
          columns={columns}
          data={filteredItems}
          progressPending={loading}
          paginationServer
          paginationTotalRows={totalRows}
          paginationPerPage={perPage}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          defaultSortFieldId={1}
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
          contextActions={contextActions}
          selectableRows
          onSelectedRowsChange={handleChange}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          clearSelectedRows={toggledClearRows}
        />
      </div>
    </>
  );
}

export default Admin;
