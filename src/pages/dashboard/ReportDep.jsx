import React, { useEffect, useState } from "react";
import { List, Icon } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import QR from "../../utils/qr";
import { getReportService } from "../../services/report";
import { doCurrency } from "../../const";
import NoData from "../../utils/noData";
const Report = (prop) => {
  const loginToken = prop.loginToken;
  const [data, setData] = useState([]);
  var gateway = prop.gateway.replace(/ /g, "").replace("BTC", "Bitcoin");
  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportService(loginToken.id, prop.mode, gateway);
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
    handleGetReports();
  }, [loginToken]);
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
        {data.length == 0 && !prop.pending && (
          <>
            <List.Item>
              <List.Content>
                <NoData msg="هیچ رکوردی یافت نشد." />
              </List.Content>
            </List.Item>
          </>
        )}
        {data.map((item, i) => {
          if ((item.status == "Pending" || !prop.pending) && canShow) {
            if (prop.pending) {
              canShow = false;
            }
            if (item.status == "Pending" && i > 0) {
              canShowPending = false;
            }
            try {
              var desc = JSON.parse(item.description);
            } catch (error) {}

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
                      {(gateway == "Bitcoin" ||
                        gateway == "USDT" ||
                        gateway == "PerfectMoney") && (
                        <>
                          Amount &nbsp;
                          <span className="text-gold">
                            ${doCurrency(desc.dollarAmount)}
                          </span>
                          <br />
                          Rate &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span className="text-gold">
                            {doCurrency(desc.dollarPrice)}
                          </span>
                        </>
                      )}
                      {gateway == "PerfectMoney" && (
                        <>
                          <br />
                        </>
                      )}
                      {(gateway == "VisaGiftCode" ||
                        gateway == "PerfectMoney") && (
                        <>
                          Code &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <span className="text-gold">
                            h43oi43o43hio4io43hi
                          </span>
                        </>
                      )}
                      {(gateway == "Bitcoin" || gateway == "USDT") &&
                        canShowPending && (
                          <>
                            <QR note={item} doCurrency={doCurrency} />
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
