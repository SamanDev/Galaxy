import React from "react";
import { Button } from "semantic-ui-react";

const Actios = (prop) => {
  if (prop.row.status === "Pending") {
    return (
      <>
        <Button
          size="mini"
          color="green"
          icon="check"
          onClick={() => prop.updateStatus(prop.row, "Done")}
        />{" "}
        <Button
          size="mini"
          color="red"
          icon="times"
          onClick={() => prop.updateStatus(prop.row, "Canceled")}
        />
      </>
    );
  } else {
    return (
      <>
        <Button
          size="mini"
          color="yellow"
          icon="refresh"
          onClick={() => prop.updateStatus(prop.row, "Pending")}
        />
      </>
    );
  }
};
export default Actios;
