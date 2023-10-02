import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

options.push({ key: 2, text: "Cashout", value: "cashout" });
options.push({ key: 3, text: "Deposit", value: "deposit" });
options.push({ key: 4, text: "Transfer", value: "transfer" });
options.push({ key: 5, text: "Bonus", value: "bonus" });
options.push({ key: 6, text: "Poker", value: "poker" });
options.push({ key: 7, text: "Casino", value: "casino" });
options.push({ key: 8, text: "TotalIncome", value: "totalincome" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      defaultValue={prop.value}
      selection
      multiple
      fluid
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
