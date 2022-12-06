import React, { useEffect, useState } from "react";
import { List, Segment, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import MenuLoader from "../../utils/menuLoader";
import { getReportPenService } from "../../services/report";
import $ from "jquery";

const ActiveTable = (prop) => {
  var _sortDataOld = [];
  try {
    _sortDataOld = JSON.parse(localStorage.getItem("activeTableSort"));
  } catch (error) {
    localStorage.removeItem("activeTableSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }
  var _sortDataNew = [];
  try {
    _sortDataNew = JSON.parse(localStorage.getItem("activeTable"));
  } catch (error) {
    localStorage.removeItem("activeTable");
  }
  if (_sortDataNew == null) {
    _sortDataNew = [];
  }
  const [_data, setData] = useState(_sortDataNew);
  const [_sortData, setSortData] = useState(_sortDataOld);

  const [table, setTable] = useState("");
  useEffect(() => {
    if (_data != prop.activatTable) {
      localStorage.setItem("activeTable", JSON.stringify(prop.activatTable));
      setData(prop.activatTable);
    }
  }, [prop.activatTable]);
  useEffect(() => {
    var _sortD = [];
    try {
      {
        Array.apply(0, Array(_data.RingGames)).map(function (x, i) {
          if (
            // _data.Status[i].indexOf("Waiting: 0/") > -1 ||
            _data.Status[i].indexOf("Waiting: 1/") > -1 ||
            _data.Status[i].indexOf("Playing") > -1
          ) {
            var _p = _data.Status[i].split(": ")[1].split("/")[0];
            var strColor = "#cbff2c";
            if (_data.Name[i].split(" ")[0] == "12") {
              strColor = "rgb(146 215 0)";
            }
            if (_data.Name[i].split(" ")[0] == "11") {
              strColor = "rgb(0 255 178)";
            }
            if (_data.Name[i].split(" ")[0] == "10") {
              strColor = "#8a27e8";
            }
            if (_data.Name[i].split(" ")[0] == "09") {
              strColor = "#9c46ec";
            }
            if (_data.Name[i].split(" ")[0] == "08") {
              strColor = "#0089e3";
            }
            if (_data.Name[i].split(" ")[0] == "07") {
              strColor = "#62aee0";
            }
            if (_data.Name[i].split(" ")[0] == "06") {
              strColor = "#ff0d01";
            }
            if (_data.Name[i].split(" ")[0] == "05") {
              strColor = "#ff362c";
            }
            if (_data.Name[i].split(" ")[0] == "04") {
              strColor = "#ff8a2c";
            }
            if (_data.Name[i].split(" ")[0] == "03") {
              strColor = "#ffc12c";
            }
            if (_data.Name[i].split(" ")[0] == "02") {
              strColor = "#f3ff2c";
            }
            if (_data.Name[i].split(" ")[0] == "01") {
              strColor = "#cbff2c";
            }
            if (_data.Name[i].split(" ")[0] == "00") {
              strColor = "#ececec";
            }
            _sortD.push({
              name: _data.Name[i],
              color: strColor,
              status: _p + "/" + _data.Seats[i],
              stack: _data.SmallBlind[i] + _data.BigBlind[i],
            });
          }
        });
      }
      _sortD.sort((a, b) => (a.stack < b.stack ? 1 : -1));
      setSortData(_sortD);
      localStorage.setItem("activeTableSort", JSON.stringify(_sortD));
    } catch (error) {}
  }, [_data]);

  return (
    <>
      <Segment
        basic
        inverted
        style={{
          color: "#fff",
          position: "absolute",
          top: 18,
          right: 10,
          opacity: 0.5,
          padding: 0,
        }}
        menu="panelright"
        tabIndex="0"
        fx="spin"
        ease="funky"
        role="button"
        as="mm-burger"
      ></Segment>

      <List divided inverted verticalAlign="middle" className="activetable">
        {_sortData?.map(function (x, i) {
          return (
            <List.Item
              key={i}
              id={"lvl" + (i + 1)}
              style={{ color: x.color }}
              onClick={() => {
                prop.openGame();
              }}
            >
              {x.name}

              <List.Content floated="right" className="rtl">
                {x.status}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};

export default ActiveTable;
