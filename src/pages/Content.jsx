import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminContext } from "../context/adminLayoutContext";
import Carts from "./carts/Carts";
import Brands from "./brands/Brands";
import Category from "./category/Category";
import Games from "./Games/Index";
import Comments from "./comments/Comments";
import Dashboard from "./dashboard/Dashboard";
import Deliveries from "./deliveries/Deliveries";
import Discounts from "./discounts/Discounts";
import Guaranties from "./guaranties/Guaranties";
import Orders from "./orders/Orders";
import Permissions from "./permissions/Permissions";
import GalaxyPass from "./GalaxyPass/Index";
import Questions from "./questions/Questions";
import Roles from "./roles/Roles";
import Users from "./users/Users";
import Logout from "./auth/Logout";
import CategoryChildren from "./category/CategoryChildren";
import Attributes from "./category/attrs/Attributes";

const Content = (prop) => {
  const { showSidebar } = useContext(AdminContext);

  return (
    <section id="content_section" className={`py-2 px-3`}>
      <Routes>
        <Route path="/" element={<Dashboard {...prop} />} />

        <Route path="/games" element={<Games {...prop} />}>
          <Route path=":gameId" />
        </Route>

        <Route path="/logout" element={<Logout />} />
      </Routes>
    </section>
  );
};

export default Content;
