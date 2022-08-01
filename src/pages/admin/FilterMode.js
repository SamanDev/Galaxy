import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

options.push({ key: 1, text: "all", value: "all" });
options.push({ key: 2, text: "cashout", value: "cashout" });
options.push({ key: 3, text: "deposit", value: "deposit" });
options.push({ key: 4, text: "transfer", value: "transfer" });
options.push({ key: 5, text: "bonus", value: "bonus" });
options.push({ key: 6, text: "poker", value: "poker" });
options.push({ key: 7, text: "commission", value: "commission" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      placeholder={prop.value}
      floated="right"
      selection
      options={options}
      onChange={prop.onFilter}
      style={{ position: "relative", zIndex: 100000 }}
    />
  );
};

export default DropdownExampleMultipleSelection;
