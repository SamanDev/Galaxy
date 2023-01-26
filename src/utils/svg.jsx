import React from "react";
import { levelClass, levelClassInside } from "../const";
const LevelIcon = (prop) => {
  if (prop.mode == "gpass") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = levelClass(prop.level - 1) + " icn";

    if (prop.text == "big") {
      _class = _class + " big";
      const loginToken = JSON.parse(localStorage.getItem("loginToken"));

      if (loginToken) {
        _txt = loginToken.glevel;
      } else {
        _txt = 15;
      }
    }
    if (prop.iconamin) {
      _class = _class + " " + prop.iconamin;
    }

    var _class2 = "";
    if (prop.amin) {
      _class2 = prop.amin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/gpass/glvl" + _txt + ".png"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + " gpassicon icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }

  if (prop.mode == "vip") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big icn";
    }

    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/vip/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }

  if (prop.mode == "tournament") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/tournament/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "kingof") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/kingof/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "bonus") {
    return (
      <span className="iconarea">
        <img
          src={"/assets/bonus.svg"}
          className="icn"
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "commission") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "rakebackicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = _class;
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className={_class}
          style={{
            width: prop.width,
            height: "auto",
          }}
        >
          <img
            src={"/assets/commission.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              width: prop.width,
              height: "auto",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "rakeback") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "rakebackicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = _class;
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/icons/rackback.png"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + " gpassicon icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "league") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = " ";
    if (prop.text == "big") {
      _class = _class + " big";
    }

    if (prop.amin) {
      _class = _class + " " + prop.amin;
    }
    var _class2 = "";
    if (prop.iconamin) {
      _class2 = _class2 + " " + prop.iconamin.replace("charkhesh", "");
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <div
          style={{
            transform: "scale(.8)",
            position: "absolute",
            zIndex: 300000,
            width: prop.width,
            height: prop.width,
            textAlign: "center",
          }}
        >
          <svg
            version="1.1"
            className="leagueicon icn"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 510.738 510.738"
            style={{
              width: prop.width,
              height: prop.width,
            }}
          >
            <text
              x="255"
              y="250"
              className={
                "leagueicontext text" +
                _txt.toString().length +
                " slow " +
                _class
              }
            >
              {_txt}
            </text>
          </svg>
        </div>
        <img
          src={"/assets/images/svg/league/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: prop.width,
            position: "relative",
            zIndex: 1,
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "gift3") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/gift/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "gift1") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className="inline animated"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src={"/assets/gift.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              width: prop.width,
              height: "auto",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "gift2") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 = _class2 + " " + prop.iconamin;
    }
    return (
      <span onClick={prop.onClick} className="iconarea">
        <span
          className="inline animated"
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
            filter: "hue-rotate(-90deg)",
          }}
        >
          <img
            src={"/assets/gift.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              width: prop.width,
              height: "auto",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
  if (prop.mode == "gifts") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/icons/gifts.png"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          className={_class2 + "  icn"}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
      </div>
    );
  }

  if (prop.mode == "topplayer") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div
        onClick={prop.onClick}
        className="iconarea"
        style={{
          width: prop.width,
          height: "auto",
          textAlign: "left",
        }}
      >
        <img
          src={"/assets/images/svg/topplayer/icon.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        />
        <span
          style={{
            width: prop.width,
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        >
          <img
            src={"/assets/topplayer.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              position: "absolute",

              transform: "translateX(25%) scale(.6) rotate(5deg)",
              transformOrigin: "center right",
            }}
          />
        </span>
        <span
          style={{
            width: prop.width,
            height: "auto",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <img
            src={"/assets/chipblack.svg"}
            width={prop.width}
            height={prop.width}
            alt={prop.mode}
            style={{
              position: "absolute",

              transform: "translateX(-25%) scale(.5) rotate(-5deg)",
              transformOrigin: "center left",
            }}
          />
        </span>
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "cashout") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "vipicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div
        onClick={prop.onClick}
        className="iconarea"
        style={{
          width: prop.width,
          height: "auto",
          textAlign: "left",
        }}
      >
        <img
          src={"/assets/images/svg/topplayer/cashout.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
            position: "relative",
            zIndex: 1,
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }
  if (prop.mode == "deposit") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = "leagueicon";
    if (prop.text == "big") {
      _class = _class + " big";
    }
    var _class2 = _class;
    if (prop.iconamin) {
      var _class2 =
        _class +
        " " +
        prop.iconamin.replace("charkhesh", "").replace("inline", "") +
        " tada";
    }
    return (
      <div onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/svg/topplayer/deposit.svg"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />
        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </div>
    );
  }

  if (prop.mode == "levels") {
    var _txt = prop.number ? prop.number : prop.level;
    var _class = levelClass(_txt - 1);
    if (prop.text == "big") {
      const loginToken = JSON.parse(localStorage.getItem("loginToken"));

      if (loginToken) {
        _txt = loginToken.level;
      } else {
        _txt = 90;
      }
    }

    var _id = _txt + _class.replace(/ /g, "") + Math.floor(Math.random() * 100);
    return (
      <span onClick={prop.onClick} className="iconarea">
        <img
          src={"/assets/images/stars/lvl" + _txt + ".png"}
          width={prop.width}
          height={prop.width}
          alt={prop.mode}
          style={{
            width: prop.width,
            height: "auto",
          }}
        />

        {prop.text != "big" && prop.text != "" && (
          <div className="iconlabel">{prop.text}</div>
        )}
      </span>
    );
  }
};

export default LevelIcon;
