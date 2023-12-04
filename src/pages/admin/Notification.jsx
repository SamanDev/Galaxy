import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

import { notification } from "../../services/admin";
import { doCurrency } from "../../const";

function Admin(prop) {
  const [cashUser, setCashUser] = React.useState("hangover2");
  const [cashLoad, setCashLoad] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [notMessage, setNotMessage] = React.useState("");
  const siteInfo = prop.siteInfo;
  const loginToken = prop.loginToken;
  siteInfo?.galaxyPassSet?.sort((a, b) => (a.id > b.id ? 1 : -1));

  const setNotTitle = (e) => {
    setTitle(e.target.value + " شروع شد");
    if (e.target.value == "لیگ روزانه") {
      var rules = siteInfo?.dailyLeagueSet[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/league.png");
    }
    if (e.target.value == "گلکسی پَس") {
      var rules = siteInfo?.galaxyPassSet[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/gpass.png");
    }
    if (e.target.value == "میز VIP") {
      var rules = siteInfo?.vipTables[0];
      setNotMessage(
        doCurrency(rules.totalRewards) + " تومان\nبرای هر بازیکن\n"
      );
      setImage("https://www.galaxypoker.vip/assets/images/icons/vip.png");
    }
  };
  const setNotImage = (e) => {
    setImage(
      "https://www.galaxypoker.vip/assets/images/icons/" +
        e.target.value +
        ".png"
    );
  };
  const setNotUsser = (e) => {
    setCashUser(e.target.value);
  };
  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
  };
  const sendNot = (e, data) => {
    if (notMessage == "") {
      return false;
    }
    setCashLoad(true);
    var key =
      "AAAANfV_1y4:APA91bFHck-BWMnLILoZAEdxkgMcrMt8ejdEPds67021cn24H2t1aXuP9_FiKlY970_MbHeDCAqNWv58oFiRBa3nBkFB_SIGfmEjqjMjOOTG6k3dYyd-syETfSFBZtigxCZS4t1HrLww";
    var to =
      "dGcxXqSf79ngUr2-BYzX6i:APA91bEJj79IpURgSk5m7OnsNhoTn_IIYjNw8BnR2GMAC_mxxmL8YrdagiY91njhsi2EFGWLGDhuQ7wrZUYLkiRPuueSLIVWx_GDHqgIqTMgEAmEheAZ5UH1ADbVK-ijMzVqeNexrFDS";
    var notification2 = {
      title: title,
      body: notMessage,
      icon: image,
      dir: "rtl",
      actions: [{ action: "archive", title: "Archive" }],
    };

    /*  fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=" + key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: notification2,
        to: to,
      }),
    })
      .then(function (response) {
        console.log(response);
        setCashLoad(false);
      })
      .catch(function (error) {
        console.error(error);
      }); */
    notification(cashUser, title, notMessage, image).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {
          setCashLoad(false);
        });
      }
    });
  };
  const titleList =
    "لیگ روزانه,تورنومنت ۲۵+۲۵,گلکسی پَس,میز VIP,هدایای گلکسی".split(",");
  const imgList = "gift3,gift2,gift1".split(",");

  return (
    <>
      <Form>
        <Form.Field>
          <label>UserName: </label>
          <input value={cashUser} onChange={setNotUsser} />
        </Form.Field>
        <Form.Field>
          <label>Title: </label>
          <input value={title} className="farsi" onChange={setNotTitle} />
          <select value={title} className="farsi" onChange={setNotTitle}>
            <option value={""}></option>
            {titleList.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </Form.Field>
        <Form.Field>
          <label>Meessage</label>
          <textarea
            value={notMessage}
            className="farsi"
            onChange={setNotMessageVal}
          />
        </Form.Field>
        <Form.Field className="hiddenmenu">
          <label>Image</label>
          <img src={image} />
          <select value={image} onChange={setNotImage}>
            <option value={""}></option>
            {imgList.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </Form.Field>
        <Button
          type="submit"
          loading={cashLoad}
          disabled={cashLoad}
          color="red"
          fluid
          onClick={sendNot}
          style={{ marginTop: 20 }}
        >
          Send
        </Button>
      </Form>
    </>
  );
}

export default Admin;
