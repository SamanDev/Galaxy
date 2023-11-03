import React, { useState, Suspense, lazy, useEffect } from "react";

import { useParams } from "react-router-dom";
import MenuLoader from "../../utils/menuLoader";
//import UserDash from "./UserDash";
import PushNot from "../../pushNot.component";
import Index from "./index";
//const Index = lazy(() => import("./index"));
const UserDash = lazy(() => import("./UserDash"));
import $ from "jquery";
const Dashboard = (prop) => {
  String.prototype.toPersianCharacter = function () {
    var string = this;

    var obj = {
      "١": "۱",
      "٢": "۲",
      "٣": "۳",
      "٤": "۴",
      "٥": "۵",
      "٦": "۶",
      "٧": "۷",
      "٨": "۸",
      "٩": "۹",
      "٠": "۰",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };

    Object.keys(obj).forEach(function (key) {
      string = string.replaceAll(obj[key], key);
    });
    return string;
  };
  localStorage.removeItem("tableName");

  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;

  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

  const [curPage, setCurPage] = useState("dashboard");
  const [isFull, setIsFull] = useState(false);

  const [screenOrientation, setScreenOrientation] = useState(
    screen?.orientation?.type
  );
  const handleFullscreen = (e) => {
    $(".framegame,body").removeClass("fullscreen");
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width,initial-scale=1,maximum-scale=1"
      );
    //prop.reportWindowSize();
  };
  const params = useParams();
  useEffect(() => {
    handleFullscreen();
  }, []);
  return (
    <>
      <div id="dashboard" className="mainsection">
        {loginToken?.accessToken && !loginToken?.logout ? (
          <>
            <Suspense fallback={<MenuLoader />}>
              <PushNot {...prop} />
              <UserDash loginToken={prop.loginToken} siteInfo={prop.siteInfo} />
            </Suspense>
          </>
        ) : (
          <>
            <div id="dashboard_section">
              <Suspense fallback={<MenuLoader />}>
                <Index {...prop} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
