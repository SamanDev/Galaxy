import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import { Image, Modal } from "semantic-ui-react";
import { menuData, panelData } from "./const";
import { Link } from "react-router-dom";
import { useIsLogin } from "./hook/authHook";
import $ from "jquery";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginArea from "./layouts/admin/auth/Login.jsx";
import RegisterArea from "./layouts/admin/auth/Register.jsx";
import ForgetArea from "./layouts/admin/auth/Forget";
import { Dimmer, Loader, Segment } from "semantic-ui-react";
var menu = false;
var panelMenu = false;
var api;
var apiPanel;

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function doMenu(menu, y) {
  if (!menu.submenu) {
    return (
      <li key={y + menu.label}>
        {menu.label && !menu.component && (
          <Link
            to={menu.link}
            as="a"
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
                    !menu.textclass ? "farsi mymenu " + menu.idname : "mymenu"
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
            {menu.label ? (
              <ul>
                <li>
                  <span>{menu.component}</span>
                </li>
              </ul>
            ) : (
              <>{menu.component}</>
            )}
          </>
        )}
      </li>
    );
  } else {
    return (
      <li key={y + menu.label}>
        <span>
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
              return (
                <li key={i + submenu.label}>
                  {submenu.image ? (
                    <>
                      <Image
                        className="fadeout"
                        as={Link}
                        to={"/games/" + submenu.label}
                        src={
                          "https://galaxy10g.site/images/g/dfa/" +
                          submenu.image +
                          ".png"
                        }
                        fluid
                      />
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
                          <li>
                            <span>{submenu.component}</span>
                          </li>
                        </ul>
                      ) : (
                        <span>{submenu.component}</span>
                      )}
                    </>
                  )}
                </li>
              );
            } else {
              return doMenu(submenu);
            }
          })}
        </ul>
      </li>
    );
  }
}

const openPanel = (id, toId) => {
  var _id = id;
  console.log(id);
  if (_id.indexOf("#") == -1) {
    _id = $(_id).closest("[href]").attr("href");
  }
  $(".item.active").removeClass("active");
  api.open();
  const panel = document.querySelector(_id);
  api.openPanel(panel);

  if (toId) {
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
  } else {
    var scrollTo = $(_id);
    var scrollDiv = scrollTo.closest(".mm-panel");
    scrollDiv.animate(
      {
        scrollTop: 0,
      },
      1000
    );
  }
};

function App(prop) {
  const [loading, isLogin] = useIsLogin();
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  const navigate = useNavigate();

  menu = false;

  const location = useLocation();

  useEffect(() => {
    if (window.location.href.toString().indexOf("/login") > -1) {
      setFirstOpen(true);
    }
  }, [window.location.href]);
  useEffect(() => {
    if (menu == false && !loading) {
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
            title: "منوی اصلی",
          },
          navbars: [
            {
              position: "top",
              content: ["breadcrumbs"],
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
            },
          },
        }
      );
      api = menu.API;
      apiPanel = panelMenu.API;
      api.bind("openPanel:after", (panel) => {
        console.log("Started opening panel: " + panel.id);
        var _parent = $("#" + panel.id + "").attr("data-mm-parent");
        var _login = $("#" + _parent).find(".login").length;

        if (!isLogin && _login > 0) {
          $("#openLogin").trigger("click");

          openPanel("#" + _parent);
        }
      });
      apiPanel.bind("open:after", () => {
        console.log("Started opening panel: ");
        includeHTML();
      });
    }
  }, [loading]);
  useEffect(() => {
    try {
      api.close();
    } catch (error) {}
  }, [location.pathname]);
  if (loading) {
    return (
      <Dimmer active>
        <Loader className="farsi-inline">لطفا صبر کنید...</Loader>
      </Dimmer>
    );
  } else {
    return (
      <>
        <nav id="menuleft">
          <ul>
            {menuData.map(function (menu, i) {
              return doMenu(menu, i);
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
            open={firstOpen || prop.showLogin}
          >
            <LoginArea
              setFirstOpen={setFirstOpen}
              setSecondOpen={setSecondOpen}
              setThirdOpen={setThirdOpen}
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
                  showLogin={true}
                  setFirstOpen={setFirstOpen}
                  setSecondOpen={setSecondOpen}
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
                />
              }
            />
          </Routes>
        </div>
        <nav id="panelright" className="fadeout">
          <ul>
            {panelData.map(function (menu, i) {
              return doMenu(menu, i);
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default App;
