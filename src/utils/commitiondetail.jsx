import React, { useState, useEffect } from "react";
import { Divider, Segment, Progress, Button, Grid } from "semantic-ui-react";
import ConvertCart from "./convertCart";
import Bonus from "../layouts/admin/reffer/bonusget";
import { doCurrency } from "../const";
const moment = require("moment");

const depositArea = (prop) => {
  try {
    var desc = JSON.parse(prop.item);
  } catch (error) {
    return null;
  }
  var desc = JSON.parse(prop.item);

  const [user, setUser] = useState(desc);

  return (
    <Grid
      verticalAlign="middle"
      attached="top"
      inverted
      padded="vertically"
      as={Segment}
    >
      {user.map(function (use, i) {
        if (use.rake) return <Bonus key={i} user={use} {...prop} />;
      })}
    </Grid>
  );
};

export default depositArea;
