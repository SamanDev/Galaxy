import React from "react";
import { List, Icon, Header } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";

import { convertDateToJalali } from "../../utils/convertDate";
const ListExampleInverted = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  return (
    <>
      {prop.title && (
        <ul className="mm-listview">
          <li className="menutitle menutitleinside mm-listitem"></li>
          <li className="menutitle menutitleinside mm-listitem">
            <span className="mm-listitem__text">{prop.title}</span>
          </li>
        </ul>
      )}

      <List divided inverted size="small" className="mylist">
        {loginToken.bankInfos.length == 0 && (
          <>
            <List.Item>
              <List.Content>
                <List.Description className="farsi text-center">
                  <Icon
                    circular
                    color="teal"
                    name="clipboard outline"
                    size="big"
                    inverted
                  />
                  <br />
                  <br />
                  هیچ رکوردی یافت نشد.
                </List.Description>
              </List.Content>
            </List.Item>
          </>
        )}
        {loginToken?.bankInfos.map((item, i) => {
          return (
            <List.Item key={i}>
              <List.Content>
                <List.Description className="rightfloat">
                  {convertDateToJalali(item.date)}
                </List.Description>
                <List.Description>
                  <AmountColor amount="بانک ملّی ایران" className="farsi" />

                  <div className="cashlist">
                    Cart No &nbsp;&nbsp;
                    <span className="text-gold">{item.cardNumber}</span>
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
          );
        })}
      </List>
    </>
  );
};

export default ListExampleInverted;
