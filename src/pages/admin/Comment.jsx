import React from "react";
import {
  Button,
  Comment,
  Divider,
  Message,
  Label,
  Segment,
} from "semantic-ui-react";
import LevelIcon from "../../utils/Level";
import { convertDateToJalali } from "../../utils/convertDate";
const siteInfo = JSON.parse(localStorage.getItem("siteInfo"));

const CommentExampleMinimal = (prop) => {
  const string = prop.msg.message;
  var written = prop.msg.adminUser;

  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  const result = string.split("\n");
  return (
    <>
      <Segment inverted className="msg" size="mini" basic>
        <div
          style={
            written == prop.username
              ? { right: 10, position: "absolute" }
              : { left: 10, position: "absolute" }
          }
        >
          {convertDateToJalali(prop.msg.date)}
        </div>
        <Label
          size="small"
          color={written != prop.username ? "red" : "blue"}
          ribbon={written != prop.username ? "right" : true}
        >
          {written}
        </Label>

        <div style={{ marginTop: 10 }}>
          {result.map(function (comment, i) {
            return (
              <div
                key={i}
                className={written != "You" ? "farsi msgtext" : "farsi"}
              >
                {comment}
              </div>
            );
          })}
        </div>
      </Segment>
    </>
  );
};

export default CommentExampleMinimal;
