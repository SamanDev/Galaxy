import React from "react";
import { Progress, Icon } from "semantic-ui-react";
const Balance = (prop) => {
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var rules = siteInfo;
  if (loginToken?.accessToken && !loginToken?.logout) {
    if (loginToken.glevel == 0) {
      loginToken.glevel = 1;
    }

    var lvlPercent = parseFloat(
      (loginToken.giftPlaySecond * 100) / (rules.secondForGift)
    ).toFixed(2);
    if (lvlPercent > 100) {
      lvlPercent = 100;
    }
    if (prop.val == "0") {
      return null;
    }
    return (
      <>
        <Progress
          percent={prop.val ? prop.val : lvlPercent}
          disabled={prop.val ? true : false}
          inverted
          progress
          color="red"
          size="small"
        />
       
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
