import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Form,
} from "semantic-ui-react";

import Swal from "sweetalert2";
import CheckboxToggle from "./toggle.component";
import { adminGetService, adminPutService } from "../../../services/admin";
import { Alert } from "../../../utils/alerts";

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
        <img
          alt="nodata"
          style={{ height: 80 }}
          src="/assets/images/nodata.svg"
        ></img>
        <h4>Empty List.</h4>
        <h5>You currently don't have any report.</h5>
      </div>
    </Dimmer>
  </div>
);
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function Admin(prop) {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [getName, setGetName] = React.useState("");
  const [getMode, setGetMode] = React.useState("");
  const [loading, setLoading] = useState(false);

  const handleGetGeteways = async () => {
    if (getGateways) {
      setDataTransaction(getGateways);
    } else {
      setLoading(true);
      try {
        const res = await adminGetService("getGateways");
        if (res.status === 200) {
          var sorted = res.data?.sort((a, b) => (a.id > b.id ? 1 : -1));
          localStorage.setItem("getGateways", JSON.stringify(sorted));
          setDataTransaction(sorted);
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

  const OpenChashier = (open) => {
    setFirstOpen(open);
  };
  const setGetNameVal = (e) => {
    setGetName(e.target.value);
  };
  const setGetModeVal = (e) => {
    setGetMode(e.target.value);
  };

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      format: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      format: (row) => row.name,
      width: "250px",
      sortable: true,
    },
    {
      name: "Mode",
      selector: (row) => row.mode,
      format: (row) => row.mode,

      sortable: true,
    },
    {
      name: "Bonus",
      selector: (row) => row.mode,
      format: (row) => <Input value={"0"} onChange={updateUserObj} />,

      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.active,
      format: (row) => (
        <CheckboxToggle
          check={row.active}
          user={row}
          userkey="userActivate"
          onChange={updateUserObj}
        />
      ),
      sortable: true,
    },
  ];
  const addGetway = (e, data) => {
    if (!getMode || !getName) {
      return false;
    }
    setLoading(true);
    adminService.addGateway(getName, getMode).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {
          prop.onReset("Getways");
          setFirstOpen(false);
          setLoading(false);
        });
      }
    });
  };
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <>
        <Button onClick={() => setFirstOpen(true)}>Add Getways</Button>
      </>
    );
  }, []);
  const updateUserObj = async (e, data) => {
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    var values = { id: curU.id, key: _key, value: data.checked };

    try {
      const res = await adminPutService(values, "updateUserByAdmin");
      if (res.status == 200) {
        if (res.data?.address) {
          setRefresh(true);
        }
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  if (loading) {
    return (
      <>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  return (
    <>
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={firstOpen}
        size="mini"
        style={{ height: "auto" }}
      >
        <Modal.Header>Add New Getway</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input value={getName} onChange={setGetNameVal} />
            </Form.Field>
            <Form.Field>
              <label>Mode</label>
              <input value={getMode} onChange={setGetModeVal} />
            </Form.Field>

            <br />
            <br />
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              color="black"
              fluid
              onClick={addGetway}
            >
              Submit
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
      <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
        <DataTable
          data={dataTransaction}
          columns={columns}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          title="Getways List"
          noDataComponent={noDataComponent}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          pagination
          paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        />
      </div>
    </>
  );
}

export default Admin;
