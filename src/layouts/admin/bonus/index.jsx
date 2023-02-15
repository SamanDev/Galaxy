import React from "react";
import { Divider, List } from "semantic-ui-react";
import Bonus from "./bonus";

const BonusArea = (prop) => {
  const loginToken = prop.loginToken;
  var _bonuses = loginToken.userGifts;

  _bonuses.sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div style={{ margin: "5px 0 5px 0" }} className="bonuslist fadeoutend">
      {_bonuses.length > 0 && (
        <>
          <List divided inverted verticalAlign="middle">
            {_bonuses.map(function (bonus, i) {
              if (i < 10) return <Bonus key={i} bonus={bonus} {...prop} />;
            })}
          </List>
          <Divider fitted />
        </>
      )}
    </div>
  );
};

export default BonusArea;
