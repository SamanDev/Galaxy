import React from "react";
import AdminContextContainer from "../../context/adminLayoutContext";
import { useIsLogin } from "../../hook/authHook";
import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";

const Index = (prop) => {
  const [loading, isLogin] = useIsLogin();
  return (
    <AdminContextContainer>
      {loading ? (
        <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
      ) : isLogin ? (
        <div>
          <Content {...prop} />
          <Navbar {...prop} />
        </div>
      ) : (
        <div>
          <Content {...prop} />
          <Navbar {...prop} />
        </div>
      )}
    </AdminContextContainer>
  );
};

export default Index;
