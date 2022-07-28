import React from "react";
import { Progress, Icon } from "semantic-ui-react";
import { levelData } from "../const";
const Balance = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  if (loginToken) {
    var _lvlFinal = levelData.filter((d) => d.level === loginToken.level);
    var lvlPercent = parseInt(
      (loginToken.levelPoint * 100) / _lvlFinal[0].point
    );
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
