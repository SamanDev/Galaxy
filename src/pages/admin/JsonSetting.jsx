import React, { useState, useEffect } from "react";

import { adminPutServiceList } from "../../services/admin";
import { Alert } from "../../utils/alerts";
import { isJson } from "../../const";
import { JsonEditor } from "react-jsondata-editor";
import { publicGetRules } from "../../services/admin";
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
function sordData(siteInfo) {
  var _siteInfo = siteInfo;
  _siteInfo.galaxyPassSet = _siteInfo.galaxyPassSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.levelUps = _siteInfo.levelUps.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.vipTables = _siteInfo.vipTables.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.dailyLeagueSet = _siteInfo.dailyLeagueSet.sort((a, b) =>
    a.id > b.id ? 1 : -1
  );
  _siteInfo.depositBonus = _siteInfo.depositBonus;
  return _siteInfo;
}
const useSiteInfo = (info) => {
  const [siteInfo, setSiteInfo] = useState(info);

  const handleCheckLogin = async () => {
    try {
      const res = await publicGetRules();
      if (res.status === 200) {
        if (isJson(res.data)) {
          var _data = res.data;

          setSiteInfo(_data);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleCheckLogin();
  }, []);

  return [siteInfo];
};
function Admin(prop) {
  String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, "g"), replacement);
  };

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
      string = string.replaceAll(key, obj[key]);
    });
    return string;
  };

  const [siteInfo] = useSiteInfo();

  if (!siteInfo?.galaxyPassSet) {
    return null;
  }
  let input = '{"Settings":' + JSON.stringify(sordData(siteInfo)) + "}";

  const saveObj = async (info) => {
    var _data = JSON.parse(info);
    var data = _data.Settings;

    try {
      const res = await adminPutServiceList(data, "editGalaxyRewardRules");
      if (res.status == 200) {
        Alert("Done", "", "success");
      } else {
        Alert("متاسفم...!", res.data.message, "error");
      }
    } catch (error) {
      Alert("متاسفم...!", "متاسفانه مشکلی از سمت سرور رخ داده", "error");
    }
  };

  return (
    <>
      <div
        className="reportTable"
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
      >
        <JsonEditor
          jsonObject={input}
          onChange={(output) => {
            saveObj(output);
          }}
        />
      </div>
    </>
  );
}

export default Admin;
