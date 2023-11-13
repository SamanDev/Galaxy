import React, { useState, useEffect } from "react";
import { Divider, Segment, Progress, Button, Grid } from "semantic-ui-react";
import ConvertCart from "./convertCart";
import Bonus from "../layouts/admin/reffer/bonusget";
import { doCurrency } from "../const";
const moment = require("moment");

const depositArea = (prop) => {
  var desc = prop.item.split("ReferCommissionDetailModel");

  const [user, setUser] = useState(desc);

  return (
    <Grid
      verticalAlign="middle"
      divided="vertically"
      inverted
      padded="vertically"
    >
      {user.map(function (use, i) {
        if (use.indexOf("rake=") > -1)
          return <Bonus key={i} user={use} {...prop} />;
      })}
    </Grid>
  );
};

export default depositArea;
