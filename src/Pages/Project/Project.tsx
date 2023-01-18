import React from "react";
import MainContent from "../../Components/MainBoard/MainContent";
import MainHeader from "../../Components/MainBoard/MainHeader";
import MainInfo from "../../Components/MainBoard/MainInfo";
import Menu from "../../Components/Menu/Menu";
import SideBar from "../../Components/SideBar/SideBar";
import "../../Assets/Sass/index.scss";
import { Row, Col } from "antd";

type Props = {};

const Project: React.FC = (props: Props) => {
  return (
    <div>
      <Row>
        <Col span={4}>
          <SideBar />
        </Col>
        <Col span={4}>
          <Menu />
        </Col>
        <Col span={16}>
          <div className="main">
            <h3>Cyber Board</h3>
            <MainHeader />
            <MainContent />
            <MainInfo />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Project;
