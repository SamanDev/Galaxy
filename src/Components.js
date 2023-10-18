import React, { Suspense, lazy } from "react";
const LevelList = lazy(() => delayForDemo(import("./pages/dashboard/Levels")));
const GalaxyPass = lazy(() =>
  delayForDemo(import("./pages/dashboard/GalaxyPass"))
);
const Games = lazy(() => delayForDemo(import("./pages/dashboard/Games")));
import MenuLoader from "./utils/menuLoader";
const CashoutComponent = lazy(() =>
  delayForDemo(import("./layouts/admin/forms/FormComponent.jsx"))
);
const Gift = lazy(() => delayForDemo(import("./pages/dashboard/Gifts")));
const VIP = lazy(() => delayForDemo(import("./pages/dashboard/VIP")));

import Commission from "./pages/dashboard/Commission";
import League from "./pages/dashboard/League";
import Support from "./pages/dashboard/Support";
//import CashoutComponent from "./layouts/admin/forms/FormComponent.jsx";
import MyGift from "./pages/dashboard/MyGifts";
import TournamentComponent from "./pages/dashboard/TournamentCom";
import $ from "jquery";
function delayForDemo(promise) {
  $("#lazyarea").removeAttr("id");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      $("#reportWindowSize").trigger("click");
    }, 300);
  }).then(() => promise);
}
const CompGen = (prop) => {
  //if (prop.activeMenuOpen === false) return false;
  if (prop?.menu?.component == "levels") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <LevelList {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "gpass") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <GalaxyPass {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "games") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Games {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "gifts") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Gift {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "vip") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <VIP {...prop} />
      </Suspense>
    );
  } else if (prop?.menu?.component == "league") {
    return <League {...prop} />;
  } else if (prop?.menu?.component == "support") {
    return <Support {...prop} />;
  } else if (prop?.menu?.component == "mygifts") {
    return <MyGift {...prop} />;
  } else if (prop?.menu?.component == "tournament") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <TournamentComponent
          {...prop}
          cashMode={prop?.menu?.cashMode}
          mode={prop?.menu?.mode}
          gateway={prop?.menu?.gateway}
          getwaykey={prop?.menu?.getwaykey}
          labelcolor={prop?.menu?.labelcolor}
          size={prop?.menu?.size}
        />
      </Suspense>
    );
  } else if (prop?.menu?.component == "CashoutComponent") {
    return (
      <Suspense fallback={<MenuLoader />}>
        <CashoutComponent
          {...prop}
          cashMode={prop?.menu?.cashMode}
          mode={prop?.menu?.mode}
          gateway={prop?.menu?.gateway}
          getwaykey={prop?.menu?.getwaykey}
          labelcolor={prop?.menu?.labelcolor}
          size={prop?.menu?.size}
        />
      </Suspense>
    );
  } else if (
    prop?.menu?.component == "rakeback" ||
    prop?.menu?.component == "commission"
  ) {
    return (
      <Suspense fallback={<MenuLoader />}>
        <Commission mode={prop?.menu?.component} {...prop} />
      </Suspense>
    );
  } else {
    return <>{prop?.menu?.component}</>;
  }
};

export default CompGen;
