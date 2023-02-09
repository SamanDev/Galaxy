import React from "react";

import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import RewardStat from "./pages/dashboard/rewardStat";
import LastReward from "./pages/dashboard/LastRewardJson";

function RightPanel(prop) {
  return (
    <>
      {prop.activePanel && (
        <>
          <ul className="mm-listview">
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">میز های فعال</span>
            </li>
            <li>
              <ActiveTable {...prop} />
            </li>
            <li className="menutitle mm-listitem"></li>
            <RewardStat />

            <li className="menutitle mm-listitem"></li>
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">آخرین پاداش ها</span>
            </li>
            <li>
              <LastReward {...prop} />
            </li>
          </ul>
        </>
      )}
    </>
  );
}

export default RightPanel;
