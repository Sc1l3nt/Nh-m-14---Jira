import React from "react";
import ReactDOM from "react-dom/client";
import SideBar from "./Components/SideBar/SideBar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div>
    <SideBar />
  </div>
);
