import React from "react";
import { Icon, List, Button } from "semantic-ui-react";
import AccessMsg from "../../utils/accessMsg";
import MyRewardList from "./MyRewardList";
const LevelList = () => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  if (loginToken?.accessToken) {
    return (
      <span className="myaccount popupmenu">
        <List divided inverted verticalAlign="middle" className="myaccount">
          <MyRewardList />
        </List>
      </span>
    );
  } else {
    return <AccessMsg />;
  }
};

export default LevelList;