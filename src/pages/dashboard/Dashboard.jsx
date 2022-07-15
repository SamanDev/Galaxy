import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Grid,
  Image,
  Button,
  Container,
  List,
  Label,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import {
  gameData,
  gameDataCode,
  gameDataMain,
  gameDataMainCode,
} from "../../const";
import GalaxyIcon from "../../utils/GalaxyIcon";
import $ from "jquery";
const Banner = (prop) => {
  return (
    <div className="banner">
      {prop.image && <Image src={prop.image} rounded />}

      <h1 className="farsi">{prop.title}</h1>
      <div className="text farsi myaccount">
        <GalaxyIcon
          mode={prop.icon}
          level=""
          text=""
          number={prop.number}
          style={{
            width: 0,

            transform: "scale(8)",
            direction: "ltr",
            position: "absolute",
            right: "-50px",
            top: "100px",
            opacity: 0.8,
          }}
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
  const [curPage, setCurPage] = useState("dashboard");
  const params = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [gameOptions, setGameOptions] = useState([]);
  const [secondaryGame, setSecondaryGame] = useState(
    localStorage.getItem("secondaryGame")
      ? localStorage.getItem("secondaryGame")
      : "blackjack3"
  );
  const [mainGame, setMainGame] = useState(
    params.gameId ? params.gameId : "poker"
  );

  const handleChange = (e, { name, value }) => {
    setSecondaryGame(value);
    localStorage.setItem("secondaryGame", value);
  };

  const handleRangeChange = (e) => setActiveIndex(activeIndex == 0 ? 1 : 0);
  const handleFullscreen = (e) => {
    $(".framegame,body").toggleClass("fullscreen");
  };
  const handleReload = (e) => {
    $(".framegame:visible").attr("src", $(".framegame:visible").attr("src"));
  };
  const handleTabChange = (e, { activeIndex }) => setActiveIndex(activeIndex);
  useEffect(() => {
    if (window.location.href.toString().indexOf("/games") > -1) {
      setCurPage("game");
      setMainGame(params.gameId);
    } else {
      setCurPage("dashboard");
    }
  }, [window.location.href]);
  const panes33 = [
    {
      menuItem: "poker",
      pane: (
        <Tab.Pane key="tab1" as="span">
          <Image src="/assets/images/poker.png" fluid />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "2",
      pane: (
        <Tab.Pane key="tab2" as="span">
          <Image src="/assets/images/blackjack.png" fluid />
        </Tab.Pane>
      ),
    },
  ];
  useEffect(() => {
    var _gameOptions = [];
    {
      gameDataMain.map((game, i) => {
        if (game != mainGame) {
          _gameOptions.push({
            key: game,
            text: game,
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
            text: game,
            value: game,
          });
        }
      });
    }
    setGameOptions(_gameOptions);
    console.log(mainGame);
    console.log(secondaryGame);
    console.log(gameOptions);
  }, []);

  const panes = [
    {
      menuItem: "Tab 1",
      pane: (
        <Tab.Pane key="tab1" attached={false}>
          {mainGame == "poker" ? (
            <iframe
              src="https://glxypkr.com:2053?LoginName=HangOver&amp;SessionKey=4AC558DE44D51B611B01"
              className="framegame"
            ></iframe>
          ) : (
            <iframe
              src={
                "https://glxypkr.com:8443/secured/games/" +
                mainGame +
                ".html?code=E14AB11A9CFD83028B5F273261AC8D47E472739FA49E98690BAF485791D2CB9A"
              }
              className="framegame"
            ></iframe>
          )}
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Tab 2",
      pane: (
        <Tab.Pane key="tab2" attached={false}>
          <iframe
            src={
              "https://glxypkr.com:8443/secured/games/" +
              secondaryGame +
              ".html?code=E14AB11A9CFD83028B5F273261AC8D47E472739FA49E98690BAF485791D2CB9A"
            }
            className="framegame"
          ></iframe>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      {curPage == "dashboard" && (
        <div id="dashboard" className="mainsection">
          <div
            id="dashboard_section"
            className="dashboard_section main_section fadeout"
          >
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <Banner
                    title="۱۱۰ میلیون تومان"
                    text="پاداش گلکسی پَس"
                    link=".gpass"
                    icon="gpass"
                    number="15"
                    {...prop}
                  />
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                  <Banner
                    title="۱۹۲ میلیون تومان"
                    text="پاداش VIP 25/50K"
                    link=".vip"
                    icon="vip"
                    number=" "
                    {...prop}
                  />
                </div>

                <div className="carousel-item" data-bs-interval="10000">
                  <Banner
                    title="۴۵ میلیون تومان"
                    text="برای لیگ روزانه"
                    link=".league"
                    icon="league"
                    number="1"
                    {...prop}
                  />
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                  <Banner
                    title="بیش از ۴ میلیارد"
                    text="پاداش افزایش لِوِل"
                    link=".levels"
                    icon="levels"
                    number="90"
                    {...prop}
                  />
                </div>
                {_width > 500 && (
                  <div className="carousel-item " data-bs-interval="100000">
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
                      src={
                        "https://galaxy10g.site/images/g/dfa/" +
                        gameDataMainCode[i] +
                        ".png"
                      }
                      rounded
                      fluid
                    />
                  </Grid.Column>
                ))}
              </Grid>
            </Container>
          </div>
        </div>
      )}
      {curPage == "game" && (
        <div className="mainsection dashboard_section main_section">
          <Tab
            onTabChange={handleTabChange}
            panes={panes}
            renderActiveOnly={false}
            activeIndex={activeIndex}
            menu={{ attached: false }}
          />
          <Icon
            circular
            inverted
            link
            color="grey"
            className="changegame"
            onClick={handleRangeChange}
            style={{ left: 4 }}
          >
            <i className="fas fa-retweet"></i>
          </Icon>
          <Icon
            circular
            inverted
            link
            color="grey"
            className="changegame"
            onClick={handleReload}
            style={{ left: 40 }}
          >
            <i className="fas fa-sync-alt"></i>
          </Icon>
          <Icon
            circular
            inverted
            link
            color="grey"
            className="changegame"
            onClick={handleFullscreen}
            style={{ left: 76 }}
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </Icon>
          {activeIndex == 1 && (
            <Dropdown
              value={secondaryGame}
              options={gameOptions}
              selectOnNavigation={false}
              name="false"
              direction="left"
              compact
              scrolling
              onChange={handleChange}
              trigger={
                <Icon
                  circular
                  inverted
                  link
                  color="grey"
                  style={{ right: -25, zIndex: 20, position: "relative" }}
                >
                  <i className="fas fa-angle-double-down"></i>
                </Icon>
              }
            />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
