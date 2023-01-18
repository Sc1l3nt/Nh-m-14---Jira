import React from "react";
import "../../Assets/Sass/index.scss";
type Props = {};

const Menu = (props: Props) => {
  return (
    <div className="menu w-100">
      <div className="account">
        <div className="avatar">
          <img src="https://i.pravatar.cc/300" alt="123" />
        </div>
        <div className="account-info">
          <p>CyberLearn.vn</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card mr-1" />
          {/* <NavLink
            className="text-dark active font-weight-bold text-primary"
            style={{ color: "blue" }}
            to="/cyberbugs"
          >
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink
            className="text-dark active font-weight-bold  text-primary"
            style={{ color: "blue" }}
            to="/projectmanagement"
          >
            Project management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog mr-1" />
          <NavLink
            className="text-dark active font-weight-bold  text-primary"
            style={{ color: "blue" }}
            to="/createproject"
          >
            Create project
          </NavLink> */}
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck mr-1" />
          <span>Releases</span>
        </div>
        <div>
          <i className="fa fa-equals mr-1" />
          <span>Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste mr-1" />
          <span>Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow mr-1" />
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
