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
import { adminGetService, adminPutService } from "../../services/admin";
import { Alert } from "../../utils/alerts";

import { Col } from "react-bootstrap";

import CheckboxToggle from "./components/toggle.component";
import AddGift from "./AddGift";
import Filter from "./Filter";

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

const FilterComponent = ({
  filterText,
  onFilterOk,
  onFilter,
  onClear,
  setExMode,
}) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      onBlur={onFilterOk}
    />
  </>
);
const updateUserObj = async (e, data) => {
  var _key = data.userkey;
  var curU = JSON.parse(JSON.stringify(data.user));
  var values = { id: curU.id, key: _key, value: data.checked };

  try {
    const res = await adminPutService(values, "updateUserByAdmin");
    if (res.status == 200) {
      if (res.data?.address) {
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};

const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [data, setData] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const [dataSorted, setDataSorted] = useState("id");
  const [dataSortedDir, setDataSortedDir] = useState("desc");
  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");
  const [getwaysList, setGetwaysData] = useState([]);

  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch({ value });
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const res = await adminGetService(
        `getUsersByAdmin?name=${prop.search ? prop.search : "username"}&value=${
          filterOk ? filterText : prop.searchValue
        }&page=${page}&per_page=${perPage}&sort=${dataSorted}&order=${dataSortedDir}&level=${dataSearch}&login=${dataLoginDay}`
      );
      if (res.status === 200) {
        setData(res.data);
        setTotalRows(4);
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
  }, [dataSorted, dataSortedDir, dataSearch, dataLoginDay]);
  useEffect(() => {
    if (filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk]);

  const filteredItems = data.filter((item) => item.username);

  const [firstOpen, setFirstOpen] = React.useState(false);
  const contextActions = React.useMemo(() => {
    return <Button onClick={() => setFirstOpen(true)}>Gift</Button>;
  }, [data]);
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
    var newSelect = [];
    {
      selectedRows.map((user, i) => {
        var newUser = {};
        newUser.username = user.username;

        newSelect.push(newUser);
      });
    }
    setSelected(newSelect);
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
  const columnsDownLine = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },

    {
      name: "username",
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
      name: "balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.lastLogin}
          </Moment>
        </>
      ),
      sortable: true,
    },

    {
      name: "userBlock",
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
      name: "inviteBlock",
      selector: (row) => row.inviteBlock,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.userBlock}
            user={row}
            userkey="inviteBlock"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
    },
  ];
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },
    {
      name: "level",
      selector: (row) => row.level,
      format: (row) => <>{row.level}</>,
      sortable: true,
    },
    {
      name: "username",
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
      name: "refer",
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
      name: "balance",
      selector: (row) => row.balance,
      format: (row) => <>{doCurrency(row.balance)}</>,
      sortable: true,
    },
    {
      name: "lastLogin",
      selector: (row) => row.lastLogin,
      format: (row) => (
        <>
          <Moment fromNow ago>
            {row.lastLogin}
          </Moment>
        </>
      ),
      sortable: true,
    },

    {
      name: "userBlock",
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
      name: "inviteBlock",
      selector: (row) => row.inviteBlock,
      format: (row) => (
        <>
          <CheckboxToggle
            check={row.userBlock}
            user={row}
            userkey="inviteBlock"
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
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <Filter onFilter={handleChangeSearch} value={[dataSearch]} />
        <Filter
          onFilter={(e) => setDataLoginDay(e.target.outerText)}
          value={dataLoginDay}
          mymode="login"
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          onFilterOk={() => {
            setFilterOk(true);
          }}
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
        size="large"
        style={{ height: "auto" }}
      >
        <AddGift selectedList={selectedList} />
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        {prop.search == "refer" ? (
          <DataTable
            title="DownLines"
            columns={columnsDownLine}
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
            persistTableHead
            contextActions={contextActions}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            onSelectedRowsChange={handleChange}
            onSort={handleSort}
            sortServer
          />
        ) : (
          <DataTable
            title="Users"
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
            contextActions={contextActions}
            selectableRows
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            onSelectedRowsChange={handleChange}
            onSort={handleSort}
            sortServer
          />
        )}
      </div>
    </>
  );
}

export default Admin;
