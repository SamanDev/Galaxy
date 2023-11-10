import React, { useState } from "react";
import {
  Input,
  Segment,
  Button,
  Dimmer,
  Loader,
  Modal,
  Form,
  Select,
  Radio,
} from "semantic-ui-react";
import { Alert } from "../../utils/alerts";
import { levelDataInfo } from "../../const";
import CurrencyInput from "react-currency-input-field";
import { adminPostService } from "../../services/admin";
const moment = require("moment");
var __bnus = [
  {
    key: 1,

    value: "Gift",
    label: "هدیه",
    text: "Free Gift",
  },
];
function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}
const setGiftAmount = (level, min, max) => {
  var g = generateRandomInteger(min, max);

  if (level >= levelDataInfo[4].minLevel) {
    if (g < levelDataInfo[4].minAmount || g > levelDataInfo[4].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[4].minAmount,
        levelDataInfo[4].maxAmount
      );
    }
  } else if (level >= levelDataInfo[5].minLevel) {
    if (g < levelDataInfo[5].minAmount || g > levelDataInfo[5].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[5].minAmount,
        levelDataInfo[5].maxAmount
      );
    }
  } else {
    if (g < levelDataInfo[6].minAmount || g > levelDataInfo[6].maxAmount) {
      var g = generateRandomInteger(
        levelDataInfo[6].minAmount,
        levelDataInfo[6].minAmount * (level + 1)
      );
    }
  }

  g = Math.round(g / 1000) * 1000;
  return g;
};

var mindate = new Date();
var nowdate = new Date();
var expdate = new Date();
nowdate = moment(nowdate).format("YYYY-MM-DD HH:00:00");
mindate = moment(mindate).format("YYYY-MM-DD HH:00:00");
expdate = moment(nowdate).add(6, "hours").format("YYYY-MM-DD HH:mm:00");
function Admin(prop) {
  const [myState, setMyState] = useState({
    list: [
      { id: "start", val: nowdate },
      { id: "plus", val: 6 },
      { id: "plusText", val: { key: "hours", value: "hours", text: "Hours" } },

      { id: "expired", val: expdate },
      { id: "usd", val: false },
      { id: "min", val: 100000 },
      { id: "max", val: 3000000 },
      { id: "mode", val: __bnus[0].value },
      { id: "text", val: __bnus[0].text },
      { id: "label", val: __bnus[0].label },
      { id: "selectedList", val: prop.selectedList },
    ],
  });

  const setUsers = (data) => {
    data.players.map((player, i) => {
      var newData = {
        username: player.username,
        startDate: data.startDate,
        amount: data.usd ? 0 : player.amount,
        amount2: data.usd ? player.amount2 : 0,
        expireDate: data.expireDate,
        mode: data.mode,

        status: data.status,
        label: data.label,
        text: data.text,
      };
      addGift(newData);
    });
  };
  const addGift = async (data) => {
    try {
      const res = await adminPostService(data, "addGift");
      if (res.status == 200) {
        if (res.data?.address) {
        }
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert(player.username, "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };
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

    var endFormat = moment(end).local(true).format("YYYY-MM-DD HH:mm:00");
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
            setUsers({
              startDate: moment(findStateId(myState, "start")).valueOf(),
              expireDate: moment(findStateId(myState, "expired")).valueOf(),

              mode: findStateId(myState, "mode"),
              usd: findStateId(myState, "usd"),
              status: "Pending",
              label: findStateId(myState, "label"),
              text: findStateId(myState, "text"),
              players: findStateId(myState, "selectedList"),
            });
          }}
        >
          Add
        </Button>
      </Modal.Header>

      <Modal.Content>
        <Form>
          <Form.Field width={4}>
            <Radio
              toggle
              checked={findStateId(myState, "usd")}
              onChange={(e, { value }) =>
                onUpdateItem("usd", !findStateId(myState, "usd"))
              }
            />
          </Form.Field>
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
          <Form.Group inline className="hiddenmenu">
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
                <Form.Field width={4}>
                  <label>
                    {user.username} ({user.level})
                  </label>
                </Form.Field>
                <Form.Field width={6}>
                  <Input type="text" disabled={findStateId(myState, "usd")}>
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={user.amount}
                      onValueChange={(value, name) => {
                        if (parseInt(value) != 0) {
                          user.amount = parseInt(value);
                        }
                      }}
                    />
                  </Input>
                </Form.Field>
                <Form.Field width={6}>
                  <Input type="text" disabled={!findStateId(myState, "usd")}>
                    <CurrencyInput
                      name="minuses"
                      allowDecimals={false}
                      defaultValue={user.amount2}
                      onValueChange={(value, name) => {
                        if (parseInt(value) != 0) {
                          user.amount2 = parseInt(value);
                        }
                      }}
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
