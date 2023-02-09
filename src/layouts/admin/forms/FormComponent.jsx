import React, { useState } from "react";

import Deposit from "./Deposit/depositComponent";
import Cashout from "./Cashout/cashoutComponent";

import AccessMsg from "../../../utils/accessMsg";

import { Divider, Header } from "semantic-ui-react";
import { useUser } from "../../../hook/userHook";
const depositArea = (prop) => {
  const [refresh, setRefresh] = useState(false);
  const [loginToken] = useUser();

  if (loginToken?.accessToken) {
    return (
      <span className="myaccount popupmenu">
        {prop.title && (
          <>
            <Header
              as="h4"
              inverted
              className="farsi"
              style={{ marginTop: 10 }}
            >
              {prop.title}
            </Header>

            <Divider inverted section />
          </>
        )}
        {prop.mode == "deposit" ? (
          <>
            <Deposit {...prop} setRefresh={setRefresh} list={true} />
          </>
        ) : prop.mode == "transfer" ? (
          <>
            <Cashout {...prop} setRefresh={setRefresh} list={true} />
          </>
        ) : (
          <>
            <Cashout {...prop} setRefresh={setRefresh} list={true} />
          </>
        )}
      </span>
    );
  } else {
    return <AccessMsg />;
  }
};

export default depositArea;
