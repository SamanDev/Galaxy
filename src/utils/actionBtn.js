import React from "react";
import {
  Input,
  Segment,
  Button,
  Card,
  Table,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Form,
  Select,
} from "semantic-ui-react";
const convertCart = (prop) => {
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
export default convertCart;
