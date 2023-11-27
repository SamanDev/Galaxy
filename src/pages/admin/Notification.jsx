import React, { useEffect, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";

import Swal from "sweetalert2";

import { notification } from "../../services/admin";

function Admin(prop) {
  const [cashUser, setCashUser] = React.useState("hangover2");
  const [cashLoad, setCashLoad] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [notMessage, setNotMessage] = React.useState("");

  const setNotTitle = (e) => {
    setTitle(e.target.value);
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
      "ev1yB74FUpuepGoGPDvTvY:APA91bG1iseLX2vMw-KuVOs18coCvF7qfiFmQY14U1yOdpJK6vgTf14qs_Z0Fo9Qin04cxRqz3HhQvwMxHOxgj2gJxYouOc0f3-x2x7TnUx0F1_hgQXg1dkieeMFdeAon0WtbEh_wr-1";
    var notification2 = {
      title: title,
      body: notMessage,
      icon: image,
      dir: "rtl",
      actions: [{ action: "archive", title: "Archive" }],
    };

    fetch("https://fcm.googleapis.com/fcm/send", {
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
      });
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
          <input
            value={notMessage}
            className="farsi"
            onChange={setNotMessageVal}
          />
        </Form.Field>
        <Form.Field>
          <label>Image</label>
          <img src={image} />
          <select value={image} onChange={setNotImage}>
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
