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
const addGift = async (data) => {
  console.log(data);
  var _key = data.userkey;
  var curU = JSON.parse(JSON.stringify(data.user));
  var values = { id: curU.id, key: _key, value: data.checked };

  try {
    const res = await adminPutService(values, "updateUserByAdmin");
    if (res.status == 200) {
      setUser(res.data);
      if (res.data?.address) {
      }
    } else {
      Alert("متاسفم...!", res.data.message, "error");
    }
  } catch (error) {
    Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
  }
};
var mindate = new Date();
var nowdate = new Date();
var expdate = new Date();
nowdate = moment(nowdate).format("YYYY-MM-DD hh:mm:00");
mindate = moment(mindate).format("YYYY-MM-DD hh:mm:00");
expdate = moment(expdate).add(6, "hours").format("YYYY-MM-DD hh:mm:00");
function Admin(prop) {
  const [myState, setMyState] = useState({
    list: [
      { id: "start", val: nowdate },
      { id: "plus", val: 6 },
      { id: "plusText", val: { key: "hours", value: "hours", text: "Hours" } },

      { id: "expired", val: expdate },
      { id: "min", val: 100000 },
      { id: "max", val: 3000000 },
      { id: "selectedList", val: prop.selectedList },
    ],
  });
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    if (findStateId(myState, key) != val) {
      setMyState(() => {
        const list = myState.list.map((item) => {
          if (item.id === key) {
            item.val = val;
          }
          return item;
        });

        return {
          list: list,
        };
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const updateEnd = () => {
    var now = new Date(findStateId(myState, "start"));

    var end = moment(now).add(
      findStateId(myState, "plus"),
      findStateId(myState, "plusText").value
    );

    var endFormat = moment(end).format("YYYY-MM-DD hh:mm:00");
    onUpdateItem("expired", endFormat);

    // 1
  };

  function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  function updateUserSelected(i, value, name) {
    var _new = selectedList;
    _new[i].min = parseInt(value);
    console.log(_new);
    console.log(i);

    //setSelected(selectedList);
  }

  if (loading) {
    return (
      <>
        <Segment style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <Modal.Header>
        Add Gift{" "}
        <Button
          floated="right"
          onClick={() => {
            addGift({
              start: findStateId(myState, "start"),
              expired: findStateId(myState, "expired"),
              min: findStateId(myState, "min"),
              max: findStateId(myState, "max"),
              players: findStateId(myState, "selectedList"),
            });
          }}
        >
          Add
        </Button>
      </Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Group inline>
            <Form.Field width={4}>
              <label>Start</label>
              <Input
                type="text"
                value={findStateId(myState, "start")}
                min={mindate}
                onChange={(e) => onUpdateItem("start", e.target.value)}
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Plus</label>
              <Input
                type="text"
                inputMode="number"
                value={findStateId(myState, "plus")}
                onChange={(e) => onUpdateItem("plus", e.target.value)}
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>

            <Form.Field width={4}>
              <Select
                options={[
                  { key: "minutes", value: "minutes", text: "Minutes" },
                  { key: "hours", value: "hours", text: "Hours" },
                ]}
                value={findStateId(myState, "plusText").value}
                onChange={(e, { value }) =>
                  onUpdateItem("plusText", {
                    key: value.toLowerCase(),
                    value: value.toLowerCase(),
                    text: capitalizeFirstLetter(value),
                  })
                }
                onBlur={(e) => updateEnd()}
              />
            </Form.Field>
            <Form.Field width={4}>
              <label>Expired</label>
              <Input type="text" value={findStateId(myState, "expired")} />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <Form.Field width={8}>
              <label>Minimum</label>
              <Input type="text">
                <CurrencyInput
                  value={findStateId(myState, "min")}
                  name="min"
                  allowDecimals={false}
                  onValueChange={(value, name) => {
                    if (value < parseInt(findStateId(myState, "max"))) {
                      onUpdateItem(name, parseInt(value));
                      var newSelect = [];
                      {
                        selectedList.map((user, i) => {
                          user.min = parseInt(value);
                        });
                      }
                      setSelected(selectedList);
                    }
                  }}
                />
              </Input>
            </Form.Field>
            <Form.Field width={8}>
              <label>Maximum</label>
              <Input type="text">
                <CurrencyInput
                  value={findStateId(myState, "max")}
                  name="max"
                  allowDecimals={false}
                  onValueChange={(value, name) => {
                    if (value > parseInt(findStateId(myState, "min"))) {
                      onUpdateItem(name, parseInt(value));
                    }
                  }}
                />
              </Input>
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Content>
      <Modal.Content>
        {findStateId(myState, "selectedList").map((user, i) => {
          return (
            <Form key={i}>
              <Form.Group inline>
                <Form.Field width={3}>
                  <label>{user.username}</label>
                </Form.Field>
                <Form.Field width={4}>
                  <Input type="text">
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      value={user.min}
                      onValueChange={(value, name) => {
                        if (parseInt(value) < parseInt(user.max)) {
                          user.min = parseInt(value);
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
                <Form.Field width={4}>
                  <Input type="text">
                    <CurrencyInput
                      value={user.max}
                      name="max"
                      allowDecimals={false}
                    />
                  </Input>
                </Form.Field>
              </Form.Group>
            </Form>
          );
        })}
      </Modal.Content>
    </>
  );
}

export default Admin;
