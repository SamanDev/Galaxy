import React from "react";
import {
  Segment,
  Icon,
  Label,
  Popup,
  Progress,
  Divider,
} from "semantic-ui-react";
import DepositArea from "../depositComponent/index.jsx";
import CashoutArea from "../cashout/index.jsx";
import LevelIcon from "../../../utils/LevelIcon";
import List from "../../../pages/dashboard/ListCashier";
import { doCurrency } from "../../../const";
const Balance = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  if (loginToken) {
    return (
      <>
        <Segment
          className="myaccount"
          inverted
          style={{ margin: 0, padding: 10, color: "#fff" }}
        >
          <LevelIcon
            level={61}
            link
            style={{
              position: "relative",
              textAlign: "center",
              top: -3,
            }}
            onClick={() => {
              prop.openPanel(".levels", "#lvl45");
            }}
          />
          <Label color="black" className="balanceLable">
            {loginToken.username}
          </Label>
          <Label color="black" className="balanceLable amount">
            {doCurrency(loginToken.balance)}
          </Label>
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-50, 0]}
            basic
            pinned
            trigger={
              <Icon
                circular
                size="small"
                inverted
                name="plus"
                color="green"
                link
              />
            }
          >
            <DepositArea {...prop} />
          </Popup>{" "}
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-78, 0]}
            basic
            onClose={() => {
              prop.setActiveMenu("main");
            }}
            trigger={
              <Icon
                circular
                size="small"
                inverted
                color="red"
                name="minus"
                link
              />
            }
          >
            <CashoutArea {...prop} />
          </Popup>{" "}
          <Popup
            on="click"
            className="myaccount"
            inverted
            position="bottom center"
            offset={[-106, 0]}
            basic
            trigger={<i className="fas fa-ellipsis-h  d-none d-sm-inline"></i>}
          >
            <Label color="black">
              Balance:
              <Label.Detail>1,000,000</Label.Detail>
            </Label>
            <br />
            <Label color="black">
              On Table:
              <Label.Detail>500,000</Label.Detail>
            </Label>
            <br />
            <Label color="black">
              Total:
              <Label.Detail>1,0500,000</Label.Detail>
            </Label>

            <Divider />
            <List status="Pending" />
          </Popup>
          <Progress
            percent={50}
            inverted
            indicating
            size="tiny"
            style={{
              margin: 0,
              padding: 0,
              height: 3,
              position: "absolute",
              marginTop: 5,
              right: 5,
              left: 5,
            }}
          />
        </Segment>
      </>
    );
  } else {
    return null;
  }
};

export default Balance;
