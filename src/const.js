import React from "react";
import ProductTable from "./pages/dashboard/ProductTable";
import Table from "./pages/dashboard/Table";
import Accordion from "./pages/dashboard/Accordion";
import Invite from "./pages/dashboard/Invite";
import InviteLink from "./pages/dashboard/InviteLink";
import ActiveTable from "./pages/dashboard/ActiveTable";
import LevelList from "./pages/dashboard/Levels";
import PassList from "./pages/dashboard/GalaxyPass";
import VIP from "./pages/dashboard/VIP";
import League from "./pages/dashboard/League";
import UserList from "./pages/dashboard/Users";
import TopUsers from "./pages/dashboard/TopUsers";
import DepositComponent from "./layouts/admin/deposit/depositComponent.jsx";
import CashoutComponent from "./layouts/admin/cashout/cashoutComponent.jsx";

import { useNavigate } from "react-router-dom";

export const gameDataMain = "poker,backgammon,boom,bet".split(",");
export const gameDataMainCode = "p,b,c,bt".split(",");
export const gameData =
  "blackjack3,blackjacks,roulette,roulette3D,baccarat,slotramses,slotfruits,jacksorbetter,deuceswild,wheeloffortune,slotarabian,highlow,slotsoccer,slotluckychristmas,caribbeanstud,slotspace".split(
    ","
  );
export const gameDataCode =
  "bj3,bj,r,r3,br,slr,slf,jb,dw,wf,sla,hl,sls,slc,st,slsp".split(",");
