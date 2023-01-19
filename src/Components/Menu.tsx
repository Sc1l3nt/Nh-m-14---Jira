import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="menu" style={{height: window.innerHeight}}>
        <div className="d-flex align-items-start flex-column px-4 position-relative">
          <NavLink className="link d-flex" to={"projectmanagement"}>
            <i className="fa-solid fa-bars-progress"></i>
            <h4 className="title">Project Management</h4>
          </NavLink>
          <div className="check position-absolute" />
        </div>
    </div>
  );
};

export default Menu;
