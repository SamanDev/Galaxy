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
      <span
        id="openaddcart"
        style={{
          display: "none",
        }}
        onClick={() => {
          prop.openPanel(".addcart", "");
        }}
      />
      <span
        id="opendeposit"
        style={{
          display: "none",
        }}
        onClick={() => {
          prop.openPanel(".deposit", "");
        }}
      />
      <Leftcontent {...prop} />
      <Rightcontent {...prop} />
    </nav>
  );
};

export default Index;
