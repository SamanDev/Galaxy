import React from "react";

import { Link } from "react-router-dom";
import { Grid, Image, Button, Container } from "semantic-ui-react";
import {
  gameData,
  gameDataCode,
  gameDataMain,
  gameDataMainCode,
} from "../../const";
const Banner = (prop) => {
  console.log(prop);
  return (
    <div className="banner">
      <h1 className="farsi">{prop.title}</h1>
      <div className="text farsi">
        {prop.text}
        <br />
        <br />
        <br />
        <br />
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
                title="بیش از ۴ میلیارد"
                text="پاداش افزایش لِوِل"
                link=".levels"
                {...prop}
              />
            </div>
            <div className="carousel-item " data-bs-interval="10000">
              <Banner
                title="۱۱۰ میلیون تومان"
                text="پاداش گلکسی پَس"
                link=".gpass"
                {...prop}
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <Banner
                title="۴۵ میلیون تومان"
                text="برای لیگ هفتگی"
                link=".league"
                {...prop}
              />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <Banner title="۲۰ میلیون پاداش" text="برای پاچوب ها" {...prop} />
            </div>
            <div className="carousel-item" data-bs-interval="10000">
              <Banner title="۲۵۵ میلیون پاداش" text="گلکسی پس" {...prop} />
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
