import React from "react";
import AddColor from "./AddColor";
import ColorsTable from "./ColorsTable";
import { Outlet, useParams } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsLogin } from "../../hook/authHook";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
const Colors = (prop) => {
  const [loading, isLogin] = useIsLogin();
  const params = useParams();
  console.log(params);
  if (loading) {
    return (
      <Dimmer active>
        <Loader className="farsi-inline">لطفا صبر کنید...</Loader>
      </Dimmer>
    );
  } else {
    if (!isLogin) {
      prop.setFirstOpen(true);
      return <Navigate to={"/"} />;
    } else {
      if (params.gameId == "poker") {
        return (
          <iframe
            src="https://glxypkr.com:2053?LoginName=HangOver&amp;SessionKey=4AC558DE44D51B611B01"
            className="framegame"
          ></iframe>
        );
      } else {
        return <>dcdc</>;
      }
    }
  }
};

export default Colors;
