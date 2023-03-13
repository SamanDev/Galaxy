import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import RightPanel from "./Panel";
import { Image, Modal } from "semantic-ui-react";
import {
  GetMenu,
  haveAdmin,
  haveModerator,
  getEvent,
  dayOfTournament,
  startServiceWorker,
} from "./const";
import { Link } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import { useUser, useSiteInfo } from "./hook/userHook";

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
import ChildComp from "./Components";

function App(prop) {
  const [userProfile, setUserProfile] = useState("");
  const [userOpen, setUserOpen] = useState(false);

  return (
    <>
      <Modal
        basic
        size="tiny"
        className="myaccount   animated backInDown "
        onClose={() => {
          setUserOpen(false);
        }}
        onOpen={() => setUserOpen(true)}
        open={userOpen}
        closeIcon
      >
        <UserArea
          username={userProfile}
          {...prop}
          size="small"
          labelcolor="orange"
        />
      </Modal>
    </>
  );
}

export default App;
