import React from "react";

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
