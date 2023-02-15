import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import $ from "jquery";
import Reward from "../../utils/Reward";
import eventBus from "../../services/eventBus";
import { useLastReward } from "../../hook/userHook";

const ActiveTable = (prop) => {
  const lastReward = prop.lastReward;

  var _sortDataOld = [];

  try {
    _sortDataOld = JSON.parse(localStorage.getItem("lastRewardSort"));
  } catch (error) {
    localStorage.removeItem("lastRewardSort");
  }
  if (_sortDataOld == null) {
    _sortDataOld = [];
  }
  const [_sortData, setSortData] = useState(_sortDataOld);

  useEffect(() => {
    var myData = lastReward.sort((a, b) => (a.date < b.date ? 1 : -1));
    var _new = myData.filter((d) => !d.class);

    var myI = myData.length;
    var newmyI = _new.length;
    if (myI > 0) {
      var _sortD = [];
      if (newmyI == myI) {
        myData.map(function (x, i) {
          var myx = x;
          if (!x.class) {
            myx.class = "lastlogs id-" + myx.id + " hiddenmenu faster";
            myI = myI - 1;
            setTimeout(() => {
              prop.animateCSS(".id-" + myx.id + "", "fadeInDown");
              //$("#playreward").trigger("click");
              prop.bindLastReward();
            }, 50 * (myI - i));
          } else {
            myI = myI - 1;
            myx.class = x.class.replace(/hiddenmenu/g, "");
          }
          _sortD.push(myx);
        });
      } else {
        myData.map(function (x, i) {
          var myx = x;
          if (!x.class) {
            myx.class = "lastlogs id-" + myx.id + " hiddenmenu faster";

            setTimeout(() => {
              prop.animateCSS(".id-" + myx.id + "", "fadeInDown");
              //$("#playreward").trigger("click");
              prop.bindLastReward();
            }, 100);
          } else {
            myx.class = x.class.replace(/hiddenmenu/g, "");
          }

          _sortD.push(myx);
        });
      }
      setSortData(_sortD);
    }
  }, [lastReward]);
  useEffect(() => {
    localStorage.setItem("lastRewardSort", JSON.stringify(_sortData));
    localStorage.setItem("lastReward", JSON.stringify(_sortData));
    prop.bindLastReward();
  }, [_sortData]);

  if (!_sortData) return null;
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
          {_sortData.map(function (bonus, i) {
            return (
              <div
                className={bonus?.class + " rewardname"}
                mode={bonus?.mode.toLowerCase()}
                key={i}
              >
                <Reward item={bonus} color={false} {...prop} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ActiveTable;
