import React from "react";
//import { Row, Col } from "antd";
import SideBar from "../../Components/SideBar/SideBar";
import Menu from "../../Components/Menu/Menu";
import MainHeader from "../../Components/MainBoard/MainHeader";
import MainInfo from "../../Components/MainBoard/MainInfo";
import MainContent from "../../Components/MainBoard/MainContent";
import Modal from "../../Components/Modal/Modal";
type Props = {};

const Project = (props: Props) => {
  return (
    <div>
      <div className="jira">
        <SideBar />
        {/* Menu */}
        <Menu />
        {/* {/* {/* Main Board * /} * /} */}
        <div className="main">
          <MainHeader />
          <MainInfo />
          <MainContent />
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Project;
