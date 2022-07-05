import React from "react";
import ProductTable from "./pages/dashboard/ProductTable";
import Table from "./pages/dashboard/Table";
import Accordion from "./pages/dashboard/Accordion";
import LevelList from "./pages/dashboard/Levels";
import UserList from "./pages/dashboard/Users";
import DepositComponent from "./layouts/admin/deposit/depositComponent.jsx";
import CashoutComponent from "./layouts/admin/cashout/cashoutComponent.jsx";

export const gameData = "blackjack3,blackjacks,roulette,roulette3D,baccarat,slotramses,slotfruits,jacksorbetter,deuceswild,wheeloffortune,slotarabian,highlow,slotsoccer,slotluckychristmas,caribbeanstud,slotspace".split(
  ","
);
export const gameDataCode = "bj3,bj,r,r3,br,slr,slf,jb,dw,wf,sla,hl,sls,slc,st,slsp".split(
  ","
);
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
    label: "بازی ها",
    icon: "fas fa-receipt ",
    submenu: doGame(),
  },

  {
    label: "صندوق",
    icon: "fas fa-dollar ",
    submenu: [
      {
        label: "خرید چیپ",
        icon: "fas fa-plus text-danger",
        submenu: doDeposit(),
      },
      {
        label: "برداشت",
        icon: "fas fa-dollar",
        submenu: doCashout(),
      },
      {
        label: "انتقال",
        icon: "fas fa-exchange-alt",
        component: <CashoutComponent cashMode="Transfer" />,
      },
      {
        label: "تراکنش های مالی",
        icon: "fas fa-stream",
        component: <Table />,
      },
    ],
  },
  {
    label: "پشتیبانی",
    icon: "fas fa-envelope-open-text",
    submenu: [
      {
        label: "New Ticket",
        icon: "fas fa-plus",
        component: <CashoutComponent cashMode="Ticket" />,
      },
      {
        component: <Accordion />,
      },
    ],
  },
  {
    label: "کمیسیون و کسب درآمد",
    icon: "fas fa-heart  text-danger",
    bonus: "40%",
    submenu: [
      {
        label: "Commition",
        helper: "21%",
        icon: "fas fa-heart",
        component: <ProductTable />,
      },
      {
        label: "Rackback",
        helper: "10%",
        icon: "fas fa-heart",
        component: <ProductTable />,
      },
    ],
  },
  {
    label: "جوایز و پاداش ها ",
    icon: "fas fa-gift",
    submenu: [
      {
        label: "Level Rewards",

        icon: "fas fa-star",
        component: <LevelList />,
      },
      {
        label: "Rackback",
        helper: "10%",
        icon: "fas fa-heart",
        component: <ProductTable />,
      },
    ],
  },
  {
    label: "برترین بازیکنان",
    icon: "fas fa-users",
    submenu: [
      {
        component: <UserList />,
      },
    ],
  },
  {
    label: "حساب کاربری",
    icon: "fas fa-user ",
    submenu: [
      {
        label: "کارت های بانکی",
        icon: "fas fa-plus text-danger",
        component: <CashoutComponent cashMode="addCart" />,
      },
      {
        label: "تغییر رمز عبور",
        icon: "fas fa-lock",
        component: <CashoutComponent cashMode="Transfer" />,
      },
    ],
  },
];
function doGame() {
  var _games = [];

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
