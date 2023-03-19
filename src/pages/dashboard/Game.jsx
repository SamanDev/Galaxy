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

var nowDay = moment().isoWeekday();

const Dashboard = (prop) => {
  const navigate = useNavigate();
  const loginToken = prop.loginToken;

  const siteInfo = prop.siteInfo;
  var _event = getEvent(siteInfo);

  const [sessionKey, setSessionKey] = useState("");

  const handleSession = async () => {
    try {
      const resPoker = await getPokerSession();
      if (resPoker.status === 200) {
        setSessionKey(resPoker.data.SessionKey);
      }
    } catch (error) {}
  };
  const [curPage, setCurPage] = useState("game");
  const [isFull, setIsFull] = useState(false);

  const [screenOrientation, setScreenOrientation] = useState(
    screen?.orientation?.type
  );
  const isLandscape = () =>
      window.matchMedia("(orientation:landscape)").matches,
    [orientation, setOrientation] = useState(
      isLandscape() ? "landscape" : "portrait"
    ),
    onWindowResize = () => {
      clearTimeout(window.resizeLag);
      window.resizeLag = setTimeout(() => {
        delete window.resizeLag;
        setOrientation(isLandscape() ? "landscape" : "portrait");
      }, 200);
    };

  useEffect(
    () => (
      onWindowResize(),
      window.addEventListener("resize", onWindowResize),
      () => window.removeEventListener("resize", onWindowResize)
    ),
    []
  );

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
    prop.reportWindowSize();
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
    prop.reportWindowSize();
  };
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  useEffect(() => {
    setMainGame(params.gameId);
    setSessionKey("");
    if (loginToken?.accessToken && !loginToken?.logout) {
      handleSession();
    }
  }, []);

  useEffect(() => {
    let viewportHeight = window.innerHeight;
    if (
      orientation.indexOf("landscape") > -1 &&
      viewportHeight < 600 &&
      loginToken?.accessToken &&
      !loginToken?.logout
    ) {
      handleFullscreen();
    }
    prop.reportWindowSize();
  }, [orientation]);

  function capitalizeTxt(txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1); //or if you want lowercase the rest txt.slice(1).toLowerCase();
  }
  useEffect(() => {
    var _gameOptions = [];
    {
      gameDataMain.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game + i,
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
    prop.reportWindowSize();
  }, []);
  useEffect(() => {
    if (!loginToken?.accessToken || loginToken?.logout) {
      setCurPage("dashboard");
      prop.setFirstOpen(true);

      navigate("/login");
    }
  }, [prop.isLogin, loginToken]);

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
          <div
            id="gamesec1"
            className="gamesec"
            style={
              isFull
                ? { overflowX: "auto", overflowY: "hidden" }
                : { overflow: "auto" }
            }
          >
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
                    frameBorder="0"
                    className={
                      isFull
                        ? "framegame panelfull fullscreen"
                        : "framegame panelfull"
                    }
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
                  className={
                    isFull ? "framegame  fullscreen panelfull" : "framegame "
                  }
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
                isFull
                  ? "framegame frame2  fullscreen panelfull"
                  : "framegame frame2"
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
      {(!gameLoader || 1 == 1) && (
        <div className="gameicons step2">
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

          <Icon circular inverted link color="grey" onClick={handleFullscreen}>
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
                activeIndex == 0 ? "fas fa-angle-right" : "fas fa-angle-left"
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
      {curPage == "game" && loginToken?.accessToken && !loginToken?.logout && (
        <div className="mainsection dashboard_section main_section panelfull">
          <Tab
            onTabChange={handleTabChange}
            panes={panes}
            renderActiveOnly={false}
            activeIndex={activeIndex}
            menu={{ attached: false }}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
