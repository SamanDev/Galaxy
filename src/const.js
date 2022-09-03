import React from "react";
import Accordion from "./pages/dashboard/Accordion";

import ActiveTable from "./pages/dashboard/ActiveTableJson";
import LastReward from "./pages/dashboard/LastReward";
import LevelList from "./pages/dashboard/Levels";
import PassList from "./pages/dashboard/GalaxyPass";
import Commission from "./pages/dashboard/Commission";
import VIP from "./pages/dashboard/VIP";
import TopPlayers from "./pages/dashboard/TopPlayers";
import KingOf from "./pages/dashboard/KingOf";
import League from "./pages/dashboard/League";
import Tournament from "./pages/dashboard/Tournament";
import Gift from "./pages/dashboard/Gifts";
import TopUsers from "./pages/dashboard/TopUsers";
import CashoutComponent from "./layouts/admin/forms/FormComponent.jsx";
import FormComponent from "./layouts/admin/forms/FormComponent.jsx";

const moment = require("moment");
export const levelDataInfo = [
  {
    name: "gPass",
    minLevel: 10,
    minBalance: 10000000,
    banOutHours: 48,
  },
  {
    name: "VIP",
    minLevel: 25,
    minBalance: 10000000,
    banOutHours: 24,
  },
  {
    name: "League",
    minLevel: 5,
    minBalance: 3000000,
    banOutHours: 12,
  },
  {
    name: "Tournament",
    minLevel: 4,
    minBalance: 1000000,
    banOutHours: 12,
  },
];

export const gameDataMain = "poker,bet,boom,backgammon".split(",");
export const gameDataMainCode = "poker,bet,boom,backgammon".split(",");
export const gameData =
  "blackjack3,blackjacks,roulette,roulette3D,baccarat,slotramses,slotfruits,jacksorbetter,deuceswild,wheeloffortune,slotarabian,highlow,slotsoccer,slotluckychristmas,caribbeanstud,slotspace".split(
    ","
  );

export const gameDataCode =
  "bj3,bj,r,r3,br,slr,slf,jb,dw,wf,sla,hl,sls,slc,st,slsp".split(",");
