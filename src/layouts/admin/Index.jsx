import React, { useEffect, useState } from "react";

import Content from "../../pages/Content";
import Navbar from "./navbar/Index";

const Index = (prop) => {
  return (
    <div id="mypage">
      <Content {...prop} />
      <Navbar {...prop} />
    </div>
  );
};

export default Index;
