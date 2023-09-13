import React from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Logout from "../../src/images/logout.svg";
import blackLogout from "../../src/images/logout-black.svg";

function Navigation(props) {
  const location = useLocation();
  const { username, loggedIn, setLoggedIn, isMenuOpen, isMobile } = props;
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem("token");
    window.location.reload();
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <nav className="navigation">
      {props.isMobile ? (
        <div className="navigation__main">
          <div className="navigation__subwrapper">
            {!props.isBackPopupOpen && (
              <button
                className="navigation__button"
                type="button"
                onClick={props.prepareHamburger}
              >
                <div
                  className={`navigation__button-line ${
                    isMenuOpen ? "navigation__button-line_closing" : ""
                  } ${
                    location.pathname === "/saved-news" && !isMenuOpen
                      ? "navigation_black"
                      : ""
                  }`}
                ></div>
                <div
                  className={`navigation__button-line ${
                    isMenuOpen ? "navigation__button-line_closing " : ""
                  } ${
                    location.pathname === "/saved-news" && !isMenuOpen
                      ? "navigation_black"
                      : ""
                  }`}
                ></div>
              </button>
            )}
          </div>

          {isMenuOpen && (
            <>
              <div className="navigation__line"></div>
              <NavLink
                to="/"
                className={`navigation__home_mobile ${
                  location.pathname === "/"
                    ? ""
                    : "navigation__button_textblack"
                }`}
              >
                Home
              </NavLink>
              {loggedIn && (
                <NavLink
                  to="/saved-news"
                  className={`navigation__saved_mobile ${
                    location.pathname === "/saved-news"
                      ? ""
                      : "navigation__button_textblack"
                  }`}
                >
                  Saved articles
                </NavLink>
              )}
              {loggedIn ? (
                <>
                  <NavLink
                    to="/saved-news"
                    className={`navigation__home ${
                      location.pathname === "/saved-news"
                        ? "navigation__home_active"
                        : ""
                    }`}
                  >
                    Saved articles
                  </NavLink>
                  <button
                    className={`navigation__sign navigation__name 
                    ${
                      location.pathname === "/saved-news" ||
                      (location.pathname === "/" && isMenuOpen)
                        ? ""
                        : "navigation__button_textblack navigation__sign_black"
                    }`}
                  >
                    {username}{" "}
                    <img
                      className="navigation__outbutton"
                      onClick={handleSignOut}
                      src={
                        isMobile
                          ? Logout
                          : location.pathname === "/saved-news"
                          ? blackLogout
                          : Logout
                      }
                      alt="Logout"
                    />
                  </button>
                </>
              ) : (
                <button className="navigation__sign" onClick={props.onLogin}>
                  Sign in
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <NavLink
            to="/"
            className={`navigation__home ${
              location.pathname === "/saved-news"
                ? "navigation__home navigation__button_textblack"
                : location.pathname === "/"
                ? "navigation__home_active"
                : ""
            }`}
          >
            Home
          </NavLink>
          {loggedIn ? (
            <>
              <NavLink
                to="/saved-news"
                className={`navigation__home ${
                  location.pathname === "/saved-news"
                    ? "navigation__home_active navigation__button_textblack navigation__savednews_active"
                    : ""
                }`}
              >
                Saved articles
              </NavLink>
              <button
                className={`navigation__sign navigation__name ${
                  location.pathname === "/saved-news"
                    ? "navigation__button_textblack navigation__sign_black"
                    : ""
                }`}
              >
                {username}{" "}
                <img
                  className="navigation__outbutton"
                  onClick={handleSignOut}
                  src={
                    location.pathname === "/saved-news" ? blackLogout : Logout
                  }
                  alt="Logout"
                />
              </button>
            </>
          ) : (
            <button className="navigation__sign" onClick={props.onLogin}>
              Sign in
            </button>
          )}
        </>
      )}
    </nav>
  );
}

export default Navigation;
