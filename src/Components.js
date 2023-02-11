import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import RightPanel from "./Panel";
import { Image, Modal } from "semantic-ui-react";
import {
  menuData,
  panelData,
  haveAdmin,
  haveModerator,
  getEvent,
  dayOfTournament,
  startServiceWorker,
} from "./const";
import { Link } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import { useUser } from "./hook/userHook";

import { useSiteInfo, useActiveTable, useLastReward } from "./hook/infoHook";
import $ from "jquery";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginArea from "./layouts/admin/auth/Login.jsx";
import RegisterArea from "./layouts/admin/auth/Register.jsx";
import ForgetArea from "./layouts/admin/auth/Forget";
import DCArea from "./layouts/admin/auth/dc.component";
import UserArea from "./layouts/admin/auth/user.component";
import GalaxyIcon from "./utils/svg";
import ConfettiArea from "./utils/partyclick";
import { Dimmer, Loader } from "semantic-ui-react";
import UserWebsocket from "./services/user.websocket";
import eventBus from "./services/eventBus";
import { cashierService } from "./services/cashier";
import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import RewardStat from "./pages/dashboard/rewardStat";
import LastReward from "./pages/dashboard/LastRewardJson";
import PWAPrompt from "react-ios-pwa-prompt";
import LevelList from "./pages/dashboard/Levels";
import GalaxyPass from "./pages/dashboard/GalaxyPass";
import Gift from "./pages/dashboard/Gifts";
import VIP from "./pages/dashboard/VIP";
import Commission from "./pages/dashboard/Commission";
import League from "./pages/dashboard/League";
import Support from "./pages/dashboard/Support";
import CashoutComponent from "./layouts/admin/forms/FormComponent.jsx";
const CompGen = (prop) => {
  if (prop.activeMenuOpen === false) return false;
  if (prop?.menu?.component == "levels") {
    return <LevelList {...prop} />;
  } else if (prop?.menu?.component == "gpass") {
    return <GalaxyPass {...prop} />;
  } else if (prop?.menu?.component == "gifts") {
    return <Gift {...prop} />;
  } else if (prop?.menu?.component == "vip") {
    return <VIP {...prop} />;
  } else if (prop?.menu?.component == "league") {
    return <League {...prop} />;
  } else if (prop?.menu?.component == "support") {
    return <Support {...prop} />;
  } else if (prop?.menu?.component == "CashoutComponent") {
    return (
      <CashoutComponent
        {...prop}
        cashMode={prop?.menu?.cashMode}
        mode={prop?.menu?.mode}
        gateway={prop?.menu?.gateway}
        getwaykey={prop?.menu?.getwaykey}
        labelcolor={prop?.menu?.labelcolor}
        size={prop?.menu?.size}
      />
    );
  } else if (
    prop?.menu?.component == "rakeback" ||
    prop?.menu?.component == "commission"
  ) {
    return <Commission mode={prop?.menu?.component} {...prop} />;
  } else {
    return <>{prop?.menu?.component}</>;
  }
};

export default CompGen;
