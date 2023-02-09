import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LevelIcon from "../../utils/svg";
import { useLastReward } from "../../hook/userHook";
import { doCurrency, levelClassInside } from "../../const";
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
const sumOf = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.amount;
    return sum + _am;
  }, 0);
};

const RewardStat = (prop) => {
  const [lastReward] = useLastReward();
  const [statData, setstatData] = useState();
  const [totalRows, setTotalRows] = useState(sumOf(lastReward));

  useEffect(() => {
    var stat = [];
    if (lastReward.length > 0) {
      var _gmode = groupBy(lastReward, "mode");

      for (const property in _gmode) {
        var psum = sumOf(_gmode[property]);
        stat.push({
          title: property
            .toLocaleLowerCase()
            .replace("gift", "gifts")
            .replace("levels", "پاداش لِوِل ها")
            .replace("gpass", "گلکسی پَس")
            .replace("vip", "VIP Table")
            .replace("league", "لیگ روزانه")
            .replace("commission", "کمیسیون معرفی دوستان")
            .replace("rakeback", "ریک بک پوکر")
            .replace("gifts", "هدایای گلکسی")
            .replace("tournament", "تورنومنت ها"),
          mode: property.toLocaleLowerCase().replace("gift", "gifts"),
          sum: psum,
          count: _gmode[property].length,
        });
      }
      setTotalRows(sumOf(lastReward));
    }
    setstatData(stat);
  }, [lastReward]);

  return (
    <>
      <li className="menutitle mm-listitem">
        <span className="mm-listitem__text lh-lg">
          مجموع پاداش های این هفته
          <div className="text-gold">{doCurrency(totalRows)} تومان</div>
        </span>
      </li>
      <li>
        <div
          style={{
            paddingLeft: 15,
          }}
        >
          <>
            {statData?.map(function (bonus, i) {
              var _lvl = 1;

              return (
                <Grid
                  verticalAlign="middle"
                  divided="vertically"
                  inverted
                  padded="vertically"
                  key={i}
                  className="rewardname"
                  mode={bonus.mode}
                >
                  <Grid.Row>
                    <Grid.Column width={12} textAlign="right">
                      <div className="farsi rewardtext"> {bonus.title}</div>
                      <small
                        className="farsi text-right"
                        style={{ display: "block" }}
                      >
                        <span className="text-gold">
                          {doCurrency(bonus.sum)} تومان
                        </span>{" "}
                        پاداش
                        <br /> در {doCurrency(bonus.count)} رکورد
                      </small>
                    </Grid.Column>
                    <Grid.Column width={4} className="fadeout">
                      <div style={{ marginLeft: 10 }}>
                        <LevelIcon
                          level={_lvl}
                          text={""}
                          mode={bonus.mode}
                          classinside={levelClassInside(_lvl)}
                          number=""
                          width={bonus.mode == "gifts" ? "80px" : "70px"}
                        />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              );
            })}
          </>
        </div>
      </li>
    </>
  );
};

export default RewardStat;
