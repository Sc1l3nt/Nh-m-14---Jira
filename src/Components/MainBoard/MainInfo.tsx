import React from "react";

type Props = {};

const MainInfo = (props: Props) => {
  return (
    <div>
      {/* <h3>{projectDetail.projectName}</h3> */}
      <h3>Project Name</h3>

      {/* <section>{ReactHtmlParser(projectDetail.description)}</section> */}
      <section>Project Description</section>
      <div className="info" style={{ display: "flex" }}>
        <div className="search-block">
          <input className="search" />
          <i className="fa fa-search" />
        </div>
        <div className="avatar-group" style={{ display: "flex" }}>
          Avatar
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Only My Issues
        </div>
        <div style={{ marginLeft: 20 }} className="text">
          Recently Updated
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
