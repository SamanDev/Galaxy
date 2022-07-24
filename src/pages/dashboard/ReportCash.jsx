import React, { useEffect, useState } from "react";
import { List, Divider } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import QR from "../../utils/qr";
import { getReportService } from "../../services/report";
import { doCurrency } from "../../const";

const Report = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetReports = async (mode) => {
    setLoading(true);
    try {
      const res = await getReportService(
        loginToken.id,
        "Cashout",
        mode.replace(/ /g, "")
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReports(prop.mode);
  }, [prop.refresh]);
  var canShow = true;
  var canShowPending = true;
  if (loading) {
    if (!prop.pending) {
      return <MenuLoader />;
    } else {
      return null;
    }
  } else {
    return (
      <List divided inverted size="small" className="mylist">
        {data.map((item, i) => {
          if ((item.status == "Pending" || !prop.pending) && canShow) {
            if (prop.pending) {
              canShow = false;
            }
            if (item.status == "Pending" && i > 0) {
              canShowPending = false;
            }
            return (
              <List.Item key={i}>
                <List.Content>
                  <List.Description className="rightfloat">
                    {convertDateToJalali(item.createDate)}

                    <div className="text-end pad10tb">
                      <Status status={item.status} size="mini" />
                    </div>
                  </List.Description>
                  <List.Description>
                    <AmountColor
                      amount={item.amount}
                      sign={item.endBalance - item.startBalance}
                      className="text-gold"
                    />
                    {!prop.pending && (
                      <div>
                        {item.gateway && item.gateway}{" "}
                        {item.coin && " - " + item.coin}
                      </div>
                    )}

                    <div className="cashlist">
                      {(prop.mode == "BTC" ||
                        prop.mode == "USDT" ||
                        prop.mode == "PerfectMoney") && (
                        <>
                          Amount &nbsp;
                          <span className="text-gold">${doCurrency(120)}</span>
                          <br />
                          Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span className="text-gold">{doCurrency(32520)}</span>
                        </>
                      )}
                      {prop.mode == "PerfectMoney" && (
                        <>
                          <br />
                        </>
                      )}
                      {(prop.mode == "VisaGiftCode" ||
                        prop.mode == "PerfectMoney") && (
                        <>
                          Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span className="text-gold">
                            h43oi43o43hio4io43hi
                          </span>
                        </>
                      )}
                    </div>
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          }
        })}
      </List>
    );
  }
};

export default Report;
