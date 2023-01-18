import React, { useState, useEffect } from "react";
import {
  Label,
  Input,
  Header,
  Divider,
  Icon,
  Button,
  Segment,
  Message,
  List,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Reward from "../../../utils/Reward";
import {
  doCurrency,
  levelLeagueReward,
  levelLeagueList,
  haveAdmin,
  haveModerator,
} from "../../../const";
import MenuLoader from "../../../utils/menuLoader";
import Balance from "./userbalance";
import { adminGetService } from "../../../services/admin";
import { tr } from "date-fns/locale";

const depositArea = (prop) => {
  const [data, setData] = useState([]);
  const loginToken = JSON.parse(localStorage.getItem("loginToken"));

  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    try {
      setLoading(true);
      const res = await adminGetService(
        "getUsersByAdmin?name=username&page=1&number=1&&contain=true&value=" +
          prop.username
      );
      if (res.status === 200) {
        if (res.data.users.length > 0) {
          console.log(res.data.users[0]);
          setData(res.data.users[0]);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  useEffect(() => {
    handleGetReports();
  }, []);

  var totalReward = 0;
  if (loading) {
    return (
      <>
        <Segment
          inverted
          padded="very"
          style={{
            paddingBottom: 50,
            boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
          }}
        >
          <MenuLoader />
        </Segment>
      </>
    );
  } else {
    return (
      <>
        <Segment
          inverted
          padded="very"
          style={{
            paddingBottom: 50,
            boxShadow: "0 40px 50px rgba(81,88,95,.6549019607843137)",
            lineHeight: "130%",
          }}
        >
          {(haveAdmin(loginToken?.roles) ||
            haveModerator(loginToken?.roles)) && (
            <Button
              as={Link}
              to={"/admin/" + data.username}
              target="_blank"
              color="red"
            >
              Open Profile
            </Button>
          )}
          <Balance data={data} />
          <ul className="mm-listview menutitle-view">
            <li className="menutitle mm-listitem">
              <span className="mm-listitem__text">آخرین جوایز</span>
            </li>
            <li style={{ height: 200, overflow: "auto" }}>
              {data.userGifts.length == 0 && !prop.pending && (
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
              <div style={{ paddingLeft: 15 }}>
                {data.userGifts.map((x, i) => {
                  totalReward += levelLeagueReward(i);
                  var _lvl = 20 - i;
                  var _text = x.username;

                  return (
                    <div className={"rewardname"} mode={x.mode} key={i}>
                      <Reward item={x} color={true} />
                    </div>
                  );
                })}
              </div>
            </li>
          </ul>
        </Segment>
      </>
    );
  }
};

export default depositArea;
