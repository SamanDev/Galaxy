import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import { doCurrency, levelDataInfo } from "../../const";
import $ from "jquery";
import GiftsDesc from "../../utils/GiftsDesc";
import AddCalendar from "../../utils/AddCalendar";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/partymenu";
import Moment from "react-moment";
import LevelIcon from "../../utils/svg";

import LastRewardList from "./LastRewardList";
const LevelList = () => {
  return (
    <span className="myaccount popupmenu">
      <ConfettiArea recycle={false} numberOfPieces="50" />
      <List divided inverted verticalAlign="middle" className="myaccount">
        <List.Item>
          <List.Content className="rtl text-center">
            <div>
              <GalaxyIcon
                mode="gifts"
                level="1"
                text="Galaxy Gifts"
                classinside="iconinside0"
                number="1"
                width="60px"
                amin="inline animated swing fast"
                iconamin="swing inline animated"
              />
            </div>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className="rtl text-center">
            <GiftsDesc
              desc={
                <>
                  <div style={{ float: "right", margin: "0 10px" }}>
                    <LevelIcon
                      mode="gift3"
                      level="1"
                      text="Gold Gift"
                      classinside="iconinside0"
                      number="1"
                      width="60px"
                      amin="inline animated swing fast"
                      iconamin="swing inline animated"
                    />
                  </div>
                  <div
                    style={{
                      height: 80,
                      textAlign: "center",
                      lineHeight: "40px",
                    }}
                  >
                    مخصوص بازیکنان
                    <br /> لول 20 و بالاتر
                  </div>
                </>
              }
              subtitle={
                <>
                  <br />
                  از <span className="text-gold">500K</span> تا{" "}
                  <span className="text-gold">3M</span>
                </>
              }
              title={<>هدیه طلایی</>}
            />
            <GiftsDesc
              desc={
                <>
                  <div style={{ float: "right", margin: "0 10px" }}>
                    <LevelIcon
                      mode="gift2"
                      level="1"
                      text="Purple Gift"
                      classinside="iconinside0"
                      number="1"
                      width="60px"
                      amin="inline animated swing fast"
                      iconamin="swing inline animated"
                    />
                  </div>
                  <div
                    style={{
                      height: 80,
                      textAlign: "center",
                      lineHeight: "40px",
                    }}
                  >
                    مخصوص بازیکنان
                    <br /> لول 5 تا 20
                  </div>
                </>
              }
              subtitle={
                <>
                  <br />
                  از <span className="text-gold">100K</span> تا{" "}
                  <span className="text-gold">500K</span>
                </>
              }
              title={<>هدیه بنفش</>}
            />
            <GiftsDesc
              desc={
                <>
                  <div style={{ float: "right", margin: "0 10px" }}>
                    <LevelIcon
                      mode="gift1"
                      level="1"
                      text="Red Gift"
                      classinside="iconinside0"
                      number="1"
                      width="60px"
                      amin="inline animated swing fast"
                      iconamin="swing inline animated"
                    />
                  </div>
                  <div
                    style={{
                      height: 80,
                      textAlign: "center",
                      lineHeight: "40px",
                    }}
                  >
                    مخصوص بازیکنان
                    <br /> لول 5 و پایین تر
                  </div>
                </>
              }
              subtitle={
                <>
                  <br />
                  از <span className="text-gold">10K</span> تا{" "}
                  <span className="text-gold">100K</span>
                </>
              }
              title={<>هدیه قرمز</>}
            />
          </List.Content>
        </List.Item>
        <LastRewardList mode="gift" />
      </List>
    </span>
  );
};

export default LevelList;
