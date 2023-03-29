import React, { useEffect, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";

//const AdminLayout = React.lazy(() => import("./layouts/admin/Index"));
const RightPanel = React.lazy(() => import("./Panel"));

import { Modal } from "semantic-ui-react";
import {
  GetMenu,
  haveAdmin,
  haveModerator,
  getEvent,
  dayOfTournament,
  startServiceWorker,
} from "./const";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";
import { Link } from "react-router-dom";
import { useUser, useSiteInfo } from "./hook/userHook";

import $ from "jquery";
import { Route, Routes } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import AdminLayout from "./layouts/admin/Index";
import { useNavigate } from "react-router-dom";
import MenuLoader from "./utils/menuLoader";
//import LoginArea from "./layouts/admin/auth/Login.jsx";
const LoginArea = React.lazy(() => import("./layouts/admin/auth/Login.jsx"));
const RegisterArea = React.lazy(() =>
  import("./layouts/admin/auth/Register.jsx")
);
const ForgetArea = React.lazy(() => import("./layouts/admin/auth/Forget.jsx"));
const UserArea = React.lazy(() =>
  import("./layouts/admin/auth/user.component")
);

import DCArea from "./layouts/admin/auth/dc.component";

import GalaxyIcon from "./utils/svg";
import { siteMethodDef } from "./const";
import AnimIcon from "./utils/inviteIcon";
import GameBox from "./utils/GameBox";
import ConfettiArea from "./utils/partyclick";
import { Dimmer, Loader } from "semantic-ui-react";
import UserWebsocket from "./services/user.websocket";
import { loginService } from "./services/auth";
import eventBus from "./services/eventBus";
import { cashierService } from "./services/cashier";
import ChildComp from "./Components";

const moment = require("moment");
var menu = "no";
var api;
var setsize = false;
var setbindrew = false;
var nowDay = moment().isoWeekday();
const animateCSS = (element, animation, prefix = "") =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    if (node) {
      node.classList.remove(`${prefix}animated`, "hiddenmenu");
      node.classList.add(`${prefix}animated`, animationName);
      function handleAnimationEnd(event) {
        event.stopPropagation();
        //node.classList.remove(`${prefix}newel`, animationName);
        //node.classList.add(`${prefix}animated`, "hiddenmenu");
        resolve("Animation ended");
      }
      setTimeout(() => {
        node.addEventListener("animationend", handleAnimationEnd, {
          once: true,
        });
      }, 500);

      // When the animation ends, we clean the classes and resolve the Promise
    }
  });

localStorage.removeItem("getGateways");
var finalMenu = "";

