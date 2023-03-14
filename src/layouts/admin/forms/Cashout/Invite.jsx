import { useState } from "react";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alert } from "../../../../utils/alerts";

import AnimIcon from "../../../../utils/inviteIcon";
import { cashierService } from "../../../../services/cashier";
import Invite from "../../../../pages/dashboard/Invite";
import InviteLink from "../../../../pages/dashboard/InviteLink";
const depositArea = (prop) => {
  return (
    <>
      <Invite {...prop} />

      <InviteLink {...prop} />
    </>
  );
};

export default depositArea;
