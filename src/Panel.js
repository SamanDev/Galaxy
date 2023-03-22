import React from "react";
import { List, Segment, Statistic, Button } from "semantic-ui-react";
import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import RewardStat from "./pages/dashboard/rewardStat";
import LastReward from "./pages/dashboard/LastRewardJson";
import { useLastReward } from "./hook/userHook";
import BonusArea from "./layouts/admin/bonus/index.jsx";
import $ from "jquery";
function RightPanel(prop) {
  const [lastReward] = useLastReward();
  //if (!prop.activePanel) return null;
  return (
    <div>
      <ul
        className="mm-listview panelhalf fadeoutend step1-1"
        style={{ overflow: "hidden" }}
      >
        <li className="menutitle mm-listitem" style={{ position: "relative" }}>
          <Segment
            basic
            style={{
              color: "#fff",
              position: "absolute",
              top: "50%",

              transform: "translateY(-50%)",
              right: 5,
              opacity: 1,
              padding: 0,
              cursor: "pointer",
            }}
            className="fullopenpanel"
            onClick={() => {
              prop.setActivePanel(!prop.activePanel);
              $(".picn").toggleClass("open");
            }}
          >
            <div id="nav-icon1" className="picn">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Segment>
          <span className="mm-listitem__text">میز های فعال</span>
        </li>
        <li style={{ overflow: "auto", height: "100%" }}>
          <ActiveTable {...prop} />
        </li>
      </ul>
      <ul
        className="mm-listview panelhalf fadeoutend  step1-3"
        style={{ overflow: "hidden" }}
      >
        <li className="menutitle mm-listitem">
          <span className="mm-listitem__text">آخرین پاداش ها</span>
        </li>
        <li
          style={{ overflow: "auto", height: "100%" }}
          onScroll={prop.bindLastReward}
        >
          <LastReward {...prop} lastReward={lastReward} />
        </li>
      </ul>
    </div>
  );
}

export default RightPanel;
