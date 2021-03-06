import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import { Image, Modal } from "semantic-ui-react";
import { menuData, panelData, haveAdmin } from "./const";
import { Link } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import $ from "jquery";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginArea from "./layouts/admin/auth/Login.jsx";
import RegisterArea from "./layouts/admin/auth/Register.jsx";
import ForgetArea from "./layouts/admin/auth/Forget";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
var menu = "no";
var panelMenu = false;
var api;
var apiPanel;

function App(prop) {
  const [loadingLogin, isLogin] = useIsLogin();
  const [isUser, setIsUser] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState("main");
  const [activePanel, setActivePanel] = useState(false);
  const [activeMenuOld, setActiveMenuOld] = useState(activeMenu);
  const navigate = useNavigate();
  var loginToken;
  const location = useLocation();
  try {
    loginToken = JSON.parse(localStorage.getItem("loginToken"));
  } catch (error) {
    localStorage.removeItem("loginToken");
    window.location = "/";
  }

  function doMenu(menu, y, isPanel, isUser) {
    if (getAccess(menu.getwaykey)) {
      if (!menu.submenu) {
        if (menu.idname != "admin" || haveAdmin(loginToken?.roles)) {
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
                        <li className="menutitle menutitleinside mm-listitem">
                          <span className="mm-listitem__text">
                            {menu.title}
                          </span>
                        </li>
                      )}
                      {activeMenu == menu.label && !activePanel && (
                        <li>
                          <span>{menu.component}</span>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <>
                      <span className="image">
                        {menu.title && (
                          <>
                            <ul className="mm-listview">
                              <li className="menutitle menutitleinside mm-listitem">
                                <span className="mm-listitem__text">
                                  {menu.title}
                                </span>
                              </li>
                              <li>
                                {(activeMenu == menu.label ||
                                  (activePanel && activeMenu == "main")) && (
                                  <>{menu.component}</>
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
          <li key={y + menu.label}>
            <span
              className={
                menu.link == "/logout" && !isUser ? "hiddenmenu" : null
              }
            >
              {menu.label}
              {menu.icon && (
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
              {menu.bonus && (
                <small
                  className="ui red  mini floating label myfloatmenu"
                  style={{ minWidth: "auto" }}
                >
                  {menu.bonus}
                </small>
              )}
            </span>

            <ul>
              {menu.submenu.map(function (submenu, i) {
                if (!submenu.submenu) {
                  if (getAccess(submenu.getwaykey)) {
                    return (
                      <li key={i + submenu.label}>
                        {submenu.image ? (
                          <>
                            {activeMenu == menu.label && (
                              <Image
                                className="fadeout"
                                as={Link}
                                to={"/games/" + submenu.label}
                                onClick={(e) => closeMenu()}
                                src={
                                  "https://galaxy10g.site/images/g/dfa/" +
                                  submenu.image +
                                  ".png"
                                }
                                fluid
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {submenu.label && (
                              <span className={submenu?.id}>
                                {submenu.label}
                                {submenu.icon && (
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
                                {submenu.helper && (
                                  <small className="ui grey  mini floating label myfloatmenu">
                                    {submenu.helper}
                                  </small>
                                )}
                                {submenu.bonus && (
                                  <small className="ui red  mini floating label myfloatmenubonus">
                                    {submenu.bonus}
                                  </small>
                                )}
                              </span>
                            )}
                          </>
                        )}
                        {submenu.component && (
                          <>
                            {submenu.label ? (
                              <ul>
                                {submenu.title && (
                                  <li className="menutitle">
                                    <span>{submenu.title}</span>
                                  </li>
                                )}
                                {activeMenu == submenu.label && !activePanel && (
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
        name: "PerfectMoney",
        mode: "PerfectMoney",
        active: true,
      },
      {
        id: 8,
        name: "Bitcoin",
        mode: "Bitcoin",
        active: true,
      },
      {
        id: 9,
        name: "USDT",
        mode: "USDT",
        active: true,
      },
      {
        id: 6,
        name: "Haft80",
        mode: "IranShetab",
        active: true,
      },
      {
        id: 5,
        name: "Hamrahcart",
        mode: "IranShetab",
        active: true,
      },

      {
        id: 2,
        name: "Digipay",
        mode: "IranShetab",
        active: true,
      },
      {
        id: 10,
        name: "Transfer",
        mode: "Transfer",
        active: true,
      },
    ];

    if (loginToken) {
      userMethods = loginToken.cashierGateways;
    }

    userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));

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

  const openPanel = (id, toId) => {
    var _id = id;
    $(".popup").remove();
    if (_id.indexOf("#") == -1) {
      _id = $(_id).closest("[href]").attr("href");
    }
    $(".item.active").removeClass("active");
    api.open();
    const panel = document.querySelector(_id);
    api.openPanel(panel);
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
        try {
          var scrollTo = $(_id);
          var scrollDiv = scrollTo.closest(".mm-panel");
          scrollDiv.animate(
            {
              scrollTop: 0,
            },
            1000
          );
        } catch (error) {}
      }
    }, 1000);
  };
  useEffect(() => {
    if (window.location.href.toString().indexOf("/logout") > -1) {
      setIsUser(false);
      localStorage.removeItem("loginToken");
      window.location = "/";
    }
  }, [window.location.href]);
  useEffect(() => {
    if (!loadingLogin) {
      menu = new Mmenu(
        "#menuleft",
        {
          setSelected: {
            hover: true,
          },

          iconPanels: {
            add: false,
            visible: 1,
          },
          navbar: {
            add: true,
            title: "???????? ????????",
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
            title: "?????? ????????????",
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
        setTimeout(() => {
          var _parent = $("#" + panel.id + "").attr("data-mm-parent");
          setActiveMenu(
            $("#" + _parent)
              .find("a:first span")
              .text()
          );
        }, 200);
      });

      api.bind("openPanel:after", (panel) => {
        var _parent = $("#" + panel.id + "").attr("data-mm-parent");

        var _login = $("#" + _parent).find(".login").length;

        if (!isLogin && _login > 0) {
          $("#openLogin").trigger("click");

          openPanel("#" + _parent);
        } else {
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
  }, [loadingLogin]);
  useEffect(() => {
    try {
      api.close();
    } catch (error) {}
  }, [location.pathname]);
  useEffect(() => {
    if (activeMenu !== "main" && !activePanel) {
      setActiveMenuOld(activeMenu);
    }
  }, [activeMenu]);
  useEffect(() => {
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
  }, [isUser]);

  if (loadingLogin) {
    return (
      <Dimmer active>
        <Loader className="farsi-inline" size="large">
          ???????? ?????? ????????...
        </Loader>
      </Dimmer>
    );
  } else {
    return (
      <>
        <nav id="menuleft">
          <ul>
            {menuData.map(function (menu, i) {
              return doMenu(menu, i, false, isUser);
            })}
          </ul>
        </nav>
        <nav id="panelright" className="fadeout">
          <ul>
            {panelData.map(function (menu, i) {
              return doMenu(menu, i, "panel");
            })}
          </ul>
        </nav>
        <div className="App">
          <Modal
            basic
            size="tiny"
            className="myaccount popupmenu"
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
            className="myaccount popupmenu"
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
              size="small"
              labelcolor="blue"
            />
          </Modal>
          <Modal
            basic
            size="tiny"
            className="myaccount popupmenu"
            onClose={() => {
              setSecondOpen(false);
              navigate("/");
            }}
            onOpen={() => setSecondOpen(true)}
            open={secondOpen || prop.showRegister}
          >
            <RegisterArea
              setFirstOpen={setFirstOpen}
              setSecondOpen={setSecondOpen}
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
                  setFirstOpen={setFirstOpen}
                  setSecondOpen={setSecondOpen}
                  setActiveMenu={setActiveMenu}
                  activeMenu={activeMenu}
                  setActivePanel={setActivePanel}
                  isLogin={isUser}
                  loadingLogin={loadingLogin}
                  setIsUser={setIsUser}
                  getAccess={getAccess}
                />
              }
            />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
