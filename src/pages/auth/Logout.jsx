import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { logoutService } from "../../services/auth";
import { Alert } from "../../utils/alerts";

const Logout = (prop) => {
  const [loading, setLoading] = useState(true);
  const handleLogout = async () => {
    prop.setIsUser(false);

    setLoading(false);
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <>
      {loading ? (
        <h1 className="text-center waiting_center">لطفا صبر کنید...</h1>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Logout;
