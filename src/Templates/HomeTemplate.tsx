import React, { useState } from "react";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import "./HomeTemplate.scss";

type Props = {};

const HomeTemplate = (props: Props) => {
  const [size, setSize] = useState<SizeType>();
  return (
    <div className="template">
      <Header />
      <div className="creat-button" style={{ position: 'sticky', top: '700px', marginLeft: '1410px', height: '20px' }}>
        <button className="rounded-circle bg-primary text-light fs-4 btn py-1">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="d-flex my-2 mx-1">
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
