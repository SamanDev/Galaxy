import React from "react";

const convertCart = (prop) => {
  return (
    <>
      {prop.isLock ? (
        <>
          {prop.cartNo.substring(0, 4)} **** ****{" "}
          {prop.cartNo.substring(12, 16)}
        </>
      ) : (
        <>
          {prop.cartNo.substring(0, 4)} {prop.cartNo.substring(4, 8)}{" "}
          {prop.cartNo.substring(8, 12)} {prop.cartNo.substring(12, 16)}
        </>
      )}
    </>
  );
};
export default convertCart;
