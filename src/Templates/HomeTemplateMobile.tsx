import React from "react";
import { Outlet } from "react-router-dom";
import HeaderMobile from "../Components/HeaderMobile";
import MenuMobile from "../Components/MenuMobile";
import PopUpMobile from "../Components/PopUpMobile";
import "./HomeTemplateMobile.scss";

type Props = {};

const HomeTemplateMobile = (props: Props) => {
  return (
    <div
      className="home-template-mobile"
      style={{ height: window.innerHeight }}
    >
      <HeaderMobile />
      <div className="main mt-3 border border-3 border-primary">
        <Outlet />
      </div>
      <MenuMobile />
    </div>
  );
};

export default HomeTemplateMobile;
