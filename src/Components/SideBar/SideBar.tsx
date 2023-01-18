import React from "react";
import "./SideBar.scss";

type Props = {};

const SideBar = (props: Props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-icon mb-3">
          <i className="fa-brands fa-jira"></i>
        </div>
        <div className="sidebar-icon my-2">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span>Search Issues</span>
        </div>
        <div className="sidebar-icon my-2">
          <i className="fa-solid fa-plus"></i>
          <span>Create Issues</span>
        </div>
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-icon">
          <i className="fa-solid fa-circle-info"></i>
          <span>About</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
