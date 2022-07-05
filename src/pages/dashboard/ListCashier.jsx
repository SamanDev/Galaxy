import React from "react";
import { List, Divider } from "semantic-ui-react";
import Status from "../../utils/Status";
import AmountColor from "../../utils/AmountColor";
import Accordion from "../../pages/dashboard/Accordion";
import { doCurrency } from "../../const";
const ListExampleInverted = (prop) => (
  <List inverted relaxed size="mini" className="mylist">
    {prop.mode == "Transfer" ? (
      <>
        <List.Item>
          <List.Content>
            <List.Description style={{ float: "right" }}>
              <div className="date text-end">7/5/2022 00:02</div>
              <div className="text-end">From Casino To HangOver</div>
            </List.Description>
            <List.Description>
              <AmountColor amount="+ 12,168,347" />
            </List.Description>
            <Status status="Done" color="green" size="mini" />
          </List.Content>
        </List.Item>
        <Divider inverted fitted />
        <List.Item>
          <List.Content>
            <List.Description style={{ float: "right" }}>
              <div className="date text-end">7/5/2022 00:02</div>
              <div className="text-end">From Casino To HangOver</div>
            </List.Description>
            <List.Description>
              <AmountColor amount="- 12,168,347" />
            </List.Description>
            <Status status="Pending" color="teal" size="mini" />
          </List.Content>
        </List.Item>
        <Divider inverted fitted />
        <List.Item>
          <List.Content>
            <List.Description style={{ float: "right" }}>
              <div className="date text-end">7/5/2022 00:02</div>
              <div className="text-end">From Casino To HangOver</div>
            </List.Description>
            <List.Description> + 12,168,347</List.Description>
            <Status status="Canceled" color="red" size="mini" />
          </List.Content>
        </List.Item>
      </>
    ) : (
      <>
        <List.Item>
          <List.Content>
            <List.Description style={{ float: "right" }}>
              <div className="date">7/5/2022 00:02</div>
              <div className="text-end">
                <Status status="Done" color="green" size="mini" />
              </div>
            </List.Description>
            <List.Description>
              <AmountColor amount="6000000" />
              {(prop.mode == "BTC" ||
                prop.mode == "USDT" ||
                prop.mode == "PerfectMoney") && (
                <div className="cashlist">
                  Amount &nbsp;
                  <span className="text-gold">${doCurrency(120)}</span>
                  <br />
                  Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <span className="text-gold">{doCurrency(32520)}</span>
                  {prop.mode != "PerfectMoney" && (
                    <>
                      <br />
                      Wallet &nbsp;&nbsp;&nbsp;{" "}
                      <span className="text-gold">
                        hoh34ojhio43hoih43oi43o43hio4io43hi
                      </span>
                    </>
                  )}
                </div>
              )}
            </List.Description>
            {prop.mode == "Toman" && (
              <Status status="Info" color="blue" size="mini" />
            )}
          </List.Content>
        </List.Item>
        <Divider inverted fitted />
        <List.Item>
          <List.Content>
            <List.Description style={{ float: "right" }}>
              <div className="date">7/5/2022 00:02</div>
              <div className="text-end">
                <Status status="Pending" color="teal" size="mini" />
              </div>
            </List.Description>
            <List.Description>
              <AmountColor amount="6000000" />
              {(prop.mode == "BTC" ||
                prop.mode == "USDT" ||
                prop.mode == "PerfectMoney") && (
                <div className="cashlist">
                  Amount &nbsp;
                  <span className="text-gold">${doCurrency(120)}</span>
                  <br />
                  Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <span className="text-gold">{doCurrency(32520)}</span>
                  {prop.mode != "PerfectMoney" && (
                    <>
                      <br />
                      Wallet &nbsp;&nbsp;&nbsp;{" "}
                      <span className="text-gold">
                        hoh34ojhio43hoih43oi43o43hio4io43hi
                      </span>
                    </>
                  )}
                </div>
              )}
            </List.Description>
          </List.Content>
        </List.Item>
      </>
    )}
  </List>
);

export default ListExampleInverted;
