import React, { useEffect, useState } from "react";
import { List, Divider, Button } from "semantic-ui-react";
import Status from "../../../utils/Status";
import MenuLoader from "../../../utils/menuLoader";
import { convertDateToJalali } from "../../../utils/convertDate";
import AmountColor from "../../../utils/AmountColor";
import { getReportService } from "../../../services/report";
import { doCurrency } from "../../../const";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const dataReport = ["deposit", "cashout", "transfer"];
const getGateways = JSON.parse(localStorage.getItem("getGateways"));
const Report = (prop) => {
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));
  const [data, setData] = useState([]);
  const [mode, setMode] = useState(prop.mode);
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  console.log(state);
  const [loading, setLoading] = useState(false);
  const handleGetReports = async () => {
    setLoading(true);
    try {
      const res = await getReportService(prop?.user?.id, mode, mode);
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
  }, [mode]);

  if (loading) {
    return <MenuLoader />;
  } else {
    return (
      <span className="myaccount popupmenu ">
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={state}
          direction="horizontal"
        />

        <Button.Group widths={dataReport.length}>
          {dataReport.map((item, i) => {
            return (
              <Button
                key={i}
                active={mode == item ? true : false}
                onClick={() => setMode(item)}
              >
                {item}
              </Button>
            );
          })}
        </Button.Group>
        <List divided inverted size="small" className="mylist">
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
                    <a
                      href="#"
                      onClick={() =>
                        prop.addTabData(item.username, getGateways)
                      }
                    >
                      {item.username}
                    </a>
                    <br />
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
                      {item.mode} - {item.gateway}
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
