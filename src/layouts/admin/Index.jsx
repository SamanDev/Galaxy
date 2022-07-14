import React from "react";
import AdminContextContainer from "../../context/adminLayoutContext";

import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
const Index = (prop) => {
  return (
    <div>
      <Content {...prop} />
      <Navbar {...prop} />
    </div>
  );
};

export default Index;
