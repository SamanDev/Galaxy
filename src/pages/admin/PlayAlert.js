import React, { useEffect, useState, useContext } from "react";
import useSound from "use-sound";
import {
  Input,
  Segment,
  Button,
  Card,
  Table,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Form,
  Select,
} from "semantic-ui-react";

import glugSfx from "../../utils/check.mp3";
function RisingPitch(prop) {
  const [play] = useSound(glugSfx);

  return (
    <Button id="playcheck" onClick={play}>
      <span role="img" aria-label="Person with lines near mouth">
        🗣
      </span>
    </Button>
  );
}
export default RisingPitch;