export const cashoutData = [
  {
    key: "Toman",
    getwaykey: "IranShetab",
    text: "تومان",
    value: "Toman",
    icon: "cc mastercard",
    limit: "100K - 50M",
  },

  {
    key: "BTC",
    getwaykey: "Bitcoin",
    text: "بیت کوین",
    value: "BTC",
    icon: "btc",
    limit: "$100 - $10K",
    bonus: "-2%",
  },
  {
    key: "USDT",
    getwaykey: "USDT",
    text: "USDT TRC20",
    value: "USDT",
    icon: "dollar",
    limit: "$100 - $10K",
    bonus: "-2%",
  },

  {
    key: "PerfectMoney",
    getwaykey: "PerfectMoney",
    text: "پرفکت مانی",
    value: "PerfectMoney",
    icon: "dollar",
    limit: "$100 - $10K",
    bonus: "-2%",
  },
];
export const depositDataActive = [];
export const cashoutDataActive = [];
export const depositData = [
  {
    key: "Online Cart to Cart",
    getwaykey: "IranShetab",
    text: "درگاه کارت به کارت",
    value: "Online Cart to Cart",
    icon: "cc mastercard",
    limit: "100K - 3M",
  },
  {
    key: "Cart to Cart",
    getwaykey: "CartToCart",
    text: "کارت به کارت",
    value: "Cart to Cart",
    icon: "mobile alternate",
    limit: "1M - 3M",
  },
  {
    key: "Bank Transfer",
    getwaykey: "BankTransfer",
    text: "انتقال بین بانکی",
    value: "Bank Transfer",
    icon: "exchange",
    limit: "5M - 50M",
    bonus: "+3%",
  },
  {
    key: "BTC",
    getwaykey: "Bitcoin",
    text: "بیت کوین",
    value: "BTC",
    icon: "btc",
    limit: "Unlimited",
    bonus: "+10%",
  },
  {
    key: "USDT",
    getwaykey: "USDT",
    text: "USDT TRC20",
    value: "USDT",
    icon: "dollar",
    limit: "Unlimited",
    bonus: "+5%",
  },

  {
    key: "VisaGiftCode",
    getwaykey: "VisaGiftCode",
    text: "ویزا گیفت کد",
    value: "VisaGiftCode",
    icon: "closed captioning outline",
    limit: "100K - 50M",
  },
  {
    key: "PerfectMoney",
    getwaykey: "PerfectMoney",
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
    label: "Admin",
    icon: "fas fa-users ",
    link: "/admin",
    idname: "admin",
  },

  {
    label: "بازی ها",
    title: "بازی ها",
    icon: "fas fa-receipt ",

    submenu: doGame(),
  },
  {
    label: "جوایز و پاداش ها ",
    title: "جوایز و پاداش ها ",
    icon: "fas fa-gift",
    aria: "garea",
    idname: "gifts",
    submenu: [
      {
        label: "پاداش لِوِل ها",
        title: "پاداش لِوِل ها",
        idname: "levels",
        icon: "fas fa-star yellow",
        aria: "giftsarea animated bounceIn delay-02s",
        icongalaxy: "levels",
        component: <LevelList />,
      },

      {
        label: "گلکسی پَس",
        title: "گلکسی پَس",

        idname: "gpass",
        bonus: "Level " + levelDataInfo[0].minLevel,
        icon: "fab fa-google yellow",
        icongalaxy: "gpass",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <PassList />,
      },
      {
        label: "VIP Table 25/50K",
        title: "VIP Table 25/50K",
        idname: "vip",

        bonus: "Level " + levelDataInfo[1].minLevel,
        icon: "fab fa-viacoin yellow",
        icongalaxy: "vip",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <VIP />,
      },
      {
        label: "لیگ روزانه",
        title: "لیگ روزانه",
        aria: "giftsarea animated bounceIn delay-02s",
        idname: "league",
        bonus: "Level " + levelDataInfo[2].minLevel,
        icon: "fas fa-medal yellow",
        icongalaxy: "league",
        component: <League />,
      },
      {
        label: "کمیسیون معرفی دوستان",
        title: "کمیسیون معرفی دوستان",
        idname: "commission",
        icongalaxy: "commission",
        icon: "fas fa-heart red",

        aria: "giftsarea animated bounceIn delay-02s",
        component: <Commission mode="commission" />,
      },
      {
        label: "ریک بک پوکر",
        title: "ریک بک پوکر",
        idname: "commission",
        icongalaxy: "rakeback",
        icon: "fas fa-heart red",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <Commission mode="rakeback" />,
      },

      {
        label: "تورنومنت ها",
        title: "تورنومنت ها",
        idname: "tournament",
        bonus: "Level " + levelDataInfo[3].minLevel,
        icon: "fab fa-viacoin yellow",
        icongalaxy: "tournament",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <Tournament />,
      },
      {
        label: "هدایای گلکسی",
        title: "هدایای گلکسی",
        idname: "giftarea",

        icon: "fab fa-viacoin yellow",
        icongalaxy: "gifts",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <Gift />,
      },
      {
        label: "برترین بازیکنان",
        title: "برترین بازیکنان",
        idname: "topplayer",

        icon: "fab fa-viacoin yellow",
        icongalaxy: "topplayer",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <TopPlayers />,
      },
      {
        label: "پادشاهان تورنومنت",
        title: "پادشاهان تورنومنت",
        idname: "topplayer",

        icon: "fab fa-viacoin yellow",
        icongalaxy: "kingof",
        aria: "giftsarea animated bounceIn delay-02s",
        component: <KingOf />,
      },
    ],
  },
  {
    label: "صندوق",
    title: "صندوق",
    aria: "cashierarea",
    icon: "fas fa-dollar ",
    submenu: [
      {
        label: "خرید چیپ",
        title: "خرید چیپ",
        icon: "fas fa-plus text-danger",
        idname: "deposit",
        aria: "giftsarea animated bounceIn delay-02s",
        icongalaxy: "deposit",
        submenu: doDeposit(),
      },
      {
        label: "برداشت",
        title: "برداشت",
        aria: "giftsarea animated bounceIn delay-02s",
        icon: "fas fa-dollar text-gold",
        icongalaxy: "cashout",
        submenu: doCashout(),
      },
      {
        label: "انتقال",
        title: "انتقال",
        idname: "login",
        getwaykey: "Transfer",
        icon: "fas fa-exchange-alt",
        icongalaxy: "topplayer",
        aria: "giftsarea animated bounceIn delay-02s",
        component: (
          <FormComponent
            mode="transfer"
            size="mini"
            labelcolor="orange"
            gateway=""
          />
        ),
      },
      {
        label: "تراکنش های مالی",
        title: "تراکنش های مالی",
        aria: "giftsarea animated bounceIn delay-02s",
        icon: "fas fa-stream text-muted",
        idname: "login",
        component: <CashoutComponent cashMode="Report" />,
      },
    ],
  },

  {
    label: "دعوت دوستان و کسب درآمد",
    title: "دعوت دوستان و کسب درآمد",
    icon: "fas fa-heart red",

    idname: "login invite",
    submenu: [
      {
        icon: "fas fa-plus",
        idname: "login register",
        component: (
          <CashoutComponent cashMode="Invite" size="mini" labelcolor="orange" />
        ),
      },
    ],
  },

  {
    label: "پشتیبانی",
    title: "پشتیبانی",
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
    label: "حساب کاربری",
    title: "حساب کاربری",
    icon: "fas fa-user ",
    idname: "login",
    link: "/logout",
    submenu: [
      {
        label: "کارت های بانکی",
        title: "ثبت کارت  بانکی",
        idname: "addcart",
        icon: "fas fa-plus text-danger",
        component: <CashoutComponent cashMode="addCart" />,
      },
      {
        label: "تغییر رمز عبور",
        title: "تغییر رمز عبور",
        icon: "fas fa-lock",
        component: <CashoutComponent cashMode="ChangePass" />,
      },
    ],
  },
  {
    label: "خروج",
    icon: "fas icon sign-out alternate ",
    link: "/logout",
  },
];
export const panelData = [
  {
    label: "panel",
    title: "میز های فعال",

    component: <ActiveTable title="میز های فعال" />,
  },
  {
    label: "panel",
    title: "آخرین پاداش ها",

    component: <LastReward title="آخرین پاداش ها" />,
  },
];
function doGame() {
  var _games = [];

  gameDataMain.map((game, i) =>
    _games.push({
      label: game,
      idname: "login",
      textclass: "nof",
      image: gameDataMainCode[i],
    })
  );
  gameData.map((game, i) =>
    _games.push({
      label: game,
      idname: "login",
      textclass: "nof",
      image: gameDataCode[i],
    })
  );

  return _games;
}

