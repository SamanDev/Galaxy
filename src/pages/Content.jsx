import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../context/adminLayoutContext";
import Dashboard from "./dashboard/Dashboard";
import Admin from "./admin/Index";
import Requests from "./admin/Requests";
import eventBus from "../services/eventBus";
import { checkBlock, updateActiveTable } from "../services/httpService";
const Content = (prop) => {
  const { showSidebar } = useContext(AdminContext);

  return (
    <section id="content_section" className={`py-2 px-3`}>
      <Routes>
        <Route path="/" element={<Dashboard {...prop} />} />
        <Route path="/admin" element={<Admin {...prop} />} />
        <Route path="/requests" element={<Admin request={true} {...prop} />} />
        <Route path="/games" element={<Dashboard {...prop} />}>
          <Route path=":gameId" element={<Dashboard {...prop} />} />
        </Route>
      </Routes>
    </section>
  );
};

export default Content;
