import React from "react";
import "../../Assets/Sass/index.scss";

type Props = {};

const MainHeader = (props: Props) => {
  return (
    <div className="header">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
          <li className="breadcrumb-item">Project</li>
          <li className="breadcrumb-item">CyberLearn</li>
          <li className="breadcrumb-item">Project management</li>
          <li className="breadcrumb-item active" aria-current="page">
            {/* {projectDetail.projectName} */} project name
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default MainHeader;