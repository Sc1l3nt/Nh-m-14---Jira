import React from "react";
import "./Menu.scss";
import { Avatar } from "antd";

type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar me-2">
          <Avatar src="https://i.pravatar.cc/600" size="large" />
        </div>
        <div className="account-info">
          <span>Project Name</span>
          <span>Project Category</span>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <span>Cyber Board</span>
        </div>
        <div>
          <i className="fa fa-cog" />
          <span>Project Settings</span>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span>Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span>Components</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
