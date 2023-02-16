import React, { useEffect, useState } from "react";
import { List, Segment, Statistic } from "semantic-ui-react";
import { activeColorList, getEvent } from "../../const";
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
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  var _event = getEvent(siteInfo);
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var leaguerules = siteInfo?.dailyLeagueSet[0];
  const [activeTable] = useActiveTable();

  const [_sortData, setSortData] = useState(_sortDataOld);

  useEffect(() => {
    try {
      {
        Array.apply(0, Array(activeTable?.RingGames)).map(function (x, i) {
          if (
            // activeTable.Status[i].indexOf("Waiting: 0/") > -1 ||
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
                minstack: activeTable.BigBlind[i] * 20,
                stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                blind:
                  activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
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
                  minstack: activeTable.BigBlind[i] * 20,
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                  blind:
                    activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
                  class: "update",
                });
              } else {
                _sortD.push({
                  name: activeTable.Name[i],
                  color: strColor,
                  status: _p + "/" + activeTable.Seats[i],
                  minstack: activeTable.BigBlind[i] * 20,
                  stack: activeTable.SmallBlind[i] + activeTable.BigBlind[i],
                  blind:
                    activeTable.SmallBlind[i] + "/" + activeTable.BigBlind[i],
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
      <Segment
        basic
        style={{
          color: "#fff",
          position: "absolute",
          top: 8,
          right: 5,
          opacity: 1,
          padding: 0,
          cursor: "pointer",
        }}
        className="fullopenpanel"
        onClick={() => {
          prop.setActivePanel(!prop.activePanel);
          $(".picn").toggleClass("open");
        }}
      >
        <div id="nav-icon1" className="picn">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Segment>
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
              var aarName = x.name.split(" ");

              return (
                <List.Item
                  key={i}
                  id={"lvl" + (i + 1)}
                  as="div"
                  className={
                    x.minstack > loginToken?.balance
                      ? "tablename opacity-100 " + x.class
                      : "tablename " + x.class
                  }
                >
                  <div className={"ui  inverted button  fluid   "}>
                    <Statistic
                      horizontal
                      inverted
                      color={x.color}
                      size="mini"
                      style={{ width: "100%", display: "block" }}
                    >
                      <Statistic.Value className="left floated text-center fw-lighter">
                        {aarName[0]}
                        <div className="detail">{aarName[1]}</div>
                      </Statistic.Value>
                      <Statistic.Label
                        style={{ textTransform: "none" }}
                        className="name left floated text-start"
                      >
                        {aarName[2]}
                        <br />
                        {_event == "VIP" &&
                          parseInt(x.minstack / 20) >=
                            parseInt(viprules.bigBlindLimit * 1000) && (
                            <small className="text-gold fw-lighter">
                              VIP Table
                            </small>
                          )}
                        {_event == "GPass" &&
                          parseInt(x.minstack / 20) >=
                            parseInt(gpassrules.bigBlindLimit * 1000) && (
                            <small className="text-gold fw-lighter">
                              GPass Table
                            </small>
                          )}
                        {_event == "League" && (
                          <small className="text-gold fw-lighter">
                            Daily League
                          </small>
                        )}
                      </Statistic.Label>
                      <Statistic.Value
                        className={
                          x.class == "update"
                            ? "animated bounceIn text-end right floated"
                            : "text-end right floated"
                        }
                      >
                        {x.status}
                      </Statistic.Value>
                    </Statistic>
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
