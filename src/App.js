import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import { Image, Modal } from "semantic-ui-react";
import {
  menuData,
  panelData,
  haveAdmin,
  haveModerator,
  getEvent,
  dayOfTournament,
  startServiceWorker,
} from "./const";
import { Link } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import { useSiteInfo, useActiveTable, useLastReward } from "./hook/infoHook";
import $ from "jquery";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginArea from "./layouts/admin/auth/Login.jsx";
import RegisterArea from "./layouts/admin/auth/Register.jsx";
import ForgetArea from "./layouts/admin/auth/Forget";
import DCArea from "./layouts/admin/auth/dc.component";
import UserArea from "./layouts/admin/auth/user.component";
import GalaxyIcon from "./utils/svg";
import ConfettiArea from "./utils/partyclick";
import { Dimmer, Loader } from "semantic-ui-react";
import UserWebsocket from "./services/user.websocket";
import eventBus from "./services/eventBus";
import { cashierService } from "./services/cashier";
import ActiveTable from "./pages/dashboard/ActiveTableJson.jsx";
import LastReward from "./pages/dashboard/LastRewardJson";
import PWAPrompt from "react-ios-pwa-prompt";
const moment = require("moment");
var menu = "no";
var panelMenu = "no";
var api;
var apiPanel;

var _event = getEvent();
var nowDay = moment().isoWeekday();
const animateCSS = (element, animation, prefix = "") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
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

function getBonus(gateway) {
  try {
    var loginToken = JSON.parse(localStorage.getItem("loginToken"));
    var data_filter = loginToken.cashierGateways.filter(
      (element) => element.name == gateway
    );
    var bonus = data_filter[0].bonus;
  } catch (error) {
    var loginToken = [
      {
        id: 2,
        total: 0,
        bonus: 5,
        name: "USDT",
        mode: "CoinPayments",
        active: true,
      },
      {
        id: 3,
        total: 0,
        bonus: 10,
        name: "PerfectMoney",
        mode: "PerfectMoney",
        active: true,
      },
      {
        id: 1,
        total: 0,
        bonus: 0,
        name: "Digipay",
        mode: "IranShetab",
        active: true,
      },
      {
        id: 6,
        total: 0,
        bonus: 0,
        name: "Transfer",
        mode: "Transfer",
        active: true,
      },
      {
        id: 8,
        total: 0,
        bonus: 2,
        name: "VisaGiftCode",
        mode: "VisaGiftCode",
        active: true,
      },
      {
        id: 10,
        total: 0,
        bonus: 0,
        name: "Haft80",
        mode: "IranShetab",
        active: true,
      },
      {
        id: 4,
        total: 0,
        bonus: 0,
        name: "CartToCart",
        mode: "CartToCart",
        active: true,
      },
      {
        id: 12,
        total: 0,
        bonus: 0,
        name: "Commission",
        mode: "Commission",
        active: true,
      },
      {
        id: 5,
        total: 0,
        bonus: 0,
        name: "Rakeback",
        mode: "Rakeback",
        active: true,
      },
      {
        id: 9,
        total: 0,
        bonus: 0,
        name: "BankTransfer",
        mode: "BankTransfer",
        active: true,
      },
      {
        id: 11,
        total: 0,
        bonus: 0,
        name: "Hamrahcart",
        mode: "IranShetab",
        active: true,
      },
      {
        id: 7,
        total: 0,
        bonus: 5,
        name: "Bitcoin",
        mode: "CoinPayments",
        active: true,
      },
    ];
    var data_filter = loginToken.filter((element) => element.name == gateway);

    if (data_filter.length > 0) {
      var bonus = data_filter[0].bonus;
    } else {
      var bonus = 0;
    }
  }

  return bonus;
}
localStorage.removeItem("getGateways");
var finalMenu = "";
var finalPanel = "";

