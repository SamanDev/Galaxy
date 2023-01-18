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
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  var _defUserID = "";
  var _defUser = "";
  if (loginToken) {
    _defUserID = loginToken.id;
    _defUser = loginToken.username;
  }
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService(_defUserID, "", _defUser);
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
        <MenuLoader />
      </>
    );
  } else {
    return (
      <>
        <ul
          className="mm-listview menutitle-view"
          style={{ position: "relative", top: -10 }}
        >
          <li>
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
            <div style={{ paddingLeft: 15 }}>
              {data.map((x, i) => {
                totalReward += levelLeagueReward(i);
                var _lvl = 20 - i;
                var _text = x.username;

                return (
                  <div className={"rewardname"} mode={x.mode} key={i}>
                    <Reward item={x} color={true} />
                  </div>
                );
              })}
            </div>
          </li>
        </ul>
      </>
    );
  }
};

export default LevelList;
