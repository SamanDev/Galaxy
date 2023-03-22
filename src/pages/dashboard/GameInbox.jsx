import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserService, getPokerSession } from "../../services/auth";
import { checkBlock } from "../../services/httpService";
import PWAPrompt from "react-ios-pwa-prompt";
import Tour from "../../Tour";
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
  Segment,
  Label,
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
import GameBox from "../../utils/GameBox";

const GameInbox = (prop) => {
  return (
    <>
      <Grid centered reversed="computer tablet mobile" columns="equal">
        <Grid.Row columns={3}>
          <Grid.Column
            mobile={9}
            tablet={8}
            computer={6}
            as={Link}
            to={"/games/" + gameDataMain[0]}
            id={"open" + gameDataMain[0]}
          >
            <GameBox
              game={gameDataMain[0]}
              trigger="boomerang"
              height="130px"
              stroke="10"
            />
          </Grid.Column>
          <Grid.Column
            tablet={8}
            computer={6}
            as={Link}
            to={"/games/" + gameDataMain[1]}
            id={"open" + gameDataMain[1]}
            only="tablet computer"
          >
            <GameBox
              game={gameDataMain[1]}
              trigger="boomerang"
              height="130px"
              stroke="10"
            />
          </Grid.Column>
          <Grid.Column
            computer={4}
            mobile={7}
            onClick={() => {
              prop.openPanel(".games");
            }}
          >
            <GameBox game="more" trigger="boomerang" height="130px" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default GameInbox;
