import React, { useEffect, useState } from "react";
import { List, Divider, Segment } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import { getReportService } from "../../services/report";
import { doCurrency } from "../../const";
import ConvertCart from "../../utils/convertCart";
import NoData from "../../utils/noData";
const sumOf = (array, id) => {
  try {
    return array.reduce((sum, currentValue) => {
      if (currentValue.id <= id) {
        var _am = currentValue.cashoutDescriptionFromSet[0].amount;
      } else {
        var _am = 0;
      }
      return sum + _am;
    }, 0);
  } catch (error) {
    return array.reduce((sum, currentValue) => {
      console.log(currentValue);
    }, 0);
  }
};
const Report = (prop) => {
  const loginToken = prop.loginToken;
  const [data, setData] = useState([]);
  var gateway = prop.gateway
    ? prop.gateway
        .replace(/ /g, "")
        .replace("BTC", "Bitcoin")
        .replace("Toman", "IranShetab")
    : "";

  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportService(
        loginToken.id,
        prop.mode,
        gateway,

        prop.menu?.usd
      );
      if (res.status === 200) {
        var _res = res.data.filter((item) =>
          prop.menu?.usd
            ? item.endBalance2 != item.startBalance2
            : item.endBalance != item.startBalance
        );

        setData(_res);
      }
    } catch (error) {
      //console.log(error.message);
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
        {data.length == 0 && (
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
            return (
              <List.Item key={i}>
                {prop.menu?.usd ? (
                  <List.Content>
                    <List.Description className="float-end lh-lg">
                      {convertDateToJalali(item.createDate)}

                      <div className="text-end lh-lg">
                        <Status status={item.status} size="mini" />
                      </div>
                    </List.Description>
                    <List.Description className="lh-base">
                      <AmountColor
                        amount={item.amount2}
                        sign={item.endBalance2 - item.startBalance2}
                        className="text-gold"
                      />
                      {!prop.pending && (
                        <div>
                          {item.gateway && item.gateway}{" "}
                          {item.gateway == "Transfer" && (
                            <div>
                              {item.description
                                .replace("Remove transfer chip from:", "")
                                .replace("Remove usd transfer chip from:", "")
                                .replace(":", "")}
                            </div>
                          )}
                          {item.coin && " - " + item.coin}
                        </div>
                      )}

                      <div className="cashlist">
                        {(prop.gateway == "Bitcoin" ||
                          prop.gateway == "USDT" ||
                          prop.gateway == "PerfectMoney") && (
                          <>
                            Amount &nbsp;
                            <span className="text-gold">
                              ${doCurrency(120)}
                            </span>
                            <br />
                            Rate
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            <span className="text-gold">
                              {doCurrency(32520)}
                            </span>
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
                            Code
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            <span className="text-gold">
                              h43oi43o43hio4io43hi
                            </span>
                          </>
                        )}
                      </div>
                    </List.Description>
                    {item.cashoutDescriptionSet &&
                      item.gateway == "IranShetab" && (
                        <Segment inverted size="mini">
                          {item.cashoutDescriptionSet
                            .sort((a, b) => (a.id > b.id ? 1 : -1))
                            .map((f, i) => (
                              <div key={i.toString()}>
                                <span className="rightfloat">
                                  {convertDateToJalali(
                                    f.cashoutDescriptionFromSet[0].date
                                  )}
                                </span>
                                <span className="text-gold">
                                  {doCurrency(
                                    f.cashoutDescriptionFromSet[0].amount
                                  )}
                                </span>
                                <br />
                                <div className="farsi text-secondary rightfloat">
                                  واریز به <br />
                                  مجموع:{" "}
                                  <span className="text-gold">
                                    {doCurrency(
                                      sumOf(item.cashoutDescriptionSet, f.id)
                                    )}
                                  </span>
                                </div>
                                <span className="farsi">
                                  {f.cashoutDescriptionToSet[0].bankName}
                                </span>
                                <br />
                                <ConvertCart
                                  cartNo={
                                    f.cashoutDescriptionToSet[0].cardNumber
                                  }
                                  isLock={true}
                                />
                                <br />
                                <div className="farsi text-secondary float-end">
                                  از
                                </div>{" "}
                                <br />
                                <ConvertCart
                                  cartNo={
                                    f.cashoutDescriptionFromSet[0].cardNumber
                                  }
                                  isLock={true}
                                />
                                {item.cashoutDescriptionSet.length > i + 1 && (
                                  <Divider />
                                )}
                              </div>
                            ))}
                        </Segment>
                      )}
                  </List.Content>
                ) : (
                  <List.Content>
                    <List.Description className="float-end lh-lg">
                      {convertDateToJalali(item.createDate)}

                      <div className="text-end lh-lg">
                        <Status status={item.status} size="mini" />
                      </div>
                    </List.Description>
                    <List.Description className="lh-base">
                      <AmountColor
                        amount={item.amount}
                        sign={item.endBalance - item.startBalance}
                        className="text-gold"
                      />
                      {!prop.pending && (
                        <div>
                          {item.gateway && item.gateway}{" "}
                          {item.gateway == "Transfer" && (
                            <div>
                              {item.description
                                .replace("Remove transfer chip from:", "")
                                .replace(":", "")}
                            </div>
                          )}
                          {item.coin && " - " + item.coin}
                        </div>
                      )}

                      <div className="cashlist">
                        {(prop.gateway == "Bitcoin" ||
                          prop.gateway == "USDT" ||
                          prop.gateway == "PerfectMoney") && (
                          <>
                            Amount &nbsp;
                            <span className="text-gold">
                              ${doCurrency(120)}
                            </span>
                            <br />
                            Rate
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            <span className="text-gold">
                              {doCurrency(32520)}
                            </span>
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
                            Code
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            <span className="text-gold">
                              h43oi43o43hio4io43hi
                            </span>
                          </>
                        )}
                      </div>
                    </List.Description>
                    {item.cashoutDescriptionSet &&
                      item.gateway == "IranShetab" && (
                        <Segment inverted size="mini">
                          {item.cashoutDescriptionSet
                            .sort((a, b) => (a.id > b.id ? 1 : -1))
                            .map((f, i) => (
                              <div key={i.toString()}>
                                <span className="rightfloat">
                                  {convertDateToJalali(
                                    f.cashoutDescriptionFromSet[0].date
                                  )}
                                </span>
                                <span className="text-gold">
                                  {doCurrency(
                                    f.cashoutDescriptionFromSet[0].amount
                                  )}
                                </span>
                                <br />
                                <div className="farsi text-secondary rightfloat">
                                  واریز به <br />
                                  مجموع:{" "}
                                  <span className="text-gold">
                                    {doCurrency(
                                      sumOf(item.cashoutDescriptionSet, f.id)
                                    )}
                                  </span>
                                </div>
                                <span className="farsi">
                                  {f.cashoutDescriptionToSet[0].bankName}
                                </span>
                                <br />
                                <ConvertCart
                                  cartNo={
                                    f.cashoutDescriptionToSet[0].cardNumber
                                  }
                                  isLock={true}
                                />
                                <br />
                                <div className="farsi text-secondary float-end">
                                  از
                                </div>{" "}
                                <br />
                                <ConvertCart
                                  cartNo={
                                    f.cashoutDescriptionFromSet[0].cardNumber
                                  }
                                  isLock={true}
                                />
                                {item.cashoutDescriptionSet.length > i + 1 && (
                                  <Divider />
                                )}
                              </div>
                            ))}
                        </Segment>
                      )}
                  </List.Content>
                )}{" "}
              </List.Item>
            );
          }
        })}
      </List>
    );
  }
};

export default Report;
