import React, { useState, useEffect } from "react";
import { Divider } from "semantic-ui-react";

import { cashierService } from "../../services/cashier";

const depositArea = (prop) => {
  const [user, setUser] = useState(false);
  const handleGetReports = async () => {
    try {
      var newValues = {
        orderId: prop.id,
        mode: "cashoutdetails",
      };
      const res = await cashierService(newValues, "cardService/cashout", "");
      if (res.status === 200) {
        if (res.data.users.length > 0) {
          setUser(
            res.data.users.filter(
              (item) => item.username == prop.item.username
            )[0]
          );
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    handleGetReports();
  }, []);
  if (!user) {
    return <>loadings</>;
  } else {
    return (
      <Segment inverted size="mini">
        {item.cashoutDescriptionSet
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((f, i) => (
            <div key={i.toString()}>
              <span className="rightfloat">
                {convertDateToJalali(f.cashoutDescriptionFromSet[0].date)}
              </span>
              <span className="text-gold">
                {doCurrency(f.cashoutDescriptionFromSet[0].amount)}
              </span>
              <br />
              <div className="farsi text-secondary rightfloat">
                واریز به <br />
                مجموع:{" "}
                <span className="text-gold">
                  {doCurrency(sumOf(item.cashoutDescriptionSet, f.id))}
                </span>
              </div>
              <span className="farsi">
                {f.cashoutDescriptionToSet[0].bankName}
              </span>
              <br />
              <ConvertCart
                cartNo={f.cashoutDescriptionToSet[0].cardNumber}
                isLock={true}
              />
              <br />
              <div className="farsi text-secondary float-end">از</div> <br />
              <ConvertCart
                cartNo={f.cashoutDescriptionFromSet[0].cardNumber}
                isLock={true}
              />
              {item.cashoutDescriptionSet.length > i + 1 && <Divider />}
            </div>
          ))}
      </Segment>
    );
  }
};

export default depositArea;
