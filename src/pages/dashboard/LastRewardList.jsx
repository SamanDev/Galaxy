import React, { useEffect, useState } from "react";
import { Icon, List } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import { levelLeagueReward } from "../../const";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
import RewardStat from "./rewardStat";
const LevelList = (prop) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService("", prop.mode, "");
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
        prop.bindLastReward();
      }
    } catch (error) {
      console.log(error.message);
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
          <RewardStat lastReward={data} />
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
                    <Reward item={x} {...prop} color={true} />
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
