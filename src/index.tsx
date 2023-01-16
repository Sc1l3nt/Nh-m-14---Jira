import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
// Setup Redux
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
// Setup Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Project from "./Pages/Project/Project";
import ProjectList from "./Pages/Project/List/ProjectList";
import ProjectDetail from "./Pages/Project/Detail/ProjectDetail";
import ProjectNew from "./Pages/Project/New/ProjectNew";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<ProjectNew />} />
        {/* List of Projects  */}
        <Route path="/project" element={<Project />} />
        {/* Create New Project  */}
        <Route path="/project/new" />
        {/* Project Detail  */}
        <Route path="/project/:id" />
        {/* Edit Project  */}
        <Route path="/project/:id/edit" />
        {/* Main Board of Project  */}
        <Route path="/project/:id/board" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
