import React, { useState } from "react";
import { Button } from "semantic-ui-react";
const Actios = (prop) => {
  const [loading, setLoading] = useState(false);
  if (prop.row.status === "Pending") {
    return (
      <>
        <Button
          size="mini"
          color="green"
          icon="check"
          loading={loading}
          disabled={loading}
          onClick={() => prop.updateStatus(prop.row, "Done", setLoading)}
        />{" "}
        <Button
          size="mini"
          color="red"
          icon="times"
          loading={loading}
          disabled={loading}
          onClick={() => prop.updateStatus(prop.row, "Canceled", setLoading)}
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
          loading={loading}
          disabled={loading}
          onClick={() => prop.updateStatus(prop.row, "Pending", setLoading)}
        />
      </>
    );
  }
};
export default Actios;
