import React from "react";
import AdminContextContainer from "../../context/adminLayoutContext";
import { useIsLogin } from "../../hook/authHook";
import Content from "../../pages/Content";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
const Index = (prop) => {
  const [loading, isLogin] = useIsLogin();
  console.log(prop);
  return (
    <AdminContextContainer>
      {loading ? (
        <Dimmer active>
          <Loader className="farsi-inline">لطفا صبر کنید...</Loader>
        </Dimmer>
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
