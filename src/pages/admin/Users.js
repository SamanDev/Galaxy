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
  Grid,
} from "semantic-ui-react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";
import CurrencyInput from "react-currency-input-field";
const moment = require("moment");
import { adminGetService, adminPutService } from "../../services/admin";
import { Alert } from "../../utils/alerts";

import { Col } from "react-bootstrap";

import CheckboxToggle from "./utils/toggle";
import AddGift from "./AddGift";
import Filter from "./Filter";

import {
  isJson,
  haveAdmin,
  haveModerator,
  doCurrency,
  levelDataInfo,
} from "../../const";

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
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const setGiftAmount = (level) => {
  if (level >= levelDataInfo[4].minLevel) {
    var g = generateRandomInteger(
      levelDataInfo[4].minAmount,
      levelDataInfo[4].maxAmount
    );
  } else if (level >= levelDataInfo[5].minLevel) {
    var g = generateRandomInteger(
      levelDataInfo[5].minAmount,
      levelDataInfo[5].maxAmount
    );
  } else {
    var g = generateRandomInteger(
      levelDataInfo[6].minAmount,
      levelDataInfo[6].minAmount * (level + 1)
    );
  }
  g = Math.round(g / 1000) * 1000;
  return g;
};
function Admin(prop) {
  const [data, setData] = useState([]);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [dataSortedID, setDataSortedID] = useState(1);
  const params = useParams();
  const [dataSearch, setDataSearch] = useState("");
  const [dataLoginDay, setDataLoginDay] = useState("");

  const [selectedList, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterText, setFilterText] = React.useState("");
  const [filterOk, setFilterOk] = React.useState(false);

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const handleChangeSearch = (e, { value }) => {
    setDataSearch(value);
  };
  const handleChangeLogin = (e, { value }) => {
    setDataLoginDay(value);
  };

  const fetchUsers = async (page) => {
    var _name = prop.search;
    var _val = prop.searchValue;
    var _contain = true;
    if (dataSearch) {
      _name = "level";
      _val = dataSearch.toString();
      if (_val.indexOf("up") == -1) {
        _contain = false;
      }
      _val = _val.replace("up", "");
      if (_val == "chip") {
        _name = "chip";
        _val = "";
        _contain = false;
        setDataSortedID(5);
      }
    }
    if (_name == "") {
      _name = "username";
    }
    if (filterText) {
      _name = "username";
      _val = filterText;
      _contain = true;
    }

    setLoading(true);
    try {
      const res = await adminGetService(
        `getUsersByAdmin?name=${_name}&value=${_val}&page=${page}&number=500&login=${dataLoginDay}&contain=${_contain}`
      );
      if (res.status === 200) {
        setData(res.data.users);
        setTotalRows(res.count);
        setFilterOk(false);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  var filteredItems = data.filter((item) => item.username);

  if (dataLoginDay) {
    var startDate = addDays(new Date(), dataLoginDay);

    filteredItems = data.filter((item) => {
      var _Date = new Date(item.lastLogin);
      return _Date <= startDate;
    });
  }

  useEffect(() => {
    fetchUsers(1); // fetch page 1 of users
  }, [dataSearch]);

  useEffect(() => {
    if (filterOk) fetchUsers(1); // fetch page 1 of users
  }, [filterOk]);

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
        newUser.level = user.level;
        newUser.amount = setGiftAmount(user.level);

        newSelect.push(newUser);
      });
    }
    setSelected(newSelect);
  };

  useEffect(() => {
    prop.handleGetGeteways();
    if (params.username) {
      prop.addTabData(params.username, prop.getwaysList);
    }
  }, []);
  const columnsDownLine = [
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
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username, prop.getwaysList)}
          >
            {row.username}
          </span>
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
  ];
  var columns = [
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
          <span
            className="msglink fw-bold"
            onClick={() => prop.addTabData(row.username, prop.getwaysList)}
          >
            {row.username}
          </span>
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
            <span
              className="msglink fw-bold "
              onClick={() => prop.addTabData(row.refer, prop.getwaysList)}
            >
              {row.refer}
            </span>
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
      name: "Active",
      selector: (row) => row.userActivate,
      format: (row) => (
        <CheckboxToggle
          check={row.userActivate}
          user={row}
          userkey="userActivate"
          onChange={updateUserObj}
          disabled={haveAdmin(loginToken.roles) ? false : true}
        />
      ),
      sortable: true,
    },
  ];
  if (haveAdmin(loginToken.roles)) {
    columns.push(
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
        name: "Admin",
        selector: (row) => row.roles,
        format: (row) => (
          <CheckboxToggle
            check={haveAdmin(row.roles)}
            user={row}
            userkey="Roles"
            onChange={updateUserObj}
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
          />
        ),
        sortable: true,
      }
    );
  }

  const subHeaderComponentMemo = React.useMemo(() => {
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
              <Button onClick={() => prop.addGatewayTabData("Gateways")}>
                Gateways
              </Button>
              <Button onClick={() => prop.addGatewayTabData("SiteCarts")}>
                Site Carts
              </Button>
              <Button onClick={() => prop.addMainTabData("Runner")}>
                Runners
              </Button>
              <Button onClick={() => prop.addMainTabData("Bots")}>Bots</Button>
              {selectedList.length > 0 && (
                <Button color="red" onClick={() => setFirstOpen(true)}>
                  Gift {selectedList.length}
                </Button>
              )}
            </Grid.Column>

            <Grid.Column>
              <Filter onFilter={handleChangeSearch} value={dataSearch} />
              <Filter
                onFilter={handleChangeLogin}
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
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    );
  }, [filterText, resetPaginationToggle, data, selectedList]);
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
        {prop.search == "refer" && prop.searchValue != "bots" ? (
          <>
            <DataTable
              columns={columnsDownLine}
              data={filteredItems}
              progressPending={loading}
              paginationPerPage={perPage}
              onChangeRowsPerPage={handlePerRowsChange}
              defaultSortFieldId={dataSortedID}
              defaultSortAsc={false}
              expandOnRowClicked={true}
              expandableRowsHideExpander={true}
              conditionalRowStyles={conditionalRowStyles}
              noDataComponent={noDataComponent}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
              contextActions={contextActions}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onSelectedRowsChange={handleChange}
            />
          </>
        ) : (
          <>
            {subHeaderComponentMemo}
            <DataTable
              columns={columns}
              data={filteredItems}
              progressPending={loading}
              onChangeRowsPerPage={handlePerRowsChange}
              paginationPerPage={perPage}
              defaultSortFieldId={dataSortedID}
              defaultSortAsc={false}
              expandOnRowClicked={true}
              expandableRowsHideExpander={true}
              conditionalRowStyles={conditionalRowStyles}
              noDataComponent={noDataComponent}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              persistTableHead
              contextActions={contextActions}
              selectableRows
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              onSelectedRowsChange={handleChange}
            />
          </>
        )}
      </div>
    </>
  );
}

export default Admin;