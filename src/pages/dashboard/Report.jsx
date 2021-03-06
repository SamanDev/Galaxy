import React, { useEffect, useState } from "react";
import { List, Divider, Icon } from "semantic-ui-react";
import Status from "../../utils/Status";
import MenuLoader from "../../utils/menuLoader";
import { convertDateToJalali } from "../../utils/convertDate";
import AmountColor from "../../utils/AmountColor";
import { getReportService } from "../../services/report";
import { doCurrency } from "../../const";

const Report = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportService(loginToken.id, "", prop.mode);
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
  }, []);
  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <span className="myaccount popupmenu">
        <List divided inverted size="small" className="mylist">
          {data.length == 0 && !prop.pending && (
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
          {data.map((item, i) => {
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
                    <AmountColor amount={item.startBalance} />
                    <br />
                    <AmountColor
                      amount={item.amount}
                      sign={item.endBalance - item.startBalance}
                    />
                    <br />
                    --------------------
                    <br />
                    <AmountColor
                      amount={item.endBalance}
                      className="text-gold"
                    />
                    <div className="pad10tb">
                      {item.mode} ({item.gateway})
                    </div>
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </span>
    );
  }
};

export default Report;
