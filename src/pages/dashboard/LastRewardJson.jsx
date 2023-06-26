import React, { useEffect, useState } from "react";
import { List, Placeholder, Segment } from "semantic-ui-react";
import $ from "jquery";
import Reward from "../../utils/Reward";
import eventBus from "../../services/eventBus";
import { useLastReward } from "../../hook/userHook";
import LazyLoad from "react-lazyload";
const ActiveTable = (prop) => {
  const lastReward = prop.lastReward;

  const [_sortData, setSortData] = useState([]);

  useEffect(() => {
    var myData = lastReward.sort((a, b) => (a.date < b.date ? 1 : -1));
    var _new = myData.filter((d) => !d.class);
    console.log(lastReward);
    var myI = myData.length;
    var newmyI = _new.length;
    if (myI > 0) {
      var _sortD = [];
      if (newmyI == myI) {
        myData.map(function (x, i) {
          var myx = x;

          myx.class = "lastlogs animated fadeIn slow";

          _sortD.push(myx);
        });
      } else {
        myData.map(function (x, i) {
          var myx = x;
          if (!x?.class) {
            myx.class =
              "lastlogs id-" + myx.id ? myx.id : i + " hiddenmenu faster";
          } else {
            myx.class = x?.class ? x?.class : "fadeInDown";
          }

          _sortD.push(myx);
        });
      }

      setSortData(_sortD);
    }
  }, [lastReward]);
  useEffect(() => {
    setTimeout(() => {
      _sortData
        .filter((d) => d.class.indexOf("fadeInDown") > -1)
        .map(function (x, i) {
          var myx = x;

          myx.class = "lastlogs animated fadeIn slow";
        });
    }, 400);

    prop.bindLastReward();
  }, [_sortData]);
  useEffect(() => {
    eventBus.on("updateLastReward", (dataGet) => {
      dataGet.class = "lastlogs animated fadeInDown";

      setSortData((previous) => [dataGet].concat(previous));
    });
  }, []);

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
            paddingLeft: 17,
            marginBottom: 150,
            width: "100%",
            overflow: "hidden",
          }}
        >
          {_sortData.map(function (bonus, i) {
            return (
              <LazyLoad key={i} height={100}>
                <div
                  className={bonus?.class + " rewardname"}
                  mode={bonus?.mode.toLowerCase()}
                >
                  <Reward item={bonus} color={false} {...prop} />
                </div>
              </LazyLoad>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ActiveTable;
