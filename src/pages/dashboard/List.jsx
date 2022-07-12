import React from "react";
import { List, Divider, Header } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";
const ListExampleInverted = (prop) => (
  <>
    {prop.title && (
      <ul className="mm-listview">
        <li className="menutitle menutitleinside mm-listitem"></li>
        <li className="menutitle menutitleinside mm-listitem">
          <span className="mm-listitem__text">{prop.title}</span>
        </li>
      </ul>
    )}

    <List divided inverted relaxed size="mini" className="mylist">
      <List.Item>
        <List.Content>
          <List.Description style={{ float: "right" }}>
            <div className="date">7/5/2022 00:02</div>
            <div className="text-end">
              <Status status="Done" color="green" size="mini" />
            </div>
          </List.Description>
          <List.Description>
            <AmountColor amount="بانک ملّی ایران" className="farsi" />

            <div className="cashlist">
              Cart No &nbsp;&nbsp;
              <span className="text-gold">6104338910794789</span>
              <br />
              Hesab No &nbsp;
              <span className="text-gold">8910794789</span>
              <br />
              Sheba No &nbsp;
              <span className="text-gold">502250225022505050225021</span>
            </div>
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
  </>
);

export default ListExampleInverted;
