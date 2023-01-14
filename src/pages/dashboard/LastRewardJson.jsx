import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import $ from "jquery";
import Reward from "../../utils/Reward";
import eventBus from "../../services/eventBus";
const ActiveTable = (prop) => {
  var _sortDataOld = [];

  var _sortDataNew = [];
  var _sortD = [];
  try {
    _sortDataOld = JSON.parse(localStorage.getItem("lastRewardSort"));
  } catch (error) {
    localStorage.removeItem("lastRewardSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }
  try {
    _sortDataNew = JSON.parse(localStorage.getItem("lastReward"));
  } catch (error) {
    localStorage.removeItem("lastReward");
  }
  if (_sortDataNew == null) {
    _sortDataNew = [];
  }

  const [_data, setData] = useState(_sortDataNew);
  const [_sortData, setSortData] = useState(_sortDataOld);

  useEffect(() => {
    var myData = _data;

    try {
      var myI = myData.length;

      myData.map(function (x, i) {
        var myx = x;

        if (_sortDataOld.filter((d, i) => d.id == myx.id).length == 0) {
          myx.class = "lastlogs id-" + myx.id + " hiddenmenu fast";
          myI = myI - 1;
          setTimeout(() => {
            prop.animateCSS(".id-" + myx.id + "", "fadeInDown");
            $("#playreward").trigger("click");
            prop.bindLastReward();
          }, 1000 * (myData.length - myI));
        } else {
          myI = myI - 1;
          myx.class = "lastlogs";
        }

        _sortD.push(myx);
      });

      setSortData(_sortD);
      setTimeout(() => {
        localStorage.setItem("lastRewardSort", JSON.stringify(_sortD));
        //$("#playreward").trigger("click");
      }, 700 * myI);
    } catch (error) {}

    localStorage.setItem("lastReward", JSON.stringify(_data));
    //prop.animateCSS(".hiddenmenu.lastlogs", "slideInUp");
    //console.log(_data);
  }, [_data]);
  useEffect(() => {
    eventBus.on("LastReward", (dataGet) => {
      var mydataGet = dataGet.sort((a, b) => (a.id < b.id ? 1 : -1));
      setData(mydataGet);
    });
  }, []);
  return (
    <>
      {_sortData.length == 0 ? (
        <List divided inverted verticalAlign="middle" className="activetable">
          <List.Item className="text-center nodata" as="h2">
            No reward avaliable now
          </List.Item>
        </List>
      ) : (
        <div style={{ paddingLeft: 15, marginBottom: 200 }}>
          {_sortData.length > 0 && (
            <>
              {_sortData.map(function (bonus, i) {
                return (
                  <div
                    className={bonus.class + " rewardname"}
                    mode={bonus.mode}
                    key={i}
                  >
                    <Reward item={bonus} />
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveTable;
