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
import Reward from "../../utils/Reward";
import { doCurrency, levelLeagueReward, levelLeagueList } from "../../const";
import LevelIcon from "../../utils/svg";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
const LevelList = (prop) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService("", "vip", "");
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
    handleGetRewards();
  }, []);
  var totalReward = 0;
  if (loading) {
    return (
      <>
        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
        <MenuLoader />
      </>
    );
  } else {
    return (
      <>
        <ul className="mm-listview menutitle-view">
          <li className="menutitle mm-listitem"></li>
          <li className="menutitle mm-listitem">
            <span className="mm-listitem__text">آخرین جوایز</span>
          </li>
        </ul>
        {data.length == 0 && !prop.pending && (
          <>
            <List.Item>
              <List.Content>
                <List.Description className="farsi text-center">
                  <Icon
                    circular
                    color="teal"
                    name="clipboard outline"
                    size="big"
                    inverted
                  />
                  <br />
                  <br />
                  هیچ رکوردی یافت نشد.
                </List.Description>
              </List.Content>
            </List.Item>
          </>
        )}
        {data.map((x, i) => {
          totalReward += levelLeagueReward(i);
          var _lvl = 20 - i;
          var _text = x.username;

          return (
            <>
              <Reward item={x} />
            </>
          );
        })}
      </>
    );
  }
};

export default LevelList;
