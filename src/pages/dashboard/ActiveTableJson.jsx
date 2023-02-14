import React, { useEffect, useState } from "react";
import { List, Segment } from "semantic-ui-react";
import { activeColorList } from "../../const";
import { useActiveTable } from "../../hook/userHook";
import $ from "jquery";
const ActiveTable = (prop) => {
  var _sortDataOld = [];

  var _sortD = [];
  try {
    _sortDataOld = JSON.parse(localStorage.getItem("activeTableSort"));
  } catch (error) {
    localStorage.removeItem("activeTableSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }

  const [activeTable] = useActiveTable();

  const [_sortData, setSortData] = useState(_sortDataOld);

  useEffect(() => {
    try {
      {
        Array.apply(0, Array(activeTable?.RingGames)).map(function (x, i) {
          if (
            //activeTable.Status[i].indexOf("Waiting: 0/") > -1 ||
            activeTable.Status[i].indexOf("Waiting: 1/") > -1 ||
            activeTable.Status[i].indexOf("Playing") > -1
          ) {
            var _p = activeTable.Status[i].split(": ")[1].split("/")[0];
            var strColor = "#cbff2c";
            strColor =
              activeColorList[parseInt(activeTable.Name[i].split(" ")[0])];

            if (
              _sortDataOld.filter((d) => d.name == activeTable.Name[i])
                .length == 0
            ) {
              _sortD.push({
                name: activeTable.Name[i],
                color: strColor,
                status: _p + "/" + activeTable.Seats[i],
                stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                class: " bounceIn " + strColor,
              });
            } else {
              if (
                _sortDataOld.filter(
                  (d) =>
                    d.name == activeTable.Name[i] &&
                    d.status == _p + "/" + activeTable.Seats[i]
                ).length == 0
              ) {
                _sortD.push({
                  name: activeTable.Name[i],
                  color: strColor,
                  status: _p + "/" + activeTable.Seats[i],
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                  class: "update",
                });
              } else {
                _sortD.push({
                  name: activeTable.Name[i],
                  color: strColor,
                  status: _p + "/" + activeTable.Seats[i],
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
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
      prop.bindActiveTable();
    } catch (error) {
      prop.bindActiveTable();
    }
  }, [activeTable]);

  return (
    <>
      {prop.activePanel && (
        <Segment
          basic
          inverted
          style={{
            color: "#fff",
            position: "absolute",
            top: 10,
            right: 5,
            opacity: 0.5,
            padding: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            prop.setActivePanel(!prop.activePanel);
            $(".picn").toggleClass("open");
          }}
        >
          <div id="nav-icon1" className="picn open">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Segment>
      )}

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
                  className={"tablename " + x.class}
                >
                  <div
                    className={"ui  inverted button  fluid mini  " + x.class}
                  >
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
