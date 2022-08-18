import React, { useEffect, useState } from "react";
import {
  Icon,
  Label,
  Comment,
  List,
  Image,
  Button,
  Divider,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { doCurrency, levelLeagueReward, levelLeagueList } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import MenuLoader from "../../utils/menuLoader";
import { publicGetService } from "../../services/public";
const LevelList = () => {
  const _data = {
    Status: [
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 1/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Playing: 4",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 1/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
      "Waiting: 0/2",
    ],
    BigBlind: [
      500, 500, 1000, 500, 1000, 500, 500, 500, 1000, 1000, 1000, 2000, 2000,
      2000, 2000, 2000, 2000, 4000, 6000, 4000, 6000, 4000, 4000, 4000, 6000,
      6000, 10000, 10000, 10000, 10000, 10000, 10000, 10000, 20000, 10000,
      20000, 20000, 10000, 10000, 20000, 20000, 15000, 30000, 15000, 30000,
      15000, 15000, 30000, 30000, 20000, 40000, 20000, 40000, 20000, 20000,
      40000, 40000, 25000, 50000, 25000, 50000, 50000, 25000, 25000, 50000,
      50000, 100000, 50000, 100000, 50000, 100000, 50000, 100000, 200000,
      100000, 200000, 100000, 200000, 200000, 400000, 200000, 400000, 200000,
      400000, 500000, 500000, 500000, 1000000, 500000, 1000000, 500000, 1000000,
      500000,
    ],
    SmallBlind: [
      250, 250, 500, 250, 500, 250, 250, 250, 500, 500, 500, 1000, 1000, 1000,
      1000, 1000, 1000, 2000, 3000, 2000, 3000, 2000, 2000, 2000, 3000, 3000,
      5000, 5000, 5000, 5000, 5000, 5000, 10000, 10000, 10000, 10000, 10000,
      10000, 10000, 10000, 10000, 15000, 15000, 15000, 15000, 15000, 15000,
      15000, 15000, 20000, 20000, 20000, 20000, 20000, 20000, 20000, 20000,
      25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 25000, 50000,
      50000, 50000, 50000, 50000, 50000, 100000, 100000, 100000, 100000, 100000,
      100000, 200000, 200000, 200000, 200000, 200000, 200000, 250000, 250000,
      250000, 500000, 500000, 500000, 500000, 500000, 500000,
    ],
    RingGames: 93,
    Result: "Ok",
    Name: [
      "00 HO 250-500 (3)",
      "00 HO 250-500 (8)",
      "00 HO 500-1K (8)",
      "00 OM 250-500 (7)",
      "00 OM 500-1K (7)",
      "00 OM5 250-500 (5)",
      "00 OM5 250-500 (6)",
      "00 OM5 250-500 (8)",
      "00 OM5 500-1K (5)",
      "00 OM5 500-1K (6)",
      "00 OM5 500-1K (8)",
      "01 HO 1K-2K (5)",
      "01 HO 1K-2K (8)",
      "01 OM 1K-2K (7)",
      "01 OM5 1K-2K (5)",
      "01 OM5 1K-2K (6)",
      "01 OM5 1K-2K (8)",
      "02 HO 2K-4K (8)",
      "02 HO 3K-6K (7)",
      "02 OM 2K-4K (7)",
      "02 OM 3K-6K (6)",
      "02 OM5 2K-4K (5)",
      "02 OM5 2K-4K (6)",
      "02 OM5 2K-4K (8)",
      "02 OM5 3K-6K (5)",
      "02 OM5 3K-6K (7)",
      "03 HO 5K-10K (8)",
      "03 OM 5K-10K (7)",
      "03 OM 5K-10K (8)",
      "03 OM5 5K-10K (5)",
      "03 OM5 5K-10K (6)",
      "03 OM5 5K-10K (8)",
      "04 HO 10K-10K (8)",
      "04 HO 10K-20K (8)",
      "04 OM 10K-10K (7)",
      "04 OM 10K-20K (7)",
      "04 OM 10K-20K (8)",
      "04 OM5 10K-10K (5)",
      "04 OM5 10K-10K (6)",
      "04 OM5 10K-20K (5)",
      "04 OM5 10K-20K (6)",
      "05 HO 15K-15K (8)",
      "05 HO 15K-30K (8)",
      "05 OM 15K-15K (7)",
      "05 OM 15K-30K (7)",
      "05 OM5 15K-15K (5)",
      "05 OM5 15K-15K (6)",
      "05 OM5 15K-30K (5)",
      "05 OM5 15K-30K (6)",
      "06 HO 20K-20K (8)",
      "06 HO 20K-40K (8)",
      "06 OM 20K-20K (7)",
      "06 OM 20K-40K (7)",
      "06 OM5 20K-20K (5)",
      "06 OM5 20K-20K (6)",
      "06 OM5 20K-40K (5)",
      "06 OM5 20K-40K (6)",
      "07 HO 25K-25K (8)",
      "07 HO 25K-50K (8)",
      "07 OM 25K-25K (7)",
      "07 OM 25K-50K (7)",
      "07 OM 25K-50K (8)",
      "07 OM5 25K-25K (5)",
      "07 OM5 25K-25K (6)",
      "07 OM5 25K-50K (5)",
      "07 OM5 25K-50K (6)",
      "08 HO 50K-100K (8) - VIP",
      "08 HO 50K-50K (8) - VIP",
      "08 OM 50K-100K (7) - VIP",
      "08 OM 50K-50K (7) - VIP",
      "08 OM5 50K-100K (6) - VIP",
      "08 OM5 50K-50K (6) - VIP",
      "09 HO 100K-100K (8) - VIP",
      "09 HO 100K-200K (8) - VIP",
      "09 OM 100K-100K (7) - VIP",
      "09 OM 100K-200K (7) - VIP",
      "09 OM5 100K-100K (6) - VIP",
      "09 OM5 100K-200K (6) - VIP",
      "10 HO 200K-200K (8) - VIP",
      "10 HO 200K-400K (8) - VIP",
      "10 OM 200K-200K (7) - VIP",
      "10 OM 200K-400K (7) - VIP",
      "10 OM5 200K-200K (6) - VIP",
      "10 OM5 200K-400K (6) - VIP",
      "11 HO 250K-500K (8) - Royal",
      "11 OM 250K-500K (7) - Royal",
      "11 OM5 250K-500K (6) - Royal",
      "12 HO 500K-1M (8) - Royal",
      "12 HO 500K-500K (8) - Royal",
      "12 OM 500K-1M (7) - Royal",
      "12 OM 500K-500K (7) - Royal",
      "12 OM5 500K-1M (6) - Royal",
      "12 OM5 500K-500K (6) - Royal",
    ],
    Seats: [
      4, 8, 8, 7, 7, 5, 6, 8, 5, 6, 8, 5, 8, 7, 5, 6, 8, 8, 7, 7, 6, 5, 6, 8, 5,
      7, 8, 7, 8, 5, 6, 8, 8, 8, 7, 7, 8, 5, 6, 5, 6, 8, 8, 7, 7, 5, 6, 5, 6, 8,
      8, 7, 7, 5, 6, 5, 6, 8, 8, 7, 7, 8, 5, 6, 5, 6, 8, 8, 7, 7, 6, 6, 8, 8, 7,
      7, 6, 6, 8, 8, 7, 7, 6, 6, 8, 7, 6, 8, 8, 7, 7, 6, 6,
    ],
  };
  var _sortData = [];
  {
    Array.apply(0, Array(_data.RingGames)).map(function (x, i) {
      if (
        _data.Status[i].indexOf("Waiting: 1/") > -1 ||
        _data.Status[i].indexOf("Playing") > -1
      ) {
        var _p = _data.Status[i].split(": ")[1].split("/")[0];
        var strColor = "#cbff2c";
        if (_data.Name[i].split(" ")[0] == "12") {
          strColor = "#395400";
        }
        if (_data.Name[i].split(" ")[0] == "11") {
          strColor = "#395400";
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
        _sortData.push({
          name: _data.Name[i],
          color: strColor,
          status: _p + "/" + _data.Seats[i],
          stack: _data.SmallBlind[i] + _data.BigBlind[i],
        });
      }
    });
  }
  _sortData.sort((a, b) => (a.stack < b.stack ? 1 : -1));
  const [data, setData] = useState(_data);

  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await publicGetService("vip");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //handleGetReports();
  }, []);
  var totalReward = 0;
  if (loading) {
    return <MenuLoader />;
  } else {
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
          {_sortData.map(function (x, i) {
            return (
              <List.Item
                key={i}
                id={"lvl" + (i + 1)}
                style={{ color: x.color }}
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
  }
};

export default LevelList;
