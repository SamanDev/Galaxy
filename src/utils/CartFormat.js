import React from "react";
import ConvertCart from "./convertCart";
const cartFormat = ({ row, isLock }) => {
  return (
    <div
      className="farsi"
      style={{ padding: 10, direction: "ltr", maxWidth: 300 }}
    >
      {row.holderName}
      <br />
      <ConvertCart cartNo={row.cardNumber} isLock={isLock} />
      <br />
      {row.shebaNumber}
      <br />
      {row.bankName}
    </div>
  );
};
export default cartFormat;