function App(prop) {
  const [refresh, setRefresh] = useState();
  const [loadingLogin, isLogin] = useIsLogin();

  const [isUser, setIsUser] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const [dcOpen, setDcOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [siteInfo] = useSiteInfo();

  const [activeMenu, setActiveMenu] = useState("");
  const [activePanel, setActivePanel] = useState(false);
  const [activeMenuOpen, setActiveMenuOpen] = useState(false);
  const [activeMenuOld, setActiveMenuOld] = useState(activeMenu);
  const navigate = useNavigate();
  var _event = getEvent(siteInfo);
  const location = useLocation();
  const [loginToken] = useUser();
  window.addEventListener("touchstart", { passive: true });
  const handleOpenTable = async (tableName) => {
    var values = { tableName: tableName };

    if (
      loginToken &&
      window.location.href.toString().indexOf("/games/poker") > -1
    ) {
      try {
        const res = await cashierService(values, "openTable");
      } catch (error) {}
    } else {
      localStorage.setItem("tableName", tableName);
      navigate("/games/poker");
    }
  };

  function reportWindowSize() {
    if (setsize) return false;
    setsize = true;

    $("body").removeAttr("style");
    setTimeout(() => {
      $("#lazyarea").removeAttr("id");
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;

      $("body").width(viewportWidth + "px");
      $("body").scrollLeft(0);
      $(".grid lord-icon").each(function () {
        var ww = $(this).closest(".ui").height();
        if (ww > viewportWidth / 1.5) {
          ww = viewportWidth - 5;
        } else {
          ww = ww / 1.3;
        }

        $(this).width(ww);
      });
      const navbar = document.getElementById("navbar");

      try {
        let pHeight = viewportHeight - navbar.offsetHeight;
        $("#content_section,#panelright").css({
          top: navbar.offsetHeight + "px",
        });
        if ($("body").hasClass("fullscreen")) {
          pHeight = viewportHeight;
          $("#content_section,#panelright").css({ top: 0 + "px" });
        }
        $(".gameicons").css({
          top: (viewportHeight - $(".gameicons").height()) / 2 + "px",
        });

        $("#root").height(viewportHeight + "px");
        let pHalf = pHeight / 2;
        if (pHalf < 250) {
          pHalf = 250;
        }
        $(".panelfull,.gamesec,#panelright").height(pHeight + "px");
        $(".panelhalf").height(pHalf + "px");
      } catch (error) {
        setTimeout(() => {
          setsize = false;
          reportWindowSize();
        }, 500);
      }
      $(".mm-panel--opened:visible")
        .unbind()
        .bind("scroll", function () {
          bindLastReward();
        });
      if (
        $(".mm-panel--opened:visible").find(".lazyarea").length > 0 &&
        $(".mm-panel--opened:visible").find("#lazyarea").length == 0
      ) {
        $(".mm-panel--opened:visible")
          .find(".mm-listview:first")
          .attr("id", "lazyarea");
      }
      $("#lazyareapael")
        .unbind()
        .bind("scroll", function () {
          bindLastReward();
          //forceCheck();
        });

      setsize = false;
    }, 100);
  }
  function bindActiveTable() {}
  function bindLastReward() {
    if (setbindrew) return false;
    setbindrew = true;
    console.log("bind");
    setTimeout(() => {
      $(".rewardname .iconarea > *")
        .unbind()
        .bind("click", function () {
          var _m = $(this).closest(".rewardname").attr("mode");
          if (_m.indexOf("gift") > -1) {
            _m = "giftarea";
          }
          if ($("." + _m, "").length > 0) {
            openPanel("." + _m, "");
          }
        });
      $(".rewardname .iconlabel")
        .addClass("text-gold clk")
        .unbind()
        .bind("click", function () {
          var _u = $(this).text();

          setUserProfile(_u);
          setUserOpen(true);
        });
      forceCheck();
      setbindrew = false;
    }, 500);
  }

  function getLinkId(str) {
    var _m;
    if (str.trim() == "دعوت دوستان") {
      _m = "invite";
    }
    if (str.trim() == "حساب کاربری") {
      _m = "settings";
    }
    if (str.trim() == "خرید چیپ") {
      _m = "deposit";
    }
    if (str.trim() == "تراکنش های مالی") {
      _m = "report";
    }
    if (str.trim() == "برداشت") {
      _m = "cashout";
    }
    return _m;
  }
  function bindAddLink() {
    $(".msgtext").each(function () {
      let text = $(this).text();

      let result = text
        .replace(
          / دعوت دوستان | حساب کاربری | خرید چیپ | تراکنش های مالی | برداشت /g,
          function (x) {
            return (
              "<span data-target='" +
              getLinkId(x) +
              "' class='farsi msglink interallink'>" +
              x +
              "</span>"
            );
          }
        )
        .replace(/کانال تلگرام/g, function (x) {
          return (
            "<a href='http://telegram.me/" +
            siteInfo.telegramChanel +
            "' class='farsi msglink' target='_blank'>" +
            x +
            "</a>"
          );
        })
        .replace(/ تلگرام | telegram /g, function (x) {
          return (
            "<a href='http://telegram.me/" +
            siteInfo.telegramSupport +
            "' class='farsi msglink' target='_blank'>" +
            x +
            "</a>"
          );
        });

      $(this).html(result);
      $(".interallink")
        .unbind()
        .bind("click", function () {
          var _m = $(this).attr("data-target");

          if ($("." + _m, "").length > 0) {
            openPanel("." + _m, "");
          }
        });
    });
  }
  const CompGen = (prop) => {
    return (
      <ChildComp
        loginToken={loginToken}
        siteInfo={siteInfo}
        openPanel={openPanel}
        openGame={openGame}
        setFirstOpen={setFirstOpen}
        bindLastReward={bindLastReward}
        activeMenuOpen={activeMenuOpen}
        navigate={navigate}
        closeMenu={closeMenu}
        {...prop}
      />
    );
  };

  function doMenu(menu, y, isPanel, isUser) {
    //if (finalMenu != "") return null;
    //console.log(finalMenu);

    if (getAccess(menu.getwaykey)) {
      if (!menu.submenu) {
        if (
          menu.idname != "admin" ||
          (haveAdmin(loginToken?.roles) && !loginToken?.logout) ||
          (haveModerator(loginToken?.roles) && !loginToken?.logout)
        ) {
          var addr = window.location.href.toString().split("/");

          return (
            <li
              key={y + menu.label}
              className={
                (menu.link == "/logout" &&
                  (!loginToken?.accessToken || loginToken?.logout)) ||
                (menu.link == "/" && addr[addr.length - 1] == "")
                  ? "hiddenmenu"
                  : "mm-listitem"
              }
            >
              {menu.label && !menu.component && (
                <Link
                  to={menu.link}
                  as="a"
                  onClick={() => closeMenu()}
                  className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text"
                >
                  {menu.image ? (
                    <>{menu.image}</>
                  ) : (
                    <>
                      {menu.icon && (
                        <>
                          {menu.icon.indexOf(".svg") == -1 ? (
                            <i
                              className={`${menu.icon} mx-3${
                                menu.icon.indexOf("fas ") == -1 &&
                                menu.icon.indexOf("fab ") == -1
                                  ? " icon"
                                  : ""
                              }`}
                            ></i>
                          ) : (
                            <i className=" mx-3">
                              <AnimIcon
                                width="60px"
                                height="70px"
                                scale="45"
                                stroke="25"
                                icon={menu.icon.split(".")[0]}
                              />
                            </i>
                          )}
                        </>
                      )}{" "}
                      <span
                        href="#"
                        className={
                          !menu.textclass
                            ? "farsi mymenu " + menu.idname
                            : "mymenu " + menu.idname
                        }
                      >
                        {menu.label}
                      </span>
                    </>
                  )}
                </Link>
              )}
              {menu.component && (
                <>
                  {menu.label && isPanel != "panel" ? (
                    <ul>
                      {menu.title && (
                        <li className="menutitle mm-listitem">
                          <span className="mm-listitem__text">
                            {menu.title}
                          </span>
                        </li>
                      )}
                      {activeMenu == menu.label && (
                        <li>
                          <span>
                            <CompGen menu={menu} />
                          </span>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <>
                      <span className="image">
                        {menu.title && (
                          <>
                            <ul className="mm-listview">
                              <li className="menutitle mm-listitem">
                                <span className="mm-listitem__text">
                                  {menu.title}
                                </span>
                              </li>
                              <li>
                                {activeMenu == menu.label && (
                                  <>
                                    <CompGen menu={menu} />
                                  </>
                                )}
                              </li>
                            </ul>
                          </>
                        )}
                      </span>
                    </>
                  )}
                </>
              )}
            </li>
          );
        }
      } else {
        return (
          <li key={y + menu.label} className={menu?.aria}>
            <span
              className={
                menu.link == "/logout" && !isUser ? "hiddenmenu" : null
              }
            >
              {menu.label}
              {menu.icongalaxy && (
                <span className="iicon">
                  <GalaxyIcon
                    mode={menu.icongalaxy}
                    level="1"
                    text="big"
                    classinside="iconinside0"
                    number=""
                    width="50px"
                  />
                </span>
              )}{" "}
              {menu.icon && !menu.icongalaxy && (
                <>
                  {menu.icon.indexOf(".svg") == -1 ? (
                    <i
                      className={`${menu.icon} mx-3${
                        menu.icon.indexOf("fas ") == -1 &&
                        menu.icon.indexOf("fab ") == -1
                          ? " icon"
                          : ""
                      }`}
                    ></i>
                  ) : (
                    <i className=" mx-3">
                      <AnimIcon
                        width="60px"
                        height="70px"
                        scale="45"
                        stroke="25"
                        icon={menu.icon.split(".")[0]}
                      />
                    </i>
                  )}
                </>
              )}{" "}
              <span
                className={
                  !menu.textclass ? "farsi mymenu " + menu.idname : "mymenu"
                }
              >
                {menu.label}
              </span>
              {menu.helper && (
                <small className="float-end text-danger ui black left pointing mini floating label myfloat">
                  {menu.helper}
                </small>
              )}
              {getBonus(menu.getwaykey, loginToken) > 0 &&
                (menu.bonus = "+" + getBonus(menu.getwaykey, loginToken) + "%")}
              {menu.bonus && menu.bonus != "0" && (
                <small
                  className="ui red  mini floating label myfloatmenu"
                  style={{ minWidth: "auto" }}
                >
                  {menu.bonus}
                </small>
              )}
            </span>

            <ul>
              {menu.title && (
                <li className="menutitle mm-listitem">
                  <span className="mm-listitem__text">{menu.title}</span>
                </li>
              )}
              {menu.submenu.map(function (submenu, i) {
                if (!submenu.submenu) {
                  if (
                    submenu.mode != "cashout" &&
                    getBonus(submenu.getwaykey, loginToken) > 0
                  ) {
                    submenu.bonus =
                      "+ " + getBonus(submenu.getwaykey, loginToken) + "%";
                  }
                  if (getAccess(submenu.getwaykey)) {
                    return (
                      <li key={i + menu.label} className={submenu?.aria}>
                        {submenu.image ? (
                          <>
                            {activeMenu == menu.label && (
                              <>
                                <LazyLoad
                                  offset={300}
                                  height={98}
                                  once
                                  throttle={30}
                                  className="item"
                                >
                                  <Link
                                    to={"/games/" + submenu.image}
                                    id={"open" + submenu.image}
                                    as="a"
                                    onClick={() => closeMenu()}
                                    style={{ padding: 0 }}
                                    className="mm-btn  mm-listitem__btn mm-listitem__text"
                                  >
                                    <GameBox
                                      game={submenu.image}
                                      height="100px"
                                    />{" "}
                                  </Link>
                                </LazyLoad>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {submenu.label && (
                              <span>
                                {submenu.label}
                                {submenu.icongalaxy && (
                                  <span className="iicon">
                                    <GalaxyIcon
                                      mode={submenu.icongalaxy}
                                      level="1"
                                      text="big"
                                      classinside="iconinside0"
                                      number=""
                                      width="50px"
                                    />
                                  </span>
                                )}{" "}
                                {submenu.icon && !submenu.icongalaxy && (
                                  <i
                                    className={`${submenu.icon} mx-3 ${
                                      submenu.icon.indexOf("fas ") == -1 &&
                                      submenu.icon.indexOf("fab ") == -1
                                        ? "icon"
                                        : ""
                                    }`}
                                  ></i>
                                )}{" "}
                                <span
                                  className={
                                    !submenu.textclass
                                      ? "farsi mymenu " + submenu.idname
                                      : "mymenu"
                                  }
                                >
                                  {submenu.label}
                                </span>
                                {submenu?.bonus &&
                                submenu.bonus != "0" &&
                                !submenu.helper ? (
                                  <small
                                    className={
                                      submenu?.bonus?.indexOf("+") == -1
                                        ? "ui mini floating label myfloatmenu red"
                                        : "ui mini floating label myfloatmenu green"
                                    }
                                  >
                                    {submenu.bonus}
                                  </small>
                                ) : (
                                  <>
                                    {submenu.helper && (
                                      <small className="ui grey  mini floating label myfloatmenu">
                                        {submenu.helper}
                                      </small>
                                    )}
                                    {submenu.bonus &&
                                      submenu.bonus.indexOf("+") == -1 && (
                                        <small className="ui red  mini floating label myfloatmenubonus">
                                          {submenu.bonus}
                                        </small>
                                      )}
                                    {submenu.bonus &&
                                      submenu.bonus.indexOf("+") > -1 && (
                                        <div
                                          title={submenu.bonus + " بوناس"}
                                          className="ui green  mini floating label myfloatmenubonus"
                                        >
                                          {submenu.bonus}
                                        </div>
                                      )}
                                  </>
                                )}
                              </span>
                            )}
                          </>
                        )}
                        {submenu.component && (
                          <>
                            {submenu.label ? (
                              <ul>
                                {submenu.idname && (
                                  <div
                                    style={{
                                      position: "relative",
                                    }}
                                  >
                                    <ConfettiArea
                                      active={
                                        (_event.toLowerCase() ==
                                          submenu.idname.toLowerCase() ||
                                          (dayOfTournament == nowDay &&
                                            submenu.idname.toLowerCase() ==
                                              "tournament")) &&
                                        activeMenu == submenu.label
                                          ? true
                                          : false
                                      }
                                      numberOfPieces={50}
                                    />
                                  </div>
                                )}

                                {submenu.title && (
                                  <li className="menutitle">
                                    <span>{submenu.title}</span>
                                  </li>
                                )}
                                {activeMenu == submenu.label && (
                                  <li>
                                    <span>{<CompGen menu={submenu} />}</span>
                                  </li>
                                )}
                              </ul>
                            ) : (
                              <span>
                                {submenu.title && (
                                  <>
                                    <ul className="mm-listview">
                                      <li className="menutitle">
                                        <span>{submenu.title}</span>
                                      </li>
                                      <li></li>
                                    </ul>
                                  </>
                                )}
                                {activeMenu == menu.label && (
                                  <CompGen menu={submenu} />
                                )}
                              </span>
                            )}
                          </>
                        )}
                      </li>
                    );
                  } else {
                    return null;
                  }
                } else {
                  return doMenu(submenu, y, isPanel, isUser);
                }
              })}
            </ul>
          </li>
        );
      }
    }
  }
  const closeMenu = (apis) => {
    try {
      api.close();
    } catch (error) {}
  };
  const getBonus = (gateway, token) => {
    var userMethods = siteMethodDef;

    if (token?.cashierGateways && !token.logout) {
      userMethods = token.cashierGateways;
    }

    try {
      userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
      var data_filter = userMethods.filter(
        (element) => element.name == gateway
      );
    } catch (error) {
      var data_filter = [];
    }

    if (data_filter.length > 0) {
      var bonus = data_filter[0].bonus;
    } else {
      var bonus = 0;
    }

    return bonus;
  };
  const getAccess = (keyAccess) => {
    if (!keyAccess) {
      return true;
    }
    var userMethods = siteMethodDef;

    if (loginToken?.accessToken && !loginToken?.logout) {
      userMethods = loginToken?.cashierGateways;
    }
    try {
      userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
    } catch (error) {}

    var canAdd = false;
    if (userMethods?.length > 0) {
      userMethods.map(function (cashierGateway) {
        if (
          (cashierGateway.mode == keyAccess ||
            cashierGateway.name == keyAccess) &&
          cashierGateway.active
        ) {
          canAdd = true;
        }
      });
    }
    return canAdd;
  };

  const openPanelRight = () => {
    $(".popup").hide();
  };
  const openPanel = (id, toId) => {
    var _id = id;

    if (_id.indexOf("gift") > -1) {
      _id = ".giftarea";
    }

    if ($(_id).length == 0) return false;

    $(".popup").hide();
    if (_id.indexOf("#") == -1) {
      _id = $(_id).closest("[href]").attr("href");
    }
    $(".item.active").removeClass("active");
    api.open();
    const panel = document.querySelector(_id);
    console.log(_id);
    api.openPanel(panel);

    setTimeout(() => {
      var scrollTo = $(_id).find(toId);
      if (scrollTo.length > 0 && toId) {
        setTimeout(() => {
          if (toId) {
            try {
              var scrollTo = $(_id).find(toId + ":visible");
              var scrollDiv = scrollTo.closest(".mm-panel");
              scrollTo.addClass("active");
              scrollDiv.animate(
                {
                  scrollTop:
                    scrollTo.offset().top -
                    scrollDiv.offset().top +
                    scrollDiv.scrollTop() -
                    scrollTo.height(),
                },
                1000
              );
            } catch (error) {}
          } else {
          }
        }, 1000);
      }
    }, 30);
  };
  const openGame = () => {
    navigate("/games/poker");
  };
  const printmenu = () => {
    var menuData = GetMenu(siteInfo);
    finalMenu = menuData.map(function (menu, i) {
      return doMenu(menu, i, false, isUser);
    });
    setActiveMenuOld(activeMenu + "1");
  };

  useEffect(() => {
    if (window.location.href.toString().indexOf("/logout") > -1) {
      var _old = loginToken;
      _old.logout = true;
      eventBus.dispatch("updateUser", _old);
      setIsUser(false);
      if (localStorage.getItem("galaxyUserkeyToken")) {
        localStorage.setItem(
          "oldgalaxyUserkey",
          localStorage.getItem("galaxyUserkeyToken")
        );
        localStorage.removeItem("galaxyUserkeyToken");
      }
      localStorage.setItem("balance", 0);
      UserWebsocket.connect();

      navigate("/");
      //window.location = "/";
    }
  }, [window.location.href]);
  useEffect(() => {
    if (menu == "no") {
      menu = new Mmenu(
        "#menuleft",
        {
          pageScroll: {
            scroll: true,
            update: true,
          },

          setSelected: {
            hover: true,
          },

          iconPanels: {
            add: false,
            visible: 1,
          },
          navbar: {
            add: true,
            title: "منوی اصلی",
          },
          navbars: [
            {
              position: "top",
              content: ["breadcrumbs", "prev"],
            },
          ],
          offCanvas: {
            position: "left",
          },

          theme: "dark",
        },
        {
          offCanvas: {
            menu: {
              insertSelector: ".App",
            },
            page: {
              selector: "#mypage",
            },
          },
        }
      );
      // Get the API

      api = menu.API;

      api.bind("openPanel:before", (panel) => {
        setActiveMenu("main");
        var _parent = $("#" + panel.id + "").attr("data-mm-parent");
        console.log(
          $("#" + _parent)
            .find("a:first > span.mymenu")
            .text()
        );
        if (_parent) {
          setTimeout(() => {
            var _parent = $("#" + panel.id + "").attr("data-mm-parent");

            setActiveMenu(
              $("#" + _parent)
                .find("a:first > span.mymenu")
                .text()
            );
          }, 100);
        }
      });

      api.bind("openPanel:after", (panel) => {
        var _parent = $("#" + panel.id + "").attr("data-mm-parent");

        var _login = $("#" + _parent).find(".login").length;

        if (!isLogin && _login > 0) {
          //$("#openLogin").trigger("click");
          //openPanel("#" + _parent);
        } else {
          var scrollTo = $(".item.active:visible");
          if (scrollTo.length > 0) {
            setTimeout(() => {
              try {
                var scrollTo = $(".item.active:visible");
                var scrollDiv = scrollTo.closest(".mm-panel");

                scrollDiv.animate(
                  {
                    scrollTop:
                      scrollTo.offset().top -
                      scrollDiv.offset().top +
                      scrollDiv.scrollTop() -
                      scrollTo.height(),
                  },
                  1000
                );
              } catch (error) {}
            }, 1000);
          }
        }
      });
      api.bind("close:after", () => {});
      api.bind("open:after", () => {
        setActivePanel(false);
        $(".picn").removeClass("open");
        setActiveMenuOpen(true);
        $("#nav-icon2").addClass("open");
      });
      api.bind("close:after", () => {
        setActiveMenuOpen(false);
        $("#nav-icon2").removeClass("open");
      });
    }
    window.onresize = reportWindowSize;

    reportWindowSize();
  }, []);
  useEffect(() => {
    reportWindowSize();
    try {
      api.close();
    } catch (error) {}
  }, [location.pathname]);
  useEffect(() => {
    bindAddLink();
    reportWindowSize();
  }, [activeMenu]);
  useEffect(() => {
    reportWindowSize();
  }, [activePanel]);

  useEffect(() => {
    if (!loadingLogin) {
      // finalMenu = "";
      setIsUser(isLogin);
    }
  }, [isLogin]);

  useEffect(() => {
    if (
      window.location.href.toString().indexOf("/login") > -1 &&
      window.location.href.toString().indexOf("/login/") == -1
    ) {
      if (isUser == false) {
        setFirstOpen(true);
      } else {
        navigate("/");
      }
    }
    if (window.location.href.toString().indexOf("/login/") > -1) {
      if (isUser == false) {
        const onSubmit = async () => {
          try {
            var arrAdd = window.location.href.toString().split("/");

            var _newValues = {};
            _newValues.username = atob(arrAdd[arrAdd.length - 2]);
            _newValues.password = atob(arrAdd[arrAdd.length - 1]);

            const res = await loginService(_newValues);
            if (res.status == 200) {
              if (res.data.accessToken) {
                //navigate("/");
              }
            } else {
              navigate("/login/" + atob(arrAdd[arrAdd.length - 2]));
            }
          } catch (error) {}
        };
        onSubmit();
      } else {
        //navigate("/");
      }
    }
    if (window.location.href.toString().indexOf("/register") > -1) {
      if (isUser == false) {
        setSecondOpen(true);
      } else {
        navigate("/");
      }
    }
    if (window.location.href.toString().indexOf("/ref/") > -1) {
      var arrAdd = window.location.href.toString().split("/");
      localStorage.setItem("refer", arrAdd[arrAdd.length - 1]);
      navigate("/register");
      setSecondOpen(true);
    }

    if (isUser) {
      setFirstOpen(!isUser);
    }
    //finalMenu = "";
  }, [isUser]);
  useEffect(() => {
    $('[rel="stylesheet"]').removeAttr("disabled");
    eventBus.on("eventsDC", () => {
      if (isLogin) {
        setDcOpen(true);
      } else {
        setDcOpen(true);
      }
    });
    eventBus.on("eventsConnect", () => {
      setDcOpen(false);
    });
    startServiceWorker();
  }, []);
  useEffect(() => {
    printmenu();
  });

  if (loadingLogin && 1 == 2) {
    return (
      <Dimmer active>
        <Loader className="farsi-inline" size="large">
          لطفا صبر کنید...
        </Loader>
      </Dimmer>
    );
  } else {
    return (
      <>
        <div className="App">
          <div className="Main">
            <nav id="menuleft">
              <ul>{finalMenu}</ul>
            </nav>
            <nav
              id="panelright"
              className={
                activePanel
                  ? "active mm-menu--theme-dark"
                  : "mm-menu--theme-dark"
              }
            >
              <RightPanel
                loginToken={loginToken}
                siteInfo={siteInfo}
                openPanel={openPanel}
                setActivePanel={setActivePanel}
                activePanel={activePanel}
                animateCSS={animateCSS}
                bindActiveTable={bindActiveTable}
                bindLastReward={bindLastReward}
                handleOpenTable={handleOpenTable}
              />
            </nav>
          </div>

          <Modal
            basic
            size="tiny"
            className="myaccount   animated backInDown "
            onClose={() => {
              setUserOpen(false);
            }}
            onOpen={() => setUserOpen(true)}
            open={userOpen}
            closeIcon
            dimmer="blurring"
          >
            <div style={{ height: 100, position: "relative" }}>
              <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
                <AnimIcon
                  icon="dxjqoygy"
                  width="300px"
                  height="140px"
                  trigger="loop"
                />
              </div>
            </div>
            <Suspense fallback={<MenuLoader />}>
              <UserArea
                username={userProfile}
                siteInfo={siteInfo}
                loginToken={loginToken}
                size="small"
                labelcolor="orange"
              />
            </Suspense>
          </Modal>
          <Modal
            basic
            size="tiny"
            closeOnEscape={false}
            closeOnDimmerClick={false}
            className="myaccount popupmenu  animated backInDown "
            onClose={() => {
              setDcOpen(false);
            }}
            onOpen={() => setDcOpen(true)}
            open={dcOpen}
          >
            <DCArea
              setDcOpen={setDcOpen}
              loginToken={loginToken}
              siteInfo={siteInfo}
              isLogin={isUser}
              loadingLogin={loadingLogin}
              setIsUser={setIsUser}
              size="small"
              labelcolor="orange"
            />
          </Modal>
          <Modal
            basic
            size="tiny"
            className="myaccount popupmenu  animated backInDown "
            onClose={() => {
              setFirstOpen(false);
              navigate("/");
            }}
            onOpen={() => setFirstOpen(true)}
            open={firstOpen}
          >
            <div
              className="fadeoutend"
              style={{ height: 100, position: "relative" }}
            >
              <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
                <AnimIcon
                  icon="rqqkvjqf"
                  width="300px"
                  height="140px"
                  trigger="loop"
                />
              </div>
            </div>
            <Suspense fallback={<MenuLoader />}>
              <LoginArea
                setFirstOpen={setFirstOpen}
                setSecondOpen={setSecondOpen}
                setThirdOpen={setThirdOpen}
                isLogin={isUser}
                loadingLogin={loadingLogin}
                loginToken={loginToken}
                setIsUser={setIsUser}
                size="small"
                labelcolor="orange"
              />
            </Suspense>
          </Modal>
          <Modal
            basic
            size="tiny"
            className="myaccount popupmenu  animated backInDown "
            onClose={() => {
              setThirdOpen(false);
              setFirstOpen(true);
            }}
            onOpen={() => setThirdOpen(true)}
            open={thirdOpen}
          >
            {" "}
            <div
              className="fadeoutend"
              style={{ height: 100, position: "relative" }}
            >
              <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
                <AnimIcon
                  icon="dxjqoygy"
                  width="300px"
                  height="140px"
                  trigger="loop"
                />
              </div>
            </div>
            <Suspense fallback={<MenuLoader />}>
              <ForgetArea
                setFirstOpen={setFirstOpen}
                setSecondOpen={setSecondOpen}
                setThirdOpen={setThirdOpen}
                isLogin={isUser}
                loadingLogin={loadingLogin}
                setIsUser={setIsUser}
                size="small"
                labelcolor="blue"
              />
            </Suspense>
          </Modal>
          <Modal
            basic
            size="tiny"
            className="myaccount popupmenu  animated backInDown "
            onClose={() => {
              setSecondOpen(false);
              navigate("/");
            }}
            onOpen={() => setSecondOpen(true)}
            open={secondOpen}
          >
            {" "}
            <div
              className="fadeoutend"
              style={{ height: 100, position: "relative" }}
            >
              <div style={{ position: "absolute", zIndex: 0, top: 10 }}>
                <AnimIcon
                  icon="iltqorsz"
                  width="300px"
                  height="140px"
                  trigger="loop"
                />
              </div>
            </div>
            <Suspense fallback={<MenuLoader />}>
              <RegisterArea
                setFirstOpen={setFirstOpen}
                setSecondOpen={setSecondOpen}
                isLogin={isUser}
                loadingLogin={loadingLogin}
                setIsUser={setIsUser}
                size="small"
                labelcolor="green"
              />
            </Suspense>
          </Modal>

          <AdminLayout
            loginToken={loginToken}
            siteInfo={siteInfo}
            openPanel={openPanel}
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            animateCSS={animateCSS}
            bindActiveTable={bindActiveTable}
            bindLastReward={bindLastReward}
            openPanelRight={openPanelRight}
            openGame={openGame}
            setFirstOpen={setFirstOpen}
            setSecondOpen={setSecondOpen}
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            isLogin={isUser}
            loadingLogin={loadingLogin}
            getAccess={getAccess}
            setRefresh={setRefresh}
            setUserProfile={setUserProfile}
            setUserOpen={setUserOpen}
            reportWindowSize={reportWindowSize}
            handleOpenTable={handleOpenTable}
          />

          <div style={{ position: "absolute", top: -1000000 }}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512.001 512.001"
              style={{ position: "absolute", zIndex: -1 }}
            >
              <linearGradient id="vipicongrad" gradientTransform="rotate(70)">
                <stop offset="0%" stopColor="#f6e27a" />
                <stop offset="50%" stopColor="#f6f2c0" />
                <stop offset="55%" stopColor="#f6e27a" />
                <stop offset="78%" stopColor="#cb9b51" />
                <stop offset="100%" stopColor="#cb9b51" />
              </linearGradient>
              <linearGradient
                id="leagueicongrad"
                gradientTransform="rotate(90)"
              >
                <stop offset="0%" stopColor="#fdd300" />

                <stop offset="70%" stopColor="#cc3f00" />

                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
              <linearGradient id="gpassicongrad" gradientTransform="rotate(70)">
                <stop offset="0%" stopColor="#c93100" />

                <stop offset="50%" stopColor="#cc3f00" />

                <stop offset="100%" stopColor="#333a6f" />
              </linearGradient>
              <linearGradient
                id="gpassicongradnew"
                gradientTransform="rotate(10)"
              >
                <stop offset="0%" stopColor="#fdd300" />

                <stop offset="50%" stopColor="#e47900" />

                <stop offset="100%" stopColor="#a70300" />
              </linearGradient>
            </svg>
          </div>
        </div>
      </>
    );
  }
}

export default App;
