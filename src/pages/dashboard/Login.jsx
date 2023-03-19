import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserService, getPokerSession } from "../../services/auth";
import { checkBlock } from "../../services/httpService";
import PWAPrompt from "react-ios-pwa-prompt";
import Tour from "../../Tour";
import {
  Grid,
  Image,
  Button,
  Container,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
  Segment,
  Label,
} from "semantic-ui-react";
import {
  gameData,
  gameDataMain,
  gameDataMainCode,
  getEvent,
  dayOfTournament,
  levelDataInfo,
} from "../../const";
import GalaxyIcon from "../../utils/svganim";
import GameBox from "../../utils/GameBox";
import ConfettiArea from "../../utils/party";
import ConfettiClick from "../../utils/partyclick";
import Noty from "./noti";
import Index from "./index";
import ShowTimeLeft from "../../utils/showTimeLeft";
import $ from "jquery";

const Dashboard = (prop) => {
  return <>hi</>;
};

export default Dashboard;