export const cashoutData = [
  {
    key: "Toman",
    text: "تومان",
    value: "Toman",
    icon: "cc mastercard",
    limit: "100K - 50M",
  },

  {
    key: "Bitcoin",
    text: "بیت کوین",
    value: "Bitcoin",
    icon: "btc",
    limit: "$100 - $10K",
    bonus: "-2%",
  },
  {
    key: "USDT",
    text: "USDT Trc20",
    value: "USDT",
    icon: "dollar",
    limit: "$100 - $10K",
    bonus: "-2%",
  },

  {
    key: "PerfectMoney",
    text: "پرفکت مانی",
    value: "PerfectMoney",
    icon: "dollar",
    limit: "$100 - $10K",
    bonus: "-2%",
  },
];
export const depositData = [
  {
    key: "Online Cart to Cart",
    text: "درگاه کارت به کارت",
    value: "Online Cart to Cart",
    icon: "cc mastercard",
    limit: "100K - 3M",
  },
  {
    key: "Cart to Cart",
    text: "کارت به کارت",
    value: "Cart to Cart",
    icon: "mobile alternate",
    limit: "1M - 3M",
  },
  {
    key: "Bank Transfer",
    text: "انتقال بین بانکی",
    value: "Bank Transfer",
    icon: "exchange",
    limit: "5M - 50M",
    bonus: "+3%",
  },
  {
    key: "Bitcoin",
    text: "بیت کوین",
    value: "Bitcoin",
    icon: "btc",
    limit: "Unlimited",
    bonus: "+10%",
  },
  {
    key: "USDT",
    text: "USDT Trc20",
    value: "USDT",
    icon: "dollar",
    limit: "Unlimited",
    bonus: "+5%",
  },

  {
    key: "VisaGiftCode",
    text: "ویزا گیفت کد",
    value: "VisaGiftCode",
    icon: "closed captioning outline",
    limit: "100K - 50M",
  },
  {
    key: "PerfectMoney",
    text: "پرفکت مانی",
    value: "PerfectMoney",
    icon: "dollar",
    limit: "Unlimited",
    bonus: "+5%",
  },
];
export const menuData = [
  {
    label: "صفحه اصلی",
    icon: "fas fa-home ",
    link: "/",
  },
  {
    label: "بازی ها",
    icon: "fas fa-receipt ",
    idname: "login",
    submenu: doGame(),
  },

  {
    label: "صندوق",
    icon: "fas fa-dollar ",
    submenu: [
      {
        label: "خرید چیپ",
        icon: "fas fa-plus text-danger",
        idname: "login",
        submenu: doDeposit(),
      },
      {
        label: "برداشت",
        idname: "login",
        icon: "fas fa-dollar",
        submenu: doCashout(),
      },
      {
        label: "انتقال",
        title: "انتقال",
        idname: "login",
        icon: "fas fa-exchange-alt",
        component: <CashoutComponent cashMode="Transfer" />,
      },
      {
        label: "تراکنش های مالی",
        title: "تراکنش های مالی",
        icon: "fas fa-stream",
        idname: "login",
        component: <Table />,
      },
    ],
  },

  {
    label: "کمیسیون و کسب درآمد",
    icon: "fas fa-heart red",
    bonus: "40%",
    idname: "login",
    submenu: [
      {
        label: "کمیسیون",
        bonus: "21%",
        icon: "fas fa-heart",
        component: <ProductTable />,
      },
      {
        label: "ریک بک پوکر",
        bonus: "10%",
        icon: "fas fa-heart",
        component: <ProductTable />,
      },
      {
        label: "ساخت اکانت برای دوستان",
        title: "ساخت اکانت برای دوستان",
        icon: "fas fa-plus",
        idname: "register",
        component: <Invite title="ساخت اکانت برای دوستان" />,
      },
      {
        label: "دعوت دوستان با لینک اختصاصی",
        title: "دعوت دوستان با لینک اختصاصی",
        icon: "fas fa-link",
        idname: "invitelink",
        component: <InviteLink title="دعوت دوستان با لینک اختصاصی" />,
      },
    ],
  },
  {
    label: "جوایز و پاداش ها ",
    icon: "fas fa-gift yellow",
    idname: "gifts",
    submenu: [
      {
        label: "پاداش لِوِل ها",
        title: "پاداش لِوِل ها",
        idname: "levels",
        icon: "fas fa-star yellow",
        component: <LevelList />,
      },
      {
        label: "گلکسی پَس",

        idname: "gpass",
        bonus: "Level 10",
        icon: "fab fa-google yellow",
        submenu: [
          {
            label: "نتایج زنده",
            title: "نتایج زنده",
            icon: "fas fa-stream",
            component: <LevelList />,
          },
          {
            component: <PassList />,
          },
        ],
      },
      {
        label: "VIP 25/50K",
        idname: "vip",

        bonus: "Level 25",
        icon: "fab fa-viacoin yellow",
        submenu: [
          {
            component: <VIP />,
          },
        ],
      },
      {
        label: "لیگ روزانه",

        idname: "league",
        bonus: "Level 5",
        icon: "fas fa-medal yellow",
        submenu: [
          {
            label: "آخرین نتایج",
            icon: "fas fa-stream",
            component: <LevelList />,
          },
          {
            component: <League />,
          },
        ],
      },
    ],
  },
  {
    label: "پشتیبانی",
    icon: "fas fa-envelope-open-text",
    idname: "login support",
    submenu: [
      {
        label: "ثبت تیکت جدید",
        title: "ثبت تیکت جدید",
        icon: "fas fa-plus",

        component: <CashoutComponent cashMode="Ticket" />,
      },
      {
        component: <Accordion />,
      },
    ],
  },
  {
    label: "برترین بازیکنان",
    icon: "fas fa-users",
    submenu: [
      {
        component: <TopUsers />,
      },
    ],
  },
  {
    label: "حساب کاربری",
    icon: "fas fa-user ",
    idname: "login",
    submenu: [
      {
        label: "کارت های بانکی",
        title: "ثبت کارت  بانکی",

        icon: "fas fa-plus text-danger",
        component: (
          <CashoutComponent cashMode="addCart" title="کارت های بانکی" />
        ),
      },
      {
        label: "تغییر رمز عبور",
        title: "تغییر رمز عبور",
        icon: "fas fa-lock",
        component: (
          <CashoutComponent cashMode="ChangePass" title="تغییر رمز عبور" />
        ),
      },
    ],
  },
];
export const panelData = [
  {
    label: "panel",
    title: "میز های فعال",

    component: <ActiveTable title="میز های فعال" />,
  },
];
function doGame() {
  var _games = [];

  gameDataMain.map((game, i) =>
    _games.push({ label: game, textclass: "nof", image: gameDataMainCode[i] })
  );
  gameData.map((game, i) =>
    _games.push({ label: game, textclass: "nof", image: gameDataCode[i] })
  );

  return _games;
}
function doDeposit() {
  var _games = [];
  {
    depositData.map((game) =>
      _games.push({
        label: game.text,
        title: game.text,
        helper: game.limit,
        bonus: game.bonus,
        icon: game.icon,
        component: <DepositComponent depMode={game.value} />,
      })
    );
  }
  return _games;
}
function doCashout() {
  var _games = [];
  {
    cashoutData.map((game) =>
      _games.push({
        label: game.text,
        title: game.text,
        helper: game.limit,
        bonus: game.bonus,
        icon: game.icon,
        component: <CashoutComponent cashMode={game.value} />,
      })
    );
  }
  return _games;
}
export const doCurrency = (value) => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const gotopage = (too) => {
  alert();
};
export const levelList =
  "1,5,15,30,50,100,200,300,400,500,600,700,800,900,1000,1200,1400,1600,1800,2000,2500,3000,3500,4000,4500,5000,6000,7000,8000,10000".split(
    ","
  );
export const levelPassList =
  "500,1000,1000,2000,2500,3000,4000,5000,6000,7000,8000,10000,15000,20000,25000".split(
    ","
  );
export const levelLeagueList =
  "10000,8000,6000,5000,4000,3000,2000,1000,500,500,500,500,500,500,500,500,500,500,500,500".split(
    ","
  );
export const levelLeagueReward = (lvl) => {
  return levelLeagueList[lvl] * 1000;
};
export const levelPassReward = (lvl) => {
  return levelPassList[lvl] * 1000;
};
export const levelReward = (lvl) => {
  if (lvl < 30) {
    return levelList[lvl] * 1000;
  } else {
    return levelList[29] * 1000 + (lvl - 29) * 2000000;
  }
};
export const levelPassClass = (lvl) => {
  var _class = "lv" + ((lvl % 30) + 1);

  if (lvl >= 10) {
    _class = _class + " shad2";
  } else if (lvl >= 5) {
    _class = _class + " shad1";
  }
  return _class;
};
export const levelClass = (lvl) => {
  var _class = "lv" + ((lvl % 30) + 1);

  if (lvl >= 60) {
    _class = _class + " shad2";
  } else if (lvl >= 30) {
    _class = _class + " shad1";
  }
  return _class;
};
export const levelRewardPercent = (lvl) => {
  if (lvl <= 34) {
    return lvl + 10;
  } else if (lvl < 60) {
    return 45;
  } else {
    return 50;
  }
};
