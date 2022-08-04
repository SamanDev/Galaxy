import React from "react";
import Leftcontent from "./LeftContent";
import Rightcontent from "./RightContent";

const Index = (prop) => {
  return (
    <nav className="navbar fixed-top">
      <span
        id="openlevellist"
        style={{
          display: "none",
        }}
        onClick={() => {
          prop.openPanel(".levels", "");
        }}
      />
      <Leftcontent {...prop} />
      <Rightcontent {...prop} />
    </nav>
  );
};

export default Index;
