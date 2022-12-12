import React, { useEffect, useState } from "react";
import { List, Segment, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import MenuLoader from "../../utils/menuLoader";
import { activeColorList } from "../../const";
import eventBus from "../../services/eventBus";
import $ from "jquery";
const handleOpenPanel = (e) => {
  $("#panelrightopen").toggle("click");
  alert();
};

const ActiveTable = (prop) => {
  var _sortDataOld = [];

  var _sortDataNew = [];
  var _sortD = [];
  try {
    _sortDataOld = JSON.parse(localStorage.getItem("activeTableSort"));
  } catch (error) {
    localStorage.removeItem("activeTableSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }

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

  useEffect(() => {
    try {
      {
        Array.apply(0, Array(_data.RingGames)).map(function (x, i) {
          if (
            //_data.Status[i].indexOf("Waiting: 0/") > -1 ||
            _data.Status[i].indexOf("Waiting: 1/") > -1 ||
            _data.Status[i].indexOf("Playing") > -1
          ) {
            var _p = _data.Status[i].split(": ")[1].split("/")[0];
            var strColor = "#cbff2c";
            strColor = activeColorList[parseInt(_data.Name[i].split(" ")[0])];

            if (
              _sortDataOld.filter((d) => d.name == _data.Name[i]).length == 0
            ) {
              _sortD.push({
                name: _data.Name[i],
                color: strColor,
                status: _p + "/" + _data.Seats[i],
                stack: _data.SmallBlind[i] + _data.BigBlind[i],
                class: " bounceIn " + strColor,
              });
            } else {
              if (
                _sortDataOld.filter(
                  (d) =>
                    d.name == _data.Name[i] &&
                    d.status == _p + "/" + _data.Seats[i]
                ).length == 0
              ) {
                _sortD.push({
                  name: _data.Name[i],
                  color: strColor,
                  status: _p + "/" + _data.Seats[i],
                  stack: _data.SmallBlind[i] + _data.BigBlind[i],
                  class: "update",
                });
              } else {
                _sortD.push({
                  name: _data.Name[i],
                  color: strColor,
                  status: _p + "/" + _data.Seats[i],
                  stack: _data.SmallBlind[i] + _data.BigBlind[i],
                  class: strColor,
                });
              }
            }
          }
        });
      }
      _sortD.sort((a, b) => (a.stack < b.stack ? 1 : -1));
      setSortData(_sortD);
      localStorage.setItem("activeTableSort", JSON.stringify(_sortD));
    } catch (error) {}
  }, [_data]);
  useEffect(() => {
    eventBus.on("ActiveTables", (dataGet) => {
      localStorage.setItem("activeTable", JSON.stringify(dataGet));
      setData(dataGet);
    });
  }, []);
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

      <List
        divided
        inverted
        relaxed
        verticalAlign="middle"
        className="activetable"
      >
        {_sortData.length == 0 ? (
          <List.Item className="text-center">
            <div className={"nodata"}>No active table avaliable now</div>
          </List.Item>
        ) : (
          <>
            {_sortData?.map(function (x, i) {
              return (
                <List.Item
                  key={i}
                  id={"lvl" + (i + 1)}
                  as="div"
                  className={"tablename  " + x.class}
                >
                  <div className={"ui inverted button fluid mini  " + x.class}>
                    <span className="name left floated">{x.name}</span>

                    <List.Content floated="right" className="rtl">
                      <span
                        className={
                          x.class == "update" ? " animated bounceIn" : ""
                        }
                      >
                        {x.status}
                      </span>
                    </List.Content>
                  </div>
                </List.Item>
              );
            })}
          </>
        )}
      </List>
    </>
  );
};

export default ActiveTable;
