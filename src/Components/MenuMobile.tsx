import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuMobile.scss";

type Props = {};

const MenuMobile = (props: Props) => {
  return (
    <div className="menu-mobile bg-primary">
      <div className="d-flex justify-content-between px-4 pb-4 pt-3">
        <NavLink className="link" to={"1"}>
          <h4 className="title">Project</h4>
          <i className="fa-solid fa-bars-progress"></i>
        </NavLink>
        <NavLink className="link" to={"projectmanagement"}>
          <h4 className="title">Project</h4>
          <i className="fa-solid fa-bars-progress"></i>
        </NavLink>
        <NavLink className="link" to={"2"}>
          <h4 className="title">Project</h4>
          <i className="fa-solid fa-bars-progress"></i>
        </NavLink>
        <div className="check position-absolute border border-3 border-primary" />
      </div>
    </div>
  );
};

export default MenuMobile;
