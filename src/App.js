import React from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "./layouts/admin/Index";
import { Image } from "semantic-ui-react";
import { menuData } from "./const";

function doMenu(menu, y) {
  if (!menu.submenu) {
    return (
      <li key={y + menu.label} id={menu.label}>
        {menu.label && (
          <a href="#/">
            {menu.image ? (
              <>{menu.image}</>
            ) : (
              <>
                {menu.icon && (
                  <i
                    className={`${menu.icon} mx-3 ${menu.icon.indexOf("fas ") ==
                      -1 && "icon"}`}
                  ></i>
                )}{" "}
                <span className={!menu.textclass ? "farsi mymenu" : "mymenu"}>
                  {menu.label}
                </span>
              </>
            )}
          </a>
        )}
        {!menu.label && menu.component && (
          <ul>
            <li>{menu.component}</li>
          </ul>
        )}
      </li>
    );
  } else {
    return (
      <li
        key={y + menu.label}
        className={menu.label.replace(" ", "-").toLowerCase()}
      >
        <span>
          {menu.icon && (
            <i
              className={`${menu.icon} mx-3 ${menu.icon.indexOf("fas ") == -1 &&
                "icon"}`}
            ></i>
          )}{" "}
          <span className={!menu.textclass ? "farsi mymenu" : "mymenu"}>
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
          {menu.submenu.map(function(submenu, i) {
            if (!submenu.submenu) {
              return (
                <li key={i + submenu.label}>
                  {submenu.image ? (
                    <>
                      <Image
                        style={{ paddingLeft: 20 }}
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
                        <span>
                          {submenu.icon && (
                            <i
                              className={`${
                                submenu.icon
                              } mx-3 ${submenu.icon.indexOf("fas ") == -1 &&
                                "icon"}`}
                            ></i>
                          )}{" "}
                          <span
                            className={
                              !submenu.textclass ? "farsi mymenu" : "mymenu"
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
function App() {
  const location = useLocation();
  return (
    <>
      <nav id="menuleft">
        <ul>
          {menuData.map(function(menu, i) {
            return doMenu(menu, i);
          })}
        </ul>
      </nav>
      <div className="App">
        <AdminLayout />
      </div>
      <nav id="panelright">
        <mm-burger
          menu="panelright"
          fx="spin"
          ease="funky"
          role="button"
          tabindex="0"
          title="Open the menu"
          style={{
            position: "absolute",
            color: "white",
            marginLeft: -40,
            marginTop: 18,
          }}
        ></mm-burger>

        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <span>About us</span>
            <ul>
              <li>
                <a href="#/">History</a>
              </li>
              <li>
                <span>The team</span>
                <ul>
                  <li>
                    <a href="#/">Management</a>
                  </li>
                  <li>
                    <a href="#/">Sales</a>
                  </li>
                  <li>
                    <a href="#/">Development</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#/">Our address</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#/">Contact</a>
          </li>

          <li className="Divider">Other demos</li>
          <li>
            <a href="advanced.html">Advanced demo</a>
          </li>
          <li>
            <a href="onepage.html">One page demo</a>
          </li>
        </ul>
      </nav>
      <nav id="paneldeposit">
        <mm-burger
          menu="panelright"
          fx="spin"
          ease="funky"
          role="button"
          tabindex="0"
          title="Open the menu"
          style={{
            position: "absolute",
            color: "white",
            marginLeft: -40,
            marginTop: 18,
          }}
        ></mm-burger>

        <ul>
          <li>
            <a href="#/">Home</a>
          </li>
          <li>
            <span>About us</span>
            <ul>
              <li>
                <a href="#/">History</a>
              </li>
              <li>
                <span>The team</span>
                <ul>
                  <li>
                    <a href="#/">Management</a>
                  </li>
                  <li>
                    <a href="#/">Sales</a>
                  </li>
                  <li>
                    <a href="#/">Development</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#/">Our address</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#/">Contact</a>
          </li>

          <li className="Divider">Other demos</li>
          <li>
            <a href="advanced.html">Advanced demo</a>
          </li>
          <li>
            <a href="onepage.html">One page demo</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default App;
