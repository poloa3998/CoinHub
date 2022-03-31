import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BsList } from "react-icons/bs";
import "../styles/Nav.css";

const Nav = ({ theme, setTheme }: any) => {
  let activeClassName: string = "navLink active";
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [screenSize, setScreenSize] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setActiveMenu(false);
    } else {
      document.body.style.overflow = "unset";
      setActiveMenu(true);
    }
  }, [screenSize]);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleClick = () => {
    activeMenu
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
    setActiveMenu(false);
  };
  return (
    <nav className="navbar">
      <div className="logo-wrapper">
        <h1>
          <NavLink to="/" className="logo">
            CoinHub
          </NavLink>
        </h1>
        {screenSize <= 768 && (
          <BsList
            className="menu"
            onClick={() => {
              activeMenu
                ? (document.body.style.overflow = "unset")
                : (document.body.style.overflow = "hidden");

              setActiveMenu(!activeMenu);
            }}
          />
        )}
      </div>

      {activeMenu && (
        <div className="link-wrapper">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : "navLink"
            }
            onClick={() => (screenSize <= 768 ? handleClick() : null)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cryptocurrencies"
            className={({ isActive }) =>
              isActive ? activeClassName : "navLink"
            }
            onClick={() => (screenSize <= 768 ? handleClick() : null)}
          >
            Cryptocurrencies
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? activeClassName : "navLink"
            }
            onClick={() => (screenSize <= 768 ? handleClick() : null)}
          >
            News
          </NavLink>
          {screenSize <= 768 ? (
            <div className="dark-mode">
              <p>Dark Mode</p>

              <input
                type="checkbox"
                id="toggle"
                className="toggle--checkbox"
                defaultChecked={theme === "light" ? false : true}
              />
              <label
                htmlFor="toggle"
                className="toggle--label"
                onClick={switchTheme}
              >
                <span className="toggle--label-background"></span>
              </label>
            </div>
          ) : (
            <>
              <input
                type="checkbox"
                id="toggle"
                className="toggle--checkbox"
                defaultChecked={theme === "light" ? false : true}
              />
              <label
                htmlFor="toggle"
                className="toggle--label"
                onClick={switchTheme}
              >
                <span className="toggle--label-background"></span>
              </label>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
export default Nav;
