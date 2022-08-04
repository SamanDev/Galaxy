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
  Header,
} from "semantic-ui-react";
import LeagueResultLast from "./LeagueResultLast";
import { doCurrency, levelLeagueReward, levelLeagueList } from "../../const";
import LevelIcon from "../../utils/LevelIcon";
import MenuLoader from "../../utils/menuLoader";
import { publicGetService } from "../../services/public";
import LeagueUser from "./LeagueUser";
const LevelList = (prop) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await publicGetService("league");
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
    handleGetReports();
  }, []);
  var totalReward = 0;
  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <>
        <LeagueUser />
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem"></li>
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
        <LeagueResultLast />
      </>
    );
  }
};

export default LevelList;
