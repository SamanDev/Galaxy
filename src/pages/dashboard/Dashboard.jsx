import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getPokerSession } from "../../services/auth";
import { Grid, Button, Container } from "semantic-ui-react";
import { gameData, gameDataMain, getEvent, dayOfTournament } from "../../const";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/party";
import ConfettiClick from "../../utils/partyclick";
import GameInbox from "./GameInbox";
import Index from "./index";
import ShowTimeLeft from "../../utils/showTimeLeft";
import $ from "jquery";
const moment = require("moment");
const config = {
  angle: "0",
  spread: "32",
  startVelocity: "20",
  elementCount: "200",
  dragFriction: "0.09",
  duration: "4090",
  stagger: "3",
  width: "9px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};
const mainnconfig = {
  angle: "229",
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: "20000",
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "743px",
  colors: ["#000", "#333", "#666"],
};
const pokerconfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#000", "#f00"],
};
var nowDay = moment().isoWeekday();
var dayMonth = moment().day();
var _day = moment().day(dayOfTournament);
var tourDay = moment(_day).date();
const Banner = (prop) => {
  return (
    <div className="banner">
      <Grid reversed="computer tablet">
        <Grid.Row>
          <Grid.Column
            mobile={16}
            tablet={8}
            computer={8}
            className="myaccount"
          >
            <div className="inline animated delay-1s fadeInLeft">
              <div className={"inline animated delay-2s " + prop.iconamin}>
                <GalaxyIcon
                  mode={prop.icon}
                  level={prop.number}
                  text="big"
                  className="bannericon"
                  classinside="iconinside2"
                  number={prop.number}
                  amin={"inline animated " + prop.amin}
                  width="12vw"
                  iconamin={"inline animated delay-2s " + prop.iconamin}
                />
              </div>
            </div>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8} textAlign="right">
            <div className="inline animated fadeInRight backInLeft delay-nims fast">
              <div className="inline animated flash delay-3s">
                {prop.showtime && prop.showtime}
                <h1 className="farsi">{prop.title}</h1>
              </div>
            </div>
            <div className="farsi text  animated fadeInRight fast delay-1s">
              {prop.text}
            </div>

            {prop.link && (
              <div className="animated delay-1s fadeInDown">
                <Button
                  className="farsi"
                  color="red"
                  style={{ background: "rgba(255,0,0,.3)" }}
                  onClick={() => {
                    prop.openPanel(prop.link);
                  }}
                >
                  اطلاعات بیشتر
                </Button>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

var _width = document.body.clientWidth;
var defslide = 1;

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
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();
  const loginToken = prop.loginToken;
  const siteInfo = prop.siteInfo;
  var _event = getEvent(siteInfo);
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var gpassrules = siteInfo?.galaxyPassSet[0];
  siteInfo?.vipTables?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var viprules = siteInfo?.vipTables[0];
  siteInfo?.dailyLeagueSet?.sort((a, b) => (a.id > b.id ? 1 : -1));
  var leaguerules = siteInfo?.dailyLeagueSet[0];
  var levelData = siteInfo?.levelUps;
  const [sessionKey, setSessionKey] = useState("");
  const handleManifest = async () => {
    if ($('[rel="manifest"]').length == 0) {
      let dd = window.location.protocol + "//" + window.location.host;
      let sUrl =
        dd +
        "/login/" +
        btoa(loginToken.username) +
        "/" +
        localStorage.getItem(btoa(loginToken.username));

      let manifest = {
        short_name: loginToken.username,
        name: loginToken.username,

        display: "fullscreen",
        theme_color: "#000000",
        orientation: "portrait",

        start_url: sUrl,
        scope: dd,
        id: sUrl,

        background_color: "#000000",
        icons: [
          {
            src: dd + "/maskable_icon_x192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "any",
          },

          {
            src: dd + "/maskable_icon_x512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any",
          },
        ],
        description:
          "معتبرترین و بهترین اپلیکیشن پوکر،  انفجار، تخته نرد، بلک جک، رولت و انواع اسلات با پول واقعی در ایران",
      };
      let content = encodeURIComponent(JSON.stringify(manifest));
      let url = "data:application/manifest+json," + content;
      let element = document.createElement("link");
      element.setAttribute("rel", "manifest");
      element.setAttribute("href", url);
      document.querySelector("head").appendChild(element);
    }
    const addBtn = document.querySelector(".add-button");

    addBtn.addEventListener("click", async () => {
      console.log("👍", "butInstall-clicked");
      const promptEvent = window.deferredPrompt;
      console.log("👍", promptEvent);
      if (!promptEvent) {
        // The deferred prompt isn't available.
        return;
      }
      // Show the install prompt.
      promptEvent.prompt();
      // Log the result
      const result = await promptEvent.userChoice;
      console.log("👍", "userChoice", result);
      // Reset the deferred prompt variable, since
      // prompt() can only be called once.
      window.deferredPrompt = null;
    });
    window.addEventListener("appinstalled", (event) => {
      setRefresh(0);
      window.deferredPrompt = null;
    });
    setTimeout(() => {
      $(".add-button").trigger("click");
    }, 1000);
  };

  const handleSession = async () => {
    try {
      if (prop.isLogin) {
        const resPoker = await getPokerSession();
        if (resPoker.status === 200) {
          setSessionKey(resPoker.data.SessionKey);
        }
      }
    } catch (error) {}
  };
  const [curPage, setCurPage] = useState("dashboard");
  const [isFull, setIsFull] = useState(false);

  const [screenOrientation, setScreenOrientation] = useState(
    screen?.orientation?.type
  );
  const getHour = (date, format) => {
    if (format) {
      var nowDay = moment(date).format("HH:mm");
      return nowDay.toPersianCharacter();
    } else {
      var nowDay = moment(date).format("HHmm");
      return nowDay;
    }
  };
  const getMil = (totalRewards) => {
    if (!totalRewards) return 0;
    var mil = totalRewards / 1000000;

    return mil.toString().toPersianCharacter();
  };
  const haveGift = () => {
    var user = loginToken;
    if (user?.accessToken && !user?.logout) {
      var _bonuses = user?.userGifts?.sort((a, b) =>
        a.startDate < b.startDate ? 1 : -1
      );

      var end = Date.now();
      try {
        var _pen = _bonuses.filter(
          (d) =>
            d.status == "Pending" &&
            d.mode.toLowerCase() == "gift" &&
            d.received == false &&
            Date.parse(d.date) < end &&
            Date.parse(d.expireDate) > end
        );
      } catch (error) {
        var _pen = [];
      }
    } else {
      var _pen = [];
    }
    return _pen;
  };

  const [gameLoader, setGameLoader] = useState(true);
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(defslide);
  const [gameOptions, setGameOptions] = useState([]);

  const [secondaryGame, setSecondaryGame] = useState(
    localStorage.getItem("secondaryGame")
      ? localStorage.getItem("secondaryGame")
      : "crash"
  );
  const [mainGame, setMainGame] = useState(
    params.gameId ? params.gameId : "poker"
  );

  const handleSlider = (e) => {
    var myCarousel = document.getElementById("carouselExampleControls");
    try {
      myCarousel.addEventListener("slide.bs.carousel", (event) => {
        setActiveSlide(event.to);
      });
    } catch (error) {}
  };

  function capitalizeTxt(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }
  useEffect(() => {
    var _gameOptions = [];
    {
      gameDataMain.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game,
            text: capitalizeTxt(game),
            value: game,
          });
        }
      });
    }
    {
      gameData.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game,
            text: capitalizeTxt(game),
            value: game,
          });
        }
      });
    }
    setGameOptions(_gameOptions);
  }, []);
  useEffect(() => {
    if (_event.toLowerCase() == "gpass") {
      defslide = 1;
    }
    if (_event.toLowerCase() == "vip") {
      defslide = 2;
    }
    if (_event.toLowerCase() == "league") {
      defslide = 3;
    }
    if (dayOfTournament == nowDay) {
      defslide = 0;
    }
    if (haveGift().length > 0) {
      defslide = 0;
    }
    setActiveSlide(defslide);
    if (
      loginToken.accessToken &&
      !loginToken?.logout &&
      curPage == "dashboard"
    ) {
      handleManifest();
    }
  }, [loginToken]);

  return (
    <>
      {curPage == "dashboard" && (
        <div id="dashboard" className="mainsection">
          {loginToken?.accessToken && !loginToken?.logout ? (
            <>
              <div
                id="dashboard_section"
                className="dashboard_section main_section fadeoutend"
              >
                <div
                  id="carouselExampleControls"
                  className="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                  data-bs-pause="false"
                >
                  <div className="carousel-inner">
                    <div
                      className={
                        activeSlide == 0
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      {haveGift().length > 0 ? (
                        <>
                          <Banner
                            title="هدیه گلکسی"
                            text={
                              "ساعت " + getHour(haveGift()[0].startDate, true)
                            }
                            icon="gifts"
                            amin="inline animated swing "
                            iconamin="swing"
                            link=".giftarea"
                            showtime={
                              <ShowTimeLeft
                                startDay={moment(
                                  haveGift()[0].startDate
                                ).format("D")}
                                startHour={getHour(
                                  haveGift()[0].startDate,
                                  false
                                )}
                                endDay={moment(haveGift()[0].expireDate).format(
                                  "D"
                                )}
                                endHour={getHour(
                                  haveGift()[0].expireDate,
                                  false
                                )}
                              />
                            }
                            {...prop}
                          />

                          <ConfettiArea recycle={false} numberOfPieces="50" />
                        </>
                      ) : (
                        <>
                          <div className="confettimain">
                            <ConfettiClick
                              active={
                                dayOfTournament == nowDay && activeSlide == 0
                                  ? true
                                  : false
                              }
                              config={mainnconfig}
                            />
                          </div>

                          <Banner
                            title="تورنومنت ۲۵+۲۵ "
                            text="هر جمعه ساعت ۲۲"
                            icon="tournament"
                            amin="inline animated swing "
                            iconamin="swing"
                            link=".tournament"
                            showtime2={
                              <ShowTimeLeft
                                startDay={tourDay}
                                startHour="2000"
                                endDay={tourDay}
                                endHour="2200"
                                className="hiddenmenu"
                              />
                            }
                            {...prop}
                          />
                          {dayOfTournament == nowDay && (
                            <ConfettiArea recycle={false} numberOfPieces="50" />
                          )}
                        </>
                      )}
                    </div>

                    <div
                      className={
                        activeSlide == 1
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      <>
                        <Banner
                          title={
                            getMil(gpassrules?.totalRewards) + " میلیون تومان"
                          }
                          text="پاداش گلکسی پَس"
                          link=".gpass"
                          icon="gpass"
                          amin="animated delay-1s charkhesh"
                          iconamin="pulse"
                          number="15"
                          showtime={
                            <ShowTimeLeft
                              startDay={gpassrules?.startDay}
                              endDay={gpassrules?.endDay}
                              startHour="0000"
                              endHour="2359"
                            />
                          }
                          {...prop}
                        />
                      </>

                      {_event.toLowerCase() == "gpass" && activeSlide == 1 && (
                        <ConfettiArea recycle={false} numberOfPieces="50" />
                      )}
                    </div>

                    <div
                      className={
                        activeSlide == 2
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      <>
                        <Banner
                          title={
                            getMil(viprules?.totalRewards) + " میلیون تومان"
                          }
                          text={"پاداش میز VIP"}
                          link=".vip"
                          icon="vip"
                          amin="inline animated fast flipInY"
                          iconamin="pulse"
                          number=" "
                          showtime={
                            <ShowTimeLeft
                              startDay={viprules?.startDay}
                              endDay={viprules?.endDay}
                              startHour="0000"
                              endHour="2359"
                            />
                          }
                          {...prop}
                        />
                        {_event.toLowerCase() == "vip" && activeSlide == 2 && (
                          <ConfettiArea recycle={false} numberOfPieces="50" />
                        )}
                      </>
                    </div>

                    <div
                      className={
                        activeSlide == 3
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      <>
                        <Banner
                          title={
                            getMil(leaguerules?.totalRewards) + " میلیون تومان"
                          }
                          text="برای لیگ روزانه"
                          link=".league"
                          icon="league"
                          level="big"
                          number="1"
                          amin="inline animated swing "
                          iconamin="swing"
                          showtime={
                            <ShowTimeLeft
                              startDay={leaguerules?.startDay}
                              endDay={leaguerules?.endDay}
                              startHour="0000"
                              endHour="2359"
                            />
                          }
                          {...prop}
                        />
                      </>

                      {_event.toLowerCase() == "league" && activeSlide == 3 && (
                        <ConfettiArea recycle={false} numberOfPieces="50" />
                      )}
                    </div>

                    <div
                      className={
                        activeSlide == 4
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      <>
                        <Banner
                          title="بیش از ۴ میلیارد"
                          text="پاداش افزایش لِوِل"
                          link=".levels"
                          icon="levels"
                          amin="animated delay-2s charkhesh"
                          iconamin="swing"
                          number="90"
                          {...prop}
                        />
                      </>
                    </div>
                    {_width > 500 && 1 == 2 && (
                      <div className="carousel-item " data-bs-interval="12000">
                        <Banner
                          image="/assets/images/calendar.gif"
                          title="بیش از ۵۰۰ میلیون"
                          text="جوایز ماهانه"
                          {...prop}
                        />
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
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
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>

              <div id="game_section" className="dashboard_section main_section">
                <Container>
                  <GameInbox {...prop} />
                </Container>
              </div>
            </>
          ) : (
            <>
              <div id="dashboard_section">
                <Index {...prop} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
