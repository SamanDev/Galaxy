import React from "react";
import { Dropdown } from "semantic-ui-react";

const options = [];
Array.apply(0, Array(90)).map(function (x, i) {
  options.push({ key: i, text: "Level" + (i + 1), value: i + 1 });
});
const loginoptions = [];
Array.apply(0, Array(90)).map(function (x, i) {
  loginoptions.push({ key: i, text: i + 1, value: i + 1 });
});
const DropdownExampleMultipleSelection = (prop) => {
  if (prop.mymode) {
    return (
      <Dropdown
        placeholder={prop.value ? prop.value + " Day" : "Login"}
        floated="right"
        selection
        options={loginoptions}
        onChange={prop.onFilter}
      />
    );
  } else {
    return (
      <Dropdown
        placeholder="Level"
        className="default"
        floated="right"
        multiple
        selection
        options={options}
      />
    );
  }
};

export default DropdownExampleMultipleSelection;
