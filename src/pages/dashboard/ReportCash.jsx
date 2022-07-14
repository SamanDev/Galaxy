import React, { useEffect, useState } from "react";
import { List, Divider } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
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
        mode.replace(/ /g, "") + "Cashout"
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
  }, []);
  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <List divided inverted size="small" className="mylist">
        {data.map((item, i) => {
          return (
            <List.Item key={i}>
              {prop.mode == "Transfer" ? (
                <>
                  <List.Content>
                    <List.Description className="rightfloat">
                      {convertDateToJalali(item.createDate)}

                      <div className="text-end pad10tb">
                        From Casino To HangOver
                      </div>
                    </List.Description>
                    <List.Description>
                      <AmountColor
                        amount={item.amount}
                        sign={item.endBalance - item.startBalance}
                      />
                    </List.Description>
                  </List.Content>
                </>
              ) : (
                <>
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
                      />
                      <div>
                        {item.mode} {item.gateway && " - " + item.gateway}
                      </div>
                      {(prop.mode == "BTC" ||
                        prop.mode == "USDT" ||
                        prop.mode == "PerfectMoney") && (
                        <div className="cashlist">
                          Amount &nbsp;
                          <span className="text-gold">
                            ${doCurrency(item.amount)}
                          </span>
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
                </>
              )}
            </List.Item>
          );
        })}
      </List>
    );
  }
};

export default Report;
