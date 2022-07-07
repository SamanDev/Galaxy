import React from "react";
import AddColor from "./AddColor";
import ColorsTable from "./ColorsTable";
import { Outlet, useParams } from "react-router-dom";
const Colors = () => {
  const params = useParams();
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
};

export default Colors;
