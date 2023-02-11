import React from "react";
import { Progress, Icon } from "semantic-ui-react";
import { levelData, levelDataInfo } from "../const";
const Balance = (prop) => {
  const loginToken = prop.loginToken;

  if (loginToken) {
    if (loginToken.glevel == 0) {
      loginToken.glevel = 1;
    }
    var lvlPercent = parseFloat(
      (loginToken.glevelSecond * 100) / (levelDataInfo[0].hoursLimit * 3600)
    ).toFixed(2);
    if (lvlPercent > 100) {
      lvlPercent = 100;
    }
    return (
      <>
        <Progress
          percent={prop.val ? prop.val : lvlPercent}
          disabled={prop.val ? true : false}
          inverted
          indicating
          size="tiny"
        />
        {!prop.val && <Icon as="small">%{lvlPercent}</Icon>}
        {prop.val == "0" && (
          <Icon as="small" className="text-muted" style={{ opacity: 0.5 }}>
            %0
          </Icon>
        )}
        {prop.val == "100" && <Icon name="check" color="green" />}
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
