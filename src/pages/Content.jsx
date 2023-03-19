import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../context/adminLayoutContext";
import Login from "./dashboard/Login";
import Dashboard from "./dashboard/Dashboard";
import Game from "./dashboard/Game";
import Admin from "./admin/Index";
const Content = (prop) => {
  return (
    <section id="content_section" className={`py-2 px-3 panelfull`}>
      <Routes>
        <Route path="/" element={<Dashboard {...prop} />} />
        <Route path="/login/:u/:p" element={<Dashboard {...prop} />} />

        <Route path="/admin" element={<Admin {...prop} />} />

        <Route path="/admin/:username" element={<Admin {...prop} />} />
        <Route path="/requests" element={<Admin request={true} {...prop} />} />
        <Route path="/games">
          <Route path=":gameId" element={<Game {...prop} />} />
        </Route>
      </Routes>
    </section>
  );
};

export default Content;
