import React, { useEffect, useState } from "react";
import { List, Divider, Icon } from "semantic-ui-react";
import Status from "../../../../utils/Status";
import MenuLoader from "../../../../utils/menuLoader";
import { convertDateToJalali } from "../../../../utils/convertDate";
import AmountColor from "../../../../utils/AmountColor";
import { getReportService } from "../../../../services/report";

const Report = (prop) => {
  const loginToken = prop.loginToken;
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const handleGetReports = async () => {
    //setLoading(true);
    try {
      const res = await getReportService(
        loginToken.id,
        prop.mode,
        prop.gateway
      );
      if (res.status === 200) {
        var _res = res.data?.sort((a, b) =>
          a.updateDate < b.updateDate ? 1 : -1
        );
        setData(_res);
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
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
            if (item.startBalance != item.endBalance || 1 == 1) {
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
                        {item.mode} {item.gateway && <>({item.gateway})</>}
                      </div>
                    </List.Description>
                    {item.cashoutDescriptionSet && (
                      <div
                        id={"carouselExampleInterval" + item.id}
                        className="carousel slide text-center"
                        style={{ width: "500px" }}
                      >
                        <div className="carousel-inner">
                          {item.cashoutDescriptionSet.map((f, i) => (
                            <div
                              key={i.toString()}
                              className={
                                i == 0
                                  ? "carousel-item active"
                                  : "carousel-item "
                              }
                            >
                              <Grid columns={2} relaxed="very">
                                <Grid.Column>
                                  <CartFormat
                                    row={f.cashoutDescriptionFromSet[0]}
                                    amount={true}
                                    className="text-center"
                                  />
                                </Grid.Column>
                                <Grid.Column>
                                  <CartFormat
                                    row={f.cashoutDescriptionToSet[0]}
                                    className="text-center"
                                  />
                                </Grid.Column>
                              </Grid>
                              <Divider vertical>
                                &rarr;
                                {item.cashoutDescriptionSet.length}
                              </Divider>
                            </div>
                          ))}
                        </div>
                        {item.cashoutDescriptionSet.length > 1 && (
                          <>
                            <button
                              className="carousel-control-prev"
                              type="button"
                              data-bs-target={
                                "#carouselExampleInterval" + item.id
                              }
                              data-bs-slide="prev"
                            >
                              <Icon
                                className="carousel-control-prev-icon text-danger-emphasis"
                                aria-hidden="true"
                                name="arrow left"
                              />

                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                              className="carousel-control-next"
                              type="button"
                              data-bs-target={
                                "#carouselExampleInterval" + item.id
                              }
                              data-bs-slide="next"
                            >
                              <Icon
                                className="carousel-control-prev-icon text-danger-emphasis"
                                aria-hidden="true"
                                name="arrow right"
                              />
                              <span className="visually-hidden">Next</span>
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </List.Content>
                </List.Item>
              );
            }
          })}
        </List>
      </span>
    );
  }
};

export default Report;
