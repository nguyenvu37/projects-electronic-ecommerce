import React, { useState } from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";
import { titleProducts } from "../../../common/constantsVarlue";

export default function Navigation() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const onToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  let styleNav = toggleMenu ? "flex" : "none";
  return (
    <div className="navigation">
      <nav className="container">
        <div className="responsive-nav">
          <ul className="main-nav nav navbar-nav">
            {titleProducts.map((titleProduct, i) => {
              return (
                <NavLink
                  key={i + 1}
                  to={titleProduct.path}
                  style={{ textDecoration: "none" }}
                  className="mr"
                  id={`nav-${i + 1}`}
                >
                  {titleProduct.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="menu-icon">
          <i className="fas fa-bars" onClick={onToggleMenu}></i>
          <ul className="main-nav-bar nav" style={{ display: `${styleNav}` }}>
            {titleProducts.map((titleProduct, i) => {
              return (
                <NavLink
                  key={i}
                  to={titleProduct.path}
                  style={{ textDecoration: "none" }}
                  activeStyle={{
                    color: "#D10024",
                    borderBottom: "2px solid #D10024",
                  }}
                  className="ml"
                  id={`nav-${i + 1}`}
                >
                  {titleProduct.name}
                </NavLink>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}