function App(prop) {
  const [refresh, setRefresh] = useState(false);
  const [loadingLogin, isLogin] = useIsLogin();

  const [isUser, setIsUser] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [userOpen, setUserOpen] = useState(false);
  const [dcOpen, setDcOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const [loadingInfo, siteInfo] = useSiteInfo();
  const [loadingTable, activatTableData] = useActiveTable();

  const [loadingReward, lastRewardData] = useLastReward();

  const [activeMenu, setActiveMenu] = useState("main");
  const [activePanel, setActivePanel] = useState(false);
  const [activeMenuOld, setActiveMenuOld] = useState(activeMenu);
  const navigate = useNavigate();
  var loginToken;
  const location = useLocation();
  const handleOpenTable = async (tableName) => {
    var values = { tableName: tableName };
    if (isUser) {
      try {
        const res = await cashierService(values, "openTable");
      } catch (error) {}
    }
  };
  function bindActiveTable() {
    $(".tablename")
      .unbind()
      .bind("click", function (event) {
        if (window.location.href.toString().indexOf("/games/poker") == -1) {
          navigate("/games/poker");
          setTimeout(() => {
            handleOpenTable($(this).find(".name").text());
          }, 4000);
        } else {
          handleOpenTable($(this).find(".name").text());
        }
      });
  }
  function bindLastReward() {
    $(".rewardname .iconarea > *")
      .unbind()
      .bind("click", function (event) {
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
      .bind("click", function (event) {
        var _u = $(this).text();

        setUserProfile(_u);
        setUserOpen(true);
      });
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
    $(".msgtext").each(function (txt) {
      let text = $(this).text();

      let result = text
        .replace(
          / دعوت دوستان | حساب کاربری | خرید چیپ | تراکنش های مالی | برداشت /g,
          function (x) {
            return (
              "<a href='#' data-target='" +
              getLinkId(x) +
              "' class='farsi msglink interallink'>" +
              x +
              "</a>"
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
        .bind("click", function (event) {
          var _m = $(this).attr("data-target");

          if ($("." + _m, "").length > 0) {
            openPanel("." + _m, "");
          }
        });
    });
  }
  const CompGen = (prop) => {
    if (prop?.menu?.title == "میز های فعال") {
      return <ActiveTable bindActiveTable={bindActiveTable} />;
    } else if (prop?.menu?.title == "آخرین پاداش ها") {
      return (
        <LastReward animateCSS={animateCSS} bindLastReward={bindLastReward} />
      );
    } else {
      return <>{prop.com}</>;
    }
  };

  try {
    loginToken = JSON.parse(localStorage.getItem("loginToken"));
  } catch (error) {
    localStorage.removeItem("loginToken");
    window.location = "/";
  }

  function doMenu(menu, y, isPanel, isUser) {
    //if (panelMenu != "no") return false;
    //console.log(menu, y, isPanel, isUser);
    if (getAccess(menu.getwaykey)) {
      if (!menu.submenu) {
        if (
          menu.idname != "admin" ||
          haveAdmin(loginToken?.roles) ||
          haveModerator(loginToken?.roles)
        ) {
          return (
            <li
              key={y + menu.label}
              className={
                menu.link == "/logout" && !isUser ? "hiddenmenu" : null
              }
            >
              {menu.label && !menu.component && (
                <Link
                  to={menu.link}
                  as="a"
                  onClick={(e) => closeMenu()}
                  className="mm-btn mm-btn--next mm-listitem__btn mm-listitem__text"
                >
                  {menu.image ? (
                    <>{menu.image}</>
                  ) : (
                    <>
                      {menu.icon && (
                        <i
                          className={`${menu.icon} mx-3 ${
                            menu.icon.indexOf("fas ") == -1 &&
                            menu.icon.indexOf("fab ") == -1
                              ? " icon"
                              : ""
                          }`}
                        ></i>
                      )}{" "}
                      <span
                        href="#"
                        className={
                          !menu.textclass
                            ? "farsi mymenu " + menu.idname
                            : "mymenu"
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
                      {activeMenu == menu.label && !activePanel && (
                        <li>
                          <span>
                            <CompGen
                              menu={menu}
                              comp={menu.component}
                              openPanel={openPanel}
                              openGame={openGame}
                              setFirstOpen={setFirstOpen}
                            />
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
                                {(activeMenu == menu.label || activePanel) && (
                                  <>
                                    <CompGen
                                      comp={menu.component}
                                      menu={menu}
                                      openPanel={openPanel}
                                      openGame={openGame}
                                      setFirstOpen={setFirstOpen}
                                    />
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
                <i
                  className={`${menu.icon} mx-3${
                    menu.icon.indexOf("fas ") == -1 &&
                    menu.icon.indexOf("fab ") == -1
                      ? " icon"
                      : ""
                  }`}
                ></i>
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
              {getBonus(menu.getwaykey) > 0 &&
                (menu.bonus = "+" + getBonus(menu.getwaykey) + "%")}
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
                  if (getAccess(submenu.getwaykey)) {
                    return (
                      <li key={i + menu.label} className={submenu?.aria}>
                        {submenu.image ? (
                          <>
                            {activeMenu == menu.label && (
                              <Image
                                className="fadeout"
                                as={Link}
                                to={"/games/" + submenu.label}
                                onClick={(e) => closeMenu()}
                                src={
                                  "/assets/images/games/" +
                                  submenu.image +
                                  ".jpg"
                                }
                                fluid
                              />
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
                                {getBonus(submenu.getwaykey) > 0 &&
                                  submenu?.bonus?.indexOf("-") == -1 &&
                                  (submenu.bonus =
                                    "+ " + getBonus(submenu.getwaykey) + "%")}
                                {submenu.bonus &&
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
                                {activeMenu == submenu.label &&
                                  !activePanel && (
                                    <li>
                                      <span>{submenu.component}</span>
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
                                {activeMenu == menu.label &&
                                  !activePanel &&
                                  submenu.component}
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
  const closeMenu = () => {
    try {
      api.close();
    } catch (error) {}
  };
  const getAccess = (keyAccess) => {
    if (!keyAccess) {
      return true;
    }
    var userMethods = [
      {
        id: 1,
        total: 0,
        bonus: 10,
        name: "Bitcoin",
        mode: "CoinPayments",
        active: true,
      },
      {
        id: 2,
        total: 0,
        bonus: 0,
        name: "Digipay",
        mode: "IranShetab",
        active: true,
      },

      {
        id: 7,
        total: 0,
        bonus: 0,
        name: "Transfer",
        mode: "Transfer",
        active: true,
      },
      {
        id: 8,
        total: 0,
        bonus: 0,
        name: "Commission",
        mode: "Commission",
        active: true,
      },
      {
        id: 9,
        total: 0,
        bonus: 5,
        name: "PerfectMoney",
        mode: "PerfectMoney",
        active: true,
      },
      {
        id: 10,
        total: 0,
        bonus: 5,
        name: "USDT",
        mode: "CoinPayments",
        active: true,
      },
      {
        id: 11,
        total: 0,
        bonus: 0,
        name: "Rakeback",
        mode: "Rakeback",
        active: true,
      },
    ];

    if (loginToken) {
      userMethods = loginToken.cashierGateways;
    }
    try {
      userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
    } catch (error) {
      localStorage.removeItem("loginToken");
    }

    var canAdd = false;
    {
      userMethods.map(function (cashierGateway, u) {
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

    apiPanel.open();
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
    }, 1000);
  };
  const openGame = () => {
    navigate("/games/poker");
  };

  useEffect(() => {
    if (window.location.href.toString().indexOf("/logout") > -1) {
      setIsUser(false);
      localStorage.removeItem("loginToken");
      UserWebsocket.connect();
      navigate("/");
      //window.location = "/";
    }
  }, [window.location.href]);
  useEffect(() => {
    if (menu == "no") {
      startServiceWorker();
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
              insertSelector: "#root",
            },
            page: {
              selector: ".App",
            },
          },
        }
      );
      // Get the API

      panelMenu = new Mmenu(
        "#panelright",
        {
          offCanvas: {
            position: "right-front",
          },
          navbar: {
            add: false,
            title: "پنل کاربری",
          },
          theme: "dark",
        },
        {
          offCanvas: {
            menu: {
              insertSelector: "body",
            },
            page: {
              selector: "#root",
              noSelector: "[body]",
            },
          },
        }
      );
      api = menu.API;
      apiPanel = panelMenu.API;
      api.bind("openPanel:before", (panel) => {
        var _parent = $("#" + panel.id + "").attr("data-mm-parent");
        if (_parent) {
          setTimeout(() => {
            var _parent = $("#" + panel.id + "").attr("data-mm-parent");
            setActiveMenu(
              $("#" + _parent)
                .find("a:first > span.mymenu")
                .text()
            );
          }, 400);
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
      api.bind("open:before", () => {
        apiPanel.close();
        setActivePanel(false);
      });
      api.bind("close:after", () => {
        setActivePanel(true);
      });
      apiPanel.bind("open:before", () => {
        setActivePanel(true);
        setActiveMenu("main");
      });
      apiPanel.bind("open:after", () => {
        $(".mm-wrapper__blocker").hide();
      });
      apiPanel.bind("close:after", () => {
        $(".mm-wrapper__blocker").show();

        //setActivePanel(false);
      });
    }
  }, []);
  useEffect(() => {
    try {
      api.close();
    } catch (error) {}
  }, [location.pathname]);
  useEffect(() => {
    bindAddLink();
    if (activeMenu !== "main" && !activePanel) {
      setActiveMenuOld(activeMenu);
    }
  }, [activeMenu]);
  useEffect(() => {
    finalMenu = "";
    if (window.matchMedia("(display-mode: standalone)").matches) {
      //alert();
    }
  }, [activeMenu]);
  useEffect(() => {
    finalPanel = "";

    if (!activePanel && activeMenu == "main") {
      setActiveMenu(activeMenuOld);
    }
  }, [activePanel]);
  useEffect(() => {
    if (!loadingLogin) {
      setIsUser(isLogin);
    }
  }, [isLogin]);

  useEffect(() => {
    if (window.location.href.toString().indexOf("/login") > -1) {
      if (isUser == false) {
        setFirstOpen(true);
      } else {
        navigate("/");
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
    finalMenu = "";
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
  }, []);
  useEffect(() => {
    eventBus.on("eventsDataUser", (dataGet) => {
      finalMenu = "";
      var ref = refresh;
      console.log(dataGet);
      setRefresh(dataGet);
    });
  }, []);
  if (loadingLogin && 1 == 2) {
    return (
      <Dimmer active>
        <Loader className="farsi-inline" size="large">
          لطفا صبر کنید...
        </Loader>
      </Dimmer>
    );
  } else {
    if (finalMenu == "" || 1 == 1) {
      finalMenu = menuData.map(function (menu, i) {
        return doMenu(menu, i, false, isUser);
      });
    }
    if (finalPanel == "" || 1 == 1) {
      finalPanel = panelData.map(function (menu, i) {
        return doMenu(menu, i, "panel");
      });
    }
    return (
      <>
        <PWAPrompt
          timesToShow={30}
          copyClosePrompt="Close"
          permanentlyHideOnDismiss={false}
        />
        <nav id="menuleft">
          <ul>{finalMenu}</ul>
        </nav>
        <nav id="panelright" className="fadeoutend">
          <ul>{finalPanel}</ul>
        </nav>
        <div className="App">
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
          >
            <UserArea
              username={userProfile}
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
            <LoginArea
              setFirstOpen={setFirstOpen}
              setSecondOpen={setSecondOpen}
              setThirdOpen={setThirdOpen}
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
              setThirdOpen(false);
              setFirstOpen(true);
            }}
            onOpen={() => setThirdOpen(true)}
            open={thirdOpen}
          >
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
            <RegisterArea
              setFirstOpen={setFirstOpen}
              setSecondOpen={setSecondOpen}
              isLogin={isUser}
              loadingLogin={loadingLogin}
              setIsUser={setIsUser}
              size="small"
              labelcolor="green"
            />
          </Modal>

          <Routes>
            <Route
              path="/login"
              element={
                <AdminLayout
                  openPanel={openPanel}
                  showLogin={isUser ? false : true}
                  setFirstOpen={setFirstOpen}
                  setSecondOpen={setSecondOpen}
                  isLogin={isUser}
                  loadingLogin={loadingLogin}
                  setIsUser={setIsUser}
                  getAccess={getAccess}
                />
              }
            />
            <Route
              path="/register"
              element={
                <AdminLayout
                  openPanel={openPanel}
                  showRegister={true}
                  setFirstOpen={setFirstOpen}
                  setSecondOpen={setSecondOpen}
                  isLogin={isUser}
                  loadingLogin={loadingLogin}
                  setIsUser={setIsUser}
                  getAccess={getAccess}
                />
              }
            />
            <Route
              path="*"
              element={
                <AdminLayout
                  openPanel={openPanel}
                  openPanelRight={openPanelRight}
                  openGame={openGame}
                  setFirstOpen={setFirstOpen}
                  setSecondOpen={setSecondOpen}
                  setActiveMenu={setActiveMenu}
                  activeMenu={activeMenu}
                  setActivePanel={setActivePanel}
                  isLogin={isUser}
                  loadingLogin={loadingLogin}
                  setIsUser={setIsUser}
                  getAccess={getAccess}
                  animateCSS={animateCSS}
                  setRefresh={setRefresh}
                  bindLastReward={bindLastReward}
                  setUserProfile={setUserProfile}
                  setUserOpen={setUserOpen}
                />
              }
            />
          </Routes>
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
            <linearGradient id="leagueicongrad" gradientTransform="rotate(90)">
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
      </>
    );
  }
}

export default App;
