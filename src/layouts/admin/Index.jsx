import React, { useEffect, useState } from "react";

import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import eventBus from "../../services/eventBus";
import { checkBlock } from "../../services/httpService";
const Index = (prop) => {
  const [isFull, setIsFull] = useState(0);
  useEffect(() => {
    eventBus.on("eventsDataUser", (dataGet) => {
      checkBlock(dataGet);

      setIsFull(dataGet);
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
