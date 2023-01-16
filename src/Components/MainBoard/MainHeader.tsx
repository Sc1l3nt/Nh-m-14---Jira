import React from "react";
import { Breadcrumb } from "antd";
type Props = {};

const MainHeader = (props: Props) => {
  return (
    <>
      {/* <div className="header">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
            <li className="breadcrumb-item">Project</li>
            <li className="breadcrumb-item">CyberLearn</li>
            <li className="breadcrumb-item active" aria-current="page">
              Cyber Board
            </li>
          </ol>
        </nav>
      </div> */}
      <Breadcrumb>
        <Breadcrumb.Item>Project</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="" style={{ textDecoration: "none" }}>
            Cyberlearn
          </a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="" style={{ textDecoration: "none" }}>
            Cyberboard
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default MainHeader;
