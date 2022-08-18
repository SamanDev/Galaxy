import React, { useState } from "react";
import {
  Icon,
  Item,
  Button,
  Header,
  Divider,
  Image,
  List,
  Grid,
} from "semantic-ui-react";
import LevelIcon from "../../utils/GalaxyIcon";
import Reward from "../../utils/Reward";
import { doCurrency, levelDataInfo } from "../../const";

import Status from "../../utils/Status";
import Moment from "react-moment";

import $ from "jquery";
const moment = require("moment");

var _bonuses = [
  {
    id: 4,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "commission",
    label: "کمیسیون",
    text: "Commission",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 6,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "gpass",
    label: "پاداش گلکسی پَس",
    text: "Level 4",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 5,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "rakeback",
    label: "ریک بک",
    text: "Rakeack",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 1,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "levels",
    label: "پاداش افزایش لٍوٍل",
    text: "Level 4",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 7,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "vip",
    label: "VIP Gift",
    text: "VIP Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 8,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "league",
    label: "لیگ روزانه",
    text: "Place 1",
    username: "HangOver",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift3",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 2,
    date: "2022-08-12T18:53:53.000+00:00",
    expireDate: "2022-08-12T23:54:03.000+00:00",
    mode: "bonus",
    label: "بوناس",
    text: "%5 Bonus",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 4,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "commission",
    label: "کمیسیون",
    text: "Commission",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 6,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "gpass",
    label: "پاداش گلکسی پَس",
    text: "Level 4",
    username: "m11001100mWW",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 5,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "rakeback",
    label: "ریک بک",
    text: "Rakeack",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1040000,
  },
  {
    id: 1,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "levels",
    label: "پاداش افزایش لٍوٍل",
    text: "Level 55",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 7,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "vip",
    label: "VIP Gift",
    text: "VIP Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 8,
    date: "2022-08-13T04:01:53.000+00:00",
    expireDate: "2023-08-12T23:54:03.000+00:00",
    mode: "league",
    label: "لیگ روزانه",
    text: "Place 20",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 3,
    date: "2022-08-13T18:53:53.000+00:00",
    expireDate: "2022-08-13T23:54:03.000+00:00",
    mode: "gift3",
    label: "هدیه",
    text: "Free Gift",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
  {
    id: 2,
    date: "2022-08-12T18:53:53.000+00:00",
    expireDate: "2022-08-12T23:54:03.000+00:00",
    mode: "bonus",
    label: "بوناس",
    text: "%5 Bonus",
    username: "coce",
    status: "Pending",
    received: false,
    amount: 1000000,
  },
];

const BonusArea = (prop) => {
  _bonuses.sort((a, b) => (a.id < b.id ? 1 : -1));
  return (
    <div style={{ paddingLeft: 20, marginBottom: 200 }}>
      {_bonuses.length > 0 && (
        <>
          {_bonuses.map(function (bonus, i) {
            return <Reward item={bonus} key={i} />;
          })}
        </>
      )}
    </div>
  );
};

export default BonusArea;
