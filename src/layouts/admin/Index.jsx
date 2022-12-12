import React, { useEffect, useState } from "react";
import AdminContextContainer from "../../context/adminLayoutContext";

import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
import eventBus from "../../services/eventBus";
import { checkBlock, updateActiveTable } from "../../services/httpService";
const Index = (prop) => {
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    eventBus.on("eventsDataUser", (dataGet) => {
      checkBlock(dataGet);
      setIsFull(!isFull);
    });
  }, []);

  return (
    <div>
      <Content {...prop} />
      <Navbar {...prop} />
    </div>
  );
};

export default Index;
