import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="menu">
      <div style={{ height: window.innerHeight }}>
        <div className="d-flex align-items-start flex-column px-4 position-relative">
          <NavLink className="link d-flex" to={"projectmanagement"}>
            <i className="fa-solid fa-bars-progress"></i>
            <h4 className="title">Project Management</h4>
          </NavLink>
          <NavLink className="link d-flex" to={"login"}>
            <i className="fa-solid fa-right-to-bracket"></i>
            <h4 className="title">Login</h4>
          </NavLink>
          <div className="line position-absolute" />
          <div className="check position-absolute" />
        </div>
      </div>
    </div>
  );
};

export default Menu;
