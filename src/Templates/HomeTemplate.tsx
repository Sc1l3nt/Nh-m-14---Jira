import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import "./HomeTemplate.scss";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <div className="template">
      <Header />
      <div className="d-flex my-2 mx-1">
        <div className="item-left item">
          <Menu />
        </div>
        <div className="item-right item">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