function doDeposit() {
  var _games = [];

  {
    depositData.map((game) => {
      depositDataActive.push(game);
      _games.push({
        label: game.text + " ",
        title: game.text,
        helper: game.limit,
        getwaykey: game.getwaykey,
        bonus: game.bonus,
        icon: game.icon,
        idname: "login Deposit" + game.value,
        component: (
          <FormComponent
            mode="deposit"
            size="mini"
            labelcolor="orange"
            gateway={game.value}
            getwaykey={game.getwaykey}
          />
        ),
      });
    });
  }

  return _games;
}
function doCashout() {
  var _games = [];

  {
    cashoutData.map((game) => {
      cashoutDataActive.push(game);
      _games.push({
        label: game.text,
        title: game.text,
        helper: game.limit,
        getwaykey: game.getwaykey,
        bonus: game.bonus,
        icon: game.icon,
        idname: "login Cashout" + game.value,
        component: (
          <FormComponent
            mode="cashout"
            size="mini"
            labelcolor="orange"
            gateway={game.value}
            getwaykey={game.getwaykey}
          />
        ),
      });
    });
  }
  return _games;
}

export const doCurrency = (value) => {
  return value?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
export const dayOfTournament = 5;
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
    _class = _class + " iconinside2";
  } else if (lvl >= 30) {
    _class = _class + " iconinside1";
  } else {
    _class = _class + " iconinside0";
  }
  return _class;
};
export const levelClassInside = (lvl) => {
  var _class = "iconinside0";

  if (lvl >= 60) {
    _class = "iconinside2";
  } else if (lvl >= 30) {
    _class = "iconinside1";
  }
  return _class;
};
export const levelRewardPercent = (lvl) => {
  if (lvl <= 30) {
    return lvl + 10;
  } else if (lvl <= 34) {
    return 40;
  } else if (lvl <= 39) {
    return 41;
  } else if (lvl <= 44) {
    return 42;
  } else if (lvl <= 49) {
    return 43;
  } else if (lvl <= 54) {
    return 44;
  } else if (lvl <= 59) {
    return 45;
  } else if (lvl <= 64) {
    return 46;
  } else if (lvl <= 69) {
    return 47;
  } else if (lvl <= 74) {
    return 48;
  } else if (lvl <= 79) {
    return 49;
  } else {
    return 50;
  }
};
export const levelPercent = (lvl) => {
  if (lvl <= 9) {
    return 5;
  } else if (lvl <= 19) {
    return 4;
  } else if (lvl <= 29) {
    return 3;
  } else if (lvl <= 39) {
    return 2;
  } else {
    return 1;
  }
};
export const getEvent = () => {
  var now = moment().format("YYYYMMDDTHHmmss");
  var nowDay = moment(now).date();
  var friDay = moment(now).day();

  if (nowDay <= 15) {
    return "GPass";
  } else if (nowDay <= 23) {
    return "VIP";
  } else {
    return "League";
  }
};
export const haveAdmin = (userTags) => {
  var isAdmin = false;
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.name == "ROLE_ADMIN") {
        isAdmin = true;
      }
    });
  }

  return isAdmin;
};
export const haveModerator = (userTags) => {
  var isAdmin = false;
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.name == "ROLE_MODERATOR") {
        isAdmin = true;
      }
    });
  }

  return isAdmin;
};
export const isJson = (item) => {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
};
export const levelData = [
  {
    level: 1,
    reward: 1000,
    commission: 10,
    percent: 5,
    point: 20000,
  },
  {
    level: 2,
    reward: 5000,
    commission: 11,
    percent: 5,
    point: 100000,
  },
  {
    level: 3,
    reward: 15000,
    commission: 12,
    percent: 5,
    point: 300000,
  },
  {
    level: 4,
    reward: 30000,
    commission: 13,
    percent: 5,
    point: 600000,
  },
  {
    level: 5,
    reward: 50000,
    commission: 14,
    percent: 5,
    point: 1000000,
  },
  {
    level: 6,
    reward: 100000,
    commission: 15,
    percent: 5,
    point: 2000000,
  },
  {
    level: 7,
    reward: 200000,
    commission: 16,
    percent: 5,
    point: 4000000,
  },
  {
    level: 8,
    reward: 300000,
    commission: 17,
    percent: 5,
    point: 6000000,
  },
  {
    level: 9,
    reward: 400000,
    commission: 18,
    percent: 5,
    point: 8000000,
  },
  {
    level: 10,
    reward: 500000,
    commission: 19,
    percent: 5,
    point: 10000000,
  },
  {
    level: 11,
    reward: 600000,
    commission: 20,
    percent: 4,
    point: 15000000,
  },
  {
    level: 12,
    reward: 700000,
    commission: 21,
    percent: 4,
    point: 17500000,
  },
  {
    level: 13,
    reward: 800000,
    commission: 22,
    percent: 4,
    point: 20000000,
  },
  {
    level: 14,
    reward: 900000,
    commission: 23,
    percent: 4,
    point: 22500000,
  },
  {
    level: 15,
    reward: 1000000,
    commission: 24,
    percent: 4,
    point: 25000000,
  },
  {
    level: 16,
    reward: 1200000,
    commission: 25,
    percent: 4,
    point: 30000000,
  },
  {
    level: 17,
    reward: 1400000,
    commission: 26,
    percent: 4,
    point: 35000000,
  },
  {
    level: 18,
    reward: 1600000,
    commission: 27,
    percent: 4,
    point: 40000000,
  },
  {
    level: 19,
    reward: 1800000,
    commission: 28,
    percent: 4,
    point: 45000000,
  },
  {
    level: 20,
    reward: 2000000,
    commission: 29,
    percent: 4,
    point: 50000000,
  },
  {
    level: 21,
    reward: 2500000,
    commission: 30,
    percent: 3,
    point: 83333333,
  },
  {
    level: 22,
    reward: 3000000,
    commission: 31,
    percent: 3,
    point: 100000000,
  },
  {
    level: 23,
    reward: 3500000,
    commission: 32,
    percent: 3,
    point: 116666666,
  },
  {
    level: 24,
    reward: 4000000,
    commission: 33,
    percent: 3,
    point: 133333333,
  },
  {
    level: 25,
    reward: 4500000,
    commission: 34,
    percent: 3,
    point: 150000000,
  },
  {
    level: 26,
    reward: 5000000,
    commission: 35,
    percent: 3,
    point: 166666666,
  },
  {
    level: 27,
    reward: 6000000,
    commission: 36,
    percent: 3,
    point: 200000000,
  },
  {
    level: 28,
    reward: 7000000,
    commission: 37,
    percent: 3,
    point: 233333333,
  },
  {
    level: 29,
    reward: 8000000,
    commission: 38,
    percent: 3,
    point: 266666666,
  },
  {
    level: 30,
    reward: 10000000,
    commission: 39,
    percent: 3,
    point: 333333333,
  },
  {
    level: 31,
    reward: 12000000,
    commission: 40,
    percent: 2,
    point: 600000000,
  },
  {
    level: 32,
    reward: 14000000,
    commission: 41,
    percent: 2,
    point: 700000000,
  },
  {
    level: 33,
    reward: 16000000,
    commission: 42,
    percent: 2,
    point: 800000000,
  },
  {
    level: 34,
    reward: 18000000,
    commission: 43,
    percent: 2,
    point: 900000000,
  },
  {
    level: 35,
    reward: 20000000,
    commission: 44,
    percent: 2,
    point: 1000000000,
  },
  {
    level: 36,
    reward: 22000000,
    commission: 45,
    percent: 2,
    point: 1100000000,
  },
  {
    level: 37,
    reward: 24000000,
    commission: 45,
    percent: 2,
    point: 1200000000,
  },
  {
    level: 38,
    reward: 26000000,
    commission: 45,
    percent: 2,
    point: 1300000000,
  },
  {
    level: 39,
    reward: 28000000,
    commission: 45,
    percent: 2,
    point: 1400000000,
  },
  {
    level: 40,
    reward: 30000000,
    commission: 45,
    percent: 2,
    point: 1500000000,
  },
  {
    level: 41,
    reward: 32000000,
    commission: 45,
    percent: 1,
    point: 3200000000,
  },
  {
    level: 42,
    reward: 34000000,
    commission: 45,
    percent: 1,
    point: 3400000000,
  },
  {
    level: 43,
    reward: 36000000,
    commission: 45,
    percent: 1,
    point: 3600000000,
  },
  {
    level: 44,
    reward: 38000000,
    commission: 45,
    percent: 1,
    point: 3800000000,
  },
  {
    level: 45,
    reward: 40000000,
    commission: 45,
    percent: 1,
    point: 4000000000,
  },
  {
    level: 46,
    reward: 42000000,
    commission: 45,
    percent: 1,
    point: 4200000000,
  },
  {
    level: 47,
    reward: 44000000,
    commission: 45,
    percent: 1,
    point: 4400000000,
  },
  {
    level: 48,
    reward: 46000000,
    commission: 45,
    percent: 1,
    point: 4600000000,
  },
  {
    level: 49,
    reward: 48000000,
    commission: 45,
    percent: 1,
    point: 4800000000,
  },
  {
    level: 50,
    reward: 50000000,
    commission: 45,
    percent: 1,
    point: 5000000000,
  },
  {
    level: 51,
    reward: 52000000,
    commission: 45,
    percent: 1,
    point: 5200000000,
  },
  {
    level: 52,
    reward: 54000000,
    commission: 45,
    percent: 1,
    point: 5400000000,
  },
  {
    level: 53,
    reward: 56000000,
    commission: 45,
    percent: 1,
    point: 5600000000,
  },
  {
    level: 54,
    reward: 58000000,
    commission: 45,
    percent: 1,
    point: 5800000000,
  },
  {
    level: 55,
    reward: 60000000,
    commission: 45,
    percent: 1,
    point: 6000000000,
  },
  {
    level: 56,
    reward: 62000000,
    commission: 45,
    percent: 1,
    point: 6200000000,
  },
  {
    level: 57,
    reward: 64000000,
    commission: 45,
    percent: 1,
    point: 6400000000,
  },
  {
    level: 58,
    reward: 66000000,
    commission: 45,
    percent: 1,
    point: 6600000000,
  },
  {
    level: 59,
    reward: 68000000,
    commission: 45,
    percent: 1,
    point: 6800000000,
  },
  {
    level: 60,
    reward: 70000000,
    commission: 45,
    percent: 1,
    point: 7000000000,
  },
  {
    level: 61,
    reward: 72000000,
    commission: 50,
    percent: 1,
    point: 7200000000,
  },
  {
    level: 62,
    reward: 74000000,
    commission: 50,
    percent: 1,
    point: 7400000000,
  },
  {
    level: 63,
    reward: 76000000,
    commission: 50,
    percent: 1,
    point: 7600000000,
  },
  {
    level: 64,
    reward: 78000000,
    commission: 50,
    percent: 1,
    point: 7800000000,
  },
  {
    level: 65,
    reward: 80000000,
    commission: 50,
    percent: 1,
    point: 8000000000,
  },
  {
    level: 66,
    reward: 82000000,
    commission: 50,
    percent: 1,
    point: 8200000000,
  },
  {
    level: 67,
    reward: 84000000,
    commission: 50,
    percent: 1,
    point: 8400000000,
  },
  {
    level: 68,
    reward: 86000000,
    commission: 50,
    percent: 1,
    point: 8600000000,
  },
  {
    level: 69,
    reward: 88000000,
    commission: 50,
    percent: 1,
    point: 8800000000,
  },
  {
    level: 70,
    reward: 90000000,
    commission: 50,
    percent: 1,
    point: 9000000000,
  },
  {
    level: 71,
    reward: 92000000,
    commission: 50,
    percent: 1,
    point: 9200000000,
  },
  {
    level: 72,
    reward: 94000000,
    commission: 50,
    percent: 1,
    point: 9400000000,
  },
  {
    level: 73,
    reward: 96000000,
    commission: 50,
    percent: 1,
    point: 9600000000,
  },
  {
    level: 74,
    reward: 98000000,
    commission: 50,
    percent: 1,
    point: 9800000000,
  },
  {
    level: 75,
    reward: 100000000,
    commission: 50,
    percent: 1,
    point: 10000000000,
  },
  {
    level: 76,
    reward: 102000000,
    commission: 50,
    percent: 1,
    point: 10200000000,
  },
  {
    level: 77,
    reward: 104000000,
    commission: 50,
    percent: 1,
    point: 10400000000,
  },
  {
    level: 78,
    reward: 106000000,
    commission: 50,
    percent: 1,
    point: 10600000000,
  },
  {
    level: 79,
    reward: 108000000,
    commission: 50,
    percent: 1,
    point: 10800000000,
  },
  {
    level: 80,
    reward: 110000000,
    commission: 50,
    percent: 1,
    point: 11000000000,
  },
  {
    level: 81,
    reward: 112000000,
    commission: 50,
    percent: 1,
    point: 11200000000,
  },
  {
    level: 82,
    reward: 114000000,
    commission: 50,
    percent: 1,
    point: 11400000000,
  },
  {
    level: 83,
    reward: 116000000,
    commission: 50,
    percent: 1,
    point: 11600000000,
  },
  {
    level: 84,
    reward: 118000000,
    commission: 50,
    percent: 1,
    point: 11800000000,
  },
  {
    level: 85,
    reward: 120000000,
    commission: 50,
    percent: 1,
    point: 12000000000,
  },
  {
    level: 86,
    reward: 122000000,
    commission: 50,
    percent: 1,
    point: 12200000000,
  },
  {
    level: 87,
    reward: 124000000,
    commission: 50,
    percent: 1,
    point: 12400000000,
  },
  {
    level: 88,
    reward: 126000000,
    commission: 50,
    percent: 1,
    point: 12600000000,
  },
  {
    level: 89,
    reward: 128000000,
    commission: 50,
    percent: 1,
    point: 12800000000,
  },
  {
    level: 90,
    reward: 130000000,
    commission: 50,
    percent: 1,
    point: 13000000000,
  },
];
