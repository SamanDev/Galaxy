import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserService, getPokerSession } from "../../services/auth";
import { checkBlock } from "../../services/httpService";
import {
  Grid,
  Image,
  Button,
  Container,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import {
  gameData,
  gameDataMain,
  gameDataMainCode,
  getEvent,
  dayOfTournament,
  levelDataInfo,
} from "../../const";
import GalaxyIcon from "../../utils/svganim";
import ConfettiArea from "../../utils/party";
import ConfettiClick from "../../utils/partyclick";
import Noty from "./noti";
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
const Banner2 = (prop) => {
  return (
    <div className="banner">
      {prop.image && <Image src={prop.image} rounded />}

      <h1 className="farsi">{prop.title}</h1>
      <div className="text farsi myaccount">
        <GalaxyIcon
          mode={prop.icon}
          level=""
          text=""
          className="bannericon"
          number={prop.number}
        />
        {prop.text}
        <br />
        <br />
        <br />
        <br />
        {prop.link && (
          <Button
            size="big"
            className="farsi"
            color="teal"
            onClick={() => {
              prop.openPanel(prop.link);
            }}
          >
            اطلاعات بیشتر
          </Button>
        )}
      </div>
    </div>
  );
};
var _width = document.body.clientWidth;

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
  const handleCheckLogin = async () => {
    try {
      const res = await getUserService(sessionKey);
    } catch (error) {}
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
    if (user) {
      var _bonuses = user?.userGifts?.sort((a, b) =>
        a.date < b.date ? 1 : -1
      );

      var end = Date.now();

      var _pen = _bonuses.filter(
        (d) =>
          d.status == "Pending" &&
          d.mode.toLowerCase() == "gift" &&
          d.received == false &&
          Date.parse(d.date) < end &&
          Date.parse(d.expireDate) > end
      );
    } else {
      var _pen = [];
    }
    return _pen;
  };

  var defslide = 1;

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

  const handleChange = (e, { name, value }) => {
    setGameLoader(true);
    setSecondaryGame(value);
    setActiveIndex(1);
    localStorage.setItem("secondaryGame", value);
  };

  const handleRangeChange = (e) => setActiveIndex(activeIndex == 0 ? 1 : 0);
  const handleFullscreen = (e) => {
    $(".framegame,body").toggleClass("fullscreen");
    setIsFull(!isFull);
  };
  const handleSlider = (e) => {
    var myCarousel = document.getElementById("carouselExampleControls");
    try {
      myCarousel.addEventListener("slide.bs.carousel", (event) => {
        setActiveSlide(event.to);
      });
    } catch (error) {}
  };
  const handleReload = (e) => {
    if ($("#pokerframe:visible").length > 0) {
      setSessionKey("");
      handleSession();
    }
    setGameLoader(true);
    $(".framegame:visible").attr("src", $(".framegame:visible").attr("src"));
  };
  const removeFrameLoad = (e) => {
    setGameLoader(false);
  };
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  useEffect(() => {
    if (window.location.href.toString().indexOf("/games") > -1) {
      setCurPage("game");
      setMainGame(params.gameId);
      setSessionKey("");

      handleSession();
    } else {
      setCurPage("dashboard");
      handleSlider();
    }
  }, [window.location.href]);

  useEffect(() => {
    // if (_width < 800 || 1 == 1) {
    //   if (screenOrientation.indexOf("landscape") > -1) {
    //     $(".framegame,body").addClass("fullscreen");
    //     setIsFull(true);
    //   } else {
    //     setIsFull(false);
    //     $(".framegame,body").removeClass("fullscreen");
    //   }
    // }
  }, [screenOrientation]);
  useEffect(() => {
    handleSlider();
  }, []);
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
    if (!loginToken?.username && curPage == "game") {
      setCurPage("dashboard");
      prop.setFirstOpen(true);

      navigate("/");
    }
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
  }, [curPage, prop.isLogin, loginToken]);

  useEffect(() => {
    if (prop.isLogin && curPage == "game") {
      // checkBlock(loginToken);
    } else {
      handleSlider();
    }
  }, [curPage]);
  useEffect(() => {
    try {
      $("#gamesec1").scrollLeft($("#gamesec1").width() / 2);
      $("#gamesec2").scrollLeft($("#gamesec2").width() / 2);
    } catch (error) {}
  }, [gameLoader]);

  const panes = [
    {
      menuItem: "Tab 1",
      pane: (
        <Tab.Pane key="tab1" attached={false}>
          <div id="gamesec1" style={{ overflow: "auto" }}>
            {(gameLoader || sessionKey == "") && (
              <div
                className={
                  isFull ? "framegame loader fullscreen" : "framegame loader"
                }
              >
                <Dimmer active>
                  <Loader className="farsi-inline" size="large">
                    لطفا صبر کنید...
                  </Loader>
                </Dimmer>
              </div>
            )}
            {mainGame == "poker" ? (
              <>
                {sessionKey != "" && (
                  <iframe
                    src={
                      "http://139.99.144.72:2053?LoginName=" +
                      loginToken?.username +
                      "&SessionKey=" +
                      sessionKey
                    }
                    id="pokerframe"
                    className={isFull ? "framegame  fullscreen" : "framegame "}
                    onLoad={removeFrameLoad}
                  ></iframe>
                )}
              </>
            ) : (
              <>
                <iframe
                  src={
                    "https://glxypkr.com:8443/secured/games/" +
                    mainGame +
                    ".html?code=8035A16CF14CF5E487D16E160D4455FAFC8324EE3ABB490258B98007FDB800B3"
                  }
                  className={isFull ? "framegame  fullscreen" : "framegame "}
                  onLoad={removeFrameLoad}
                ></iframe>
              </>
            )}
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tab 2",
      pane: (
        <Tab.Pane key="tab2" attached={false}>
          <div id="gamesec2" style={{ overflow: "auto" }}>
            {gameLoader && (
              <div
                className={
                  isFull ? "framegame loader fullscreen" : "framegame loader"
                }
              >
                <Dimmer active>
                  <Loader className="farsi-inline" size="large">
                    لطفا صبر کنید...
                  </Loader>
                </Dimmer>
              </div>
            )}
            <iframe
              src={
                "https://glxypkr.com:8443/secured/games/" +
                secondaryGame +
                ".html?code=8035A16CF14CF5E487D16E160D4455FAFC8324EE3ABB490258B98007FDB800B3"
              }
              className={
                isFull ? "framegame frame2  fullscreen" : "framegame frame2"
              }
              onLoad={removeFrameLoad}
            ></iframe>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      {curPage == "dashboard" && (
        <div id="dashboard" className="mainsection">
          {loginToken ? (
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
                      {activeSlide && (
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
                                startDay={gpassrules.startDay}
                                endDay={gpassrules.endDay}
                                startHour="0000"
                                endHour="2359"
                              />
                            }
                            {...prop}
                          />
                        </>
                      )}
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
                      {activeSlide && (
                        <>
                          <Banner
                            title={<>۱۹۲ میلیون تومان</>}
                            text={
                              "پاداش VIP " +
                              viprules.bigBlindLimit / 2 +
                              "K/" +
                              viprules.bigBlindLimit +
                              "K"
                            }
                            link=".vip"
                            icon="vip"
                            amin="inline animated fast flipInY"
                            iconamin="pulse"
                            number=" "
                            showtime={
                              <ShowTimeLeft
                                startDay={viprules.startDay}
                                endDay={viprules.endDay}
                                startHour="0000"
                                endHour="2359"
                              />
                            }
                            {...prop}
                          />
                          {_event.toLowerCase() == "vip" &&
                            activeSlide == 2 && (
                              <ConfettiArea
                                recycle={false}
                                numberOfPieces="50"
                              />
                            )}
                        </>
                      )}
                    </div>

                    <div
                      className={
                        activeSlide == 3
                          ? "carousel-item active"
                          : "carousel-item"
                      }
                      data-bs-interval="12000"
                    >
                      {activeSlide && (
                        <>
                          <Banner
                            title={
                              getMil(leaguerules?.totalRewards) +
                              " میلیون تومان"
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
                                startDay={leaguerules.startDay}
                                endDay={leaguerules.endDay}
                                startHour="0000"
                                endHour="2359"
                              />
                            }
                            {...prop}
                          />
                        </>
                      )}
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
                      {activeSlide && (
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
                      )}
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
                  <Grid>
                    {gameDataMain.map((game, i) => (
                      <Grid.Column key={i} mobile={8} tablet={4} computer={4}>
                        <Image
                          className="fadeout"
                          as={Link}
                          to={"/games/" + game}
                          id={"open" + game}
                          alt={"open " + game}
                          width="255"
                          height="255"
                          src={
                            "/assets/images/games/" +
                            gameDataMainCode[i] +
                            "-min.webp"
                          }
                          rounded
                          fluid
                        />
                      </Grid.Column>
                    ))}
                  </Grid>
                </Container>
              </div>
            </>
          ) : (
            <>
              <div id="dashboard_section" className="">
                <Index {...prop} />
              </div>
            </>
          )}
        </div>
      )}
      {curPage == "game" && prop.isLogin && (
        <div className="mainsection dashboard_section main_section">
          <Tab
            onTabChange={handleTabChange}
            panes={panes}
            renderActiveOnly={false}
            activeIndex={activeIndex}
            menu={{ attached: false }}
          />
          {(!gameLoader || 1 == 1) && (
            <div className="gameicons">
              <Icon
                circular
                inverted
                color="violet"
                link
                onClick={() => {
                  prop.setActivePanel(!prop.activePanel);
                  $(".picn").toggleClass("open");
                }}
                style={
                  !isFull
                    ? {
                        transform: "translateY(-150px)",
                        transformOrigin: "center",
                        opacity: 0,
                      }
                    : {
                        transform: "translateY(0px)",
                        transformOrigin: "center",
                      }
                }
              >
                <i className="fas fa-arrow-left"></i>
              </Icon>

              <Icon
                circular
                inverted
                link
                color="grey"
                onClick={handleFullscreen}
              >
                <i
                  className={
                    isFull
                      ? "fas fa-compress-arrows-alt"
                      : "fas fa-expand-arrows-alt"
                  }
                ></i>
              </Icon>
              <Icon circular inverted link color="grey" onClick={handleReload}>
                <i className="fas fa-sync-alt"></i>
              </Icon>

              <Icon
                circular
                inverted
                link
                color={activeIndex == 0 ? "orange" : "grey"}
                onClick={handleRangeChange}
                style={{
                  fontSize: 25,
                  right: -10,
                }}
              >
                <i
                  className={
                    activeIndex == 0
                      ? "fas fa-angle-right"
                      : "fas fa-angle-left"
                  }
                ></i>
              </Icon>

              <Dropdown
                value={secondaryGame}
                options={gameOptions}
                selectOnNavigation={false}
                name="false"
                direction="left"
                className="selectgame"
                style={
                  activeIndex == 0
                    ? {
                        transform: "translateY(-250px) translateX(-50px)",
                        transformOrigin: "center right",
                        opacity: 0,
                      }
                    : {
                        transform: "translateY(-180px) translateX(-50px)",
                        transformOrigin: "center right",
                      }
                }
                compact
                scrolling
                onChange={handleChange}
                trigger={
                  <Icon
                    circular
                    inverted
                    link
                    color="orange"
                    style={{
                      transform: "translateX(28px) translateY(28px) ",
                      transformOrigin: "center right",
                    }}
                  >
                    <i className="fas fa-angle-double-down"></i>
                  </Icon>
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
