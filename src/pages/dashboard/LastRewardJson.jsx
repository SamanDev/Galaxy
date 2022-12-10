import React, { useEffect, useState } from "react";
import { List, Segment, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import MenuLoader from "../../utils/menuLoader";
import { getReportPenService } from "../../services/report";
import $ from "jquery";
import Reward from "../../utils/Reward";
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
    if (_data != prop.lastReward) setData(prop.lastReward);
  }, [prop.lastReward]);
  useEffect(() => {
    var myData = _data;

    try {
      var myI = 1;
      myData.map(function (x, i) {
        var myx = x;

        if (_sortDataOld.filter((d) => d.id == myx.id).length == 0) {
          myx.class = "lastlogs id-" + myx.id + " hiddenmenu fast";
          myI = myI + 1;

          setTimeout(() => {
            prop.animateCSS(".id-" + myx.id + "", "zoomIn");
          }, 1500 * (myData.length - myI));
        } else {
          myx.class = "lastlogs";
        }

        _sortD.push(myx);
      });

      _sortD.sort((a, b) => (a.id < b.id ? 1 : -1));

      setSortData(_sortD);
      localStorage.setItem("lastRewardSort", JSON.stringify(_sortD));
    } catch (error) {}
    //myData.sort((a, b) => (a.id < b.id ? 1 : -1));
    localStorage.setItem("lastReward", JSON.stringify(_data));
    //prop.animateCSS(".hiddenmenu.lastlogs", "slideInUp");
    console.log(_data);
  }, [_data]);

  return (
    <>
      {_sortData.length == 0 ? (
        <List divided inverted verticalAlign="middle" className="activetable">
          <List.Item className="text-center" as="h2">
            No reward avaliable now
          </List.Item>
        </List>
      ) : (
        <div style={{ paddingLeft: 20, marginBottom: 200 }}>
          {_sortData.length > 0 && (
            <>
              {_sortData.map(function (bonus, i) {
                return (
                  <div className={bonus.class} key={i}>
                    <Reward item={bonus} {...prop} />
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
