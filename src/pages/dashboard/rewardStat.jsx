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
  const lastReward = prop.lastReward;
  const [statData, setstatData] = useState();
  const [totalRows, setTotalRows] = useState(sumOf(lastReward));

  useEffect(() => {
    var stat = [];
    if (lastReward.length > 0) {
      var _gmode = groupBy(lastReward, "mode");

      for (const property in _gmode) {
        var psum = sumOf(_gmode[property]);
        const propOwn = Object.getOwnPropertyNames(
          groupBy(_gmode[property], "username")
        );

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
          mode: property.toLocaleLowerCase().replace("gift", "gift3"),
          sum: psum,
          players: propOwn.length,
          count: _gmode[property].length,
        });
      }
      setTotalRows(sumOf(lastReward));
    }
    setstatData(stat);
  }, [lastReward]);

  return (
    <>
      {statData?.length > 1 && (
        <li className="menutitle mm-listitem">
          <span className="mm-listitem__text lh-lg">
            مجموع پاداش های این هفته
            <div className="text-gold">{doCurrency(totalRows)} تومان</div>
          </span>
        </li>
      )}
      <li>
        <div
          style={{
            paddingLeft: 15,
          }}
        >
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {statData?.map(function (bonus, i) {
                var _lvl = 1;

                return (
                  <div
                    key={i}
                    className={
                      i == 0 ? "carousel-item active" : "carousel-item"
                    }
                  >
                    <Grid
                      verticalAlign="middle"
                      divided="vertically"
                      inverted
                      padded="vertically"
                      className="rewardname"
                      mode={bonus.mode}
                    >
                      <Grid.Row style={{ height: 250 }} textAlign="center">
                        <Grid.Column textAlign="center">
                          <div
                            className="fadeout"
                            style={{
                              transform: "rotate(20deg)",
                              opacity: 1,
                              marginBottom: 20,
                            }}
                          >
                            <LevelIcon
                              level={_lvl}
                              text={"big"}
                              mode={bonus.mode}
                              classinside={levelClassInside(_lvl)}
                              number=""
                              width={bonus.mode == "gifts" ? "100px" : "80px"}
                            />
                          </div>
                          <div className="farsi rewardtext fw-bold text-center text-gold">
                            {bonus.title}
                          </div>
                          <small
                            className="farsi text-center"
                            style={{ display: "block" }}
                          >
                            <span className="text-gold">
                              {doCurrency(bonus.sum)} تومان
                            </span>{" "}
                            پاداش
                            <br /> پرداخت شده به {doCurrency(
                              bonus.players
                            )}{" "}
                            بازیکن
                            <br /> در {doCurrency(bonus.count)} رکورد
                          </small>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                );
              })}
            </div>
            {statData?.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default RewardStat;
