import React, { useEffect, useState } from "react";
import { Icon, List } from "semantic-ui-react";
import Reward from "../../utils/Reward";
import { levelLeagueReward } from "../../const";
import MenuLoader from "../../utils/menuLoader";
import { getRewardsService } from "../../services/reward";
import RewardStat from "./rewardStat";
import LazyLoad from "react-lazyload";
const LevelList = (prop) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetRewards = async () => {
    setLoading(true);
    try {
      const res = await getRewardsService("", prop.mode, "");
      if (res.status === 200) {
        setData(res.data.sort((a, b) => (a.date < b.date ? 1 : -1)));
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleGetRewards();
  }, []);
  var totalReward = 0;
  if (loading && data.length == 0) {
    return (
      <>
        <LazyLoad height={500} once throttle={30} overflow>
          <ul className="mm-listview">
            <li className="menutitle mm-listitem"></li>
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">آخرین جوایز</span>
            </li>
          </ul>
          <MenuLoader />
        </LazyLoad>
      </>
    );
  } else {
    return (
      <>
        <ul className="mm-listview ">
          <li className="menutitle mm-listitem"></li>
          <LazyLoad height={70} once throttle={30} overflow>
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">آخرین جوایز</span>
            </li>
          </LazyLoad>
          <LazyLoad height={250} once throttle={30} overflow>
            <div className={"animated fadeIn"}>
              <RewardStat lastReward={data} />
            </div>
          </LazyLoad>
        </ul>
        <List divided inverted verticalAlign="middle" className="myaccount">
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

          <div style={{ padding: "0 5px 0 20px" }}>
            {data.map((x, i) => {
              var _lvl = 20 - i;
              var _text = x.username;

              return (
                <LazyLoad height={98} once throttle={30} overflow key={i}>
                  <div className={"rewardname animated fadeIn"} mode={x.mode}>
                    <Reward item={x} {...prop} color={true} />
                  </div>
                </LazyLoad>
              );
            })}
          </div>
        </List>
      </>
    );
  }
};

export default LevelList;
