import React from "react";
import { Button, Comment, Divider, Message } from "semantic-ui-react";
import LevelIcon from "../../utils/Level";
import Ticket from "../../layouts/admin/cashout/Ticket";
const CommentExampleMinimal = () => (
  <Comment.Group size="mini">
    <Ticket departman="پشتیبانی فنی" />
    <Divider inverted />
    <Comment>
      <Comment.Avatar as={LevelIcon} level={30} />
      <Comment.Content>
        <Comment.Author>HangOver</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>

        <Comment.Text className="farsi" as={Message} color="black">
          صورت عدم دریافت چیپ, تا 20 دقیقه پول تا ساعاتی بعد میاد تو حساب بانکی
          تون. در غیر این صورت بعد گذشت 24 ساعت به دیپارتمان خرید انلاین چیپ
          تیکت بزنید.
        </Comment.Text>
      </Comment.Content>
    </Comment>
    <Comment>
      <Comment.Avatar as={LevelIcon} level={0} />
      <Comment.Content>
        <Comment.Author>Admin</Comment.Author>
        <Comment.Metadata>
          <span>Yesterday at 12:30AM</span>
        </Comment.Metadata>

        <Comment.Text className="farsi" as={Message} color="black">
          صورت عدم دریافت چیپ, تا 20 دقیقه پول تا ساعاتی بعد میاد تو حساب بانکی
          تون. در غیر این صورت بعد گذشت 24 ساعت به دیپارتمان خرید انلاین چیپ
          تیکت بزنید.
        </Comment.Text>
      </Comment.Content>
    </Comment>
  </Comment.Group>
);

export default CommentExampleMinimal;
