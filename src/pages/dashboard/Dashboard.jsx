import React from "react";

import { Link } from "react-router-dom";
import { Grid, Image, Button, Container } from "semantic-ui-react";
import {
  gameData,
  gameDataCode,
  gameDataMain,
  gameDataMainCode,
} from "../../const";
import GalaxyIcon from "../../utils/GalaxyIcon";
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
const Dashboard = (prop) => {
  return (
    <>
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
            <div className="carousel-item " data-bs-interval="100000">
              <Banner
                image="/assets/images/calendar.gif"
                title="بیش از ۵۰۰ میلیون"
                text="جوایز ماهانه"
                {...prop}
              />
            </div>
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
      <div className="dashboard_section main_section d-none">
        <Container>
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              {gameDataMain.map((game, i) => (
                <Grid.Column key={i}>
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
            </Grid.Row>

            <Grid.Row columns={3}>
              {gameData.map((game, i) => (
                <Grid.Column key={i}>
                  <Image
                    className="fadeout"
                    src={
                      "https://galaxy10g.site/images/g/dfa/" +
                      gameDataCode[i] +
                      ".png"
                    }
                    rounded
                    fluid
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Dashboard;
