import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import $ from "jquery";
import Reward from "../../utils/Reward";
import eventBus from "../../services/eventBus";
import { useLastReward } from "../../hook/userHook";
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
const ActiveTable = (prop) => {
  const [lastReward] = useLastReward();

  const [_sortData, setSortData] = useState(_sortDataOld);

  useEffect(() => {
    var myData = lastReward;

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
        prop.bindLastReward();
      }, 700 * myI);
    } catch (error) {}
    prop.bindLastReward();
  }, [lastReward]);

  return (
    <>
      {_sortData.length == 0 ? (
        <List divided inverted verticalAlign="middle" className="activetable">
          <List.Item className="text-center nodata" as="h2">
            No reward avaliable now
          </List.Item>
        </List>
      ) : (
        <div
          style={{
            paddingLeft: 15,
            marginBottom: 50,
          }}
        >
          {_sortData.length > 0 && (
            <>
              {_sortData.map(function (bonus, i) {
                return (
                  <div
                    className={bonus.class + " rewardname"}
                    mode={bonus.mode.toLowerCase()}
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
