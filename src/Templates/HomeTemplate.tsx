import React from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import "./HomeTemplate.scss";
import PopUp from "../Components/PopUp";

type Props = {};

const HomeTemplate = (props: Props) => {
  return (
    <div className="template">
      <Header />
      <PopUp />
      <div className="d-flex my-4 mx-1">
        <div className="item-left item">
          <Menu />
        </div>
        <div className="item-right item bg-primary">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
