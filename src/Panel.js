import React from "react";

import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import RewardStat from "./pages/dashboard/rewardStat";
import LastReward from "./pages/dashboard/LastRewardJson";
import { useLastReward } from "./hook/userHook";
import BonusArea from "./layouts/admin/bonus/index.jsx";
function RightPanel(prop) {
  const [lastReward] = useLastReward();
  //if (!prop.activePanel) return null;
  return (
    <>
      <ul className="mm-listview" style={{ overflow: "hidden" }}>
        <li className="menutitle mm-listitem">
          <span className="mm-listitem__text">میز های فعال</span>
        </li>
        <li>
          <ActiveTable {...prop} />
        </li>
        <li className="menutitle mm-listitem"></li>
        <RewardStat lastReward={lastReward} />

        <li className="menutitle mm-listitem"></li>
        <li className="menutitle mm-listitem">
          <span className="mm-listitem__text">آخرین پاداش ها</span>
        </li>
        <li>
          <LastReward {...prop} lastReward={lastReward} />
        </li>
      </ul>
    </>
  );
}

export default RightPanel;
