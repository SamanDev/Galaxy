import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];

options.push({ key: 1, text: "all", value: "all" });
options.push({ key: 2, text: "cashout", value: "cashout" });
options.push({ key: 3, text: "deposit", value: "deposit" });
options.push({ key: 4, text: "transfer", value: "transfer" });

const DropdownExampleMultipleSelection = (prop) => {
  return (
    <Dropdown
      placeholder={prop.value}
      className="default"
      floated="right"
      selection
      options={options}
      onChange={prop.onFilter}
    />
  );
};

export default DropdownExampleMultipleSelection;
