import React from "react";
import Leftcontent from "./LeftContent";
import Rightcontent from "./RightContent";

const Index = () => {
  return (
    <nav className="navbar fixed-top">
      <Leftcontent />
      <Rightcontent />
    </nav>
  );
};

export default Index;
