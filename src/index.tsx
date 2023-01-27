import React from "react";
import ReactDOM from "react-dom/client";

import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import "./index.scss";
// Setup Redux

import { Provider } from "react-redux";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import HomeTemplate from "./Templates/HomeTemplate";
import LoginTemplate from "./Templates/LoginTemplate";

import { store } from "./Redux/configStore";
import ReponsiveItem from "./Components/ReponsiveItem";
import LoginTemplateMobile from "./Templates/LoginTemplateMobile";
import HomeTemplateMobile from "./Templates/HomeTemplateMobile";
import Profile from "./Pages/Profile/Profile";
import ListUser from "./Pages/ListUser/ListUser";
import Projects from "./Pages/Projects/Projects";
import ProjectNew from "./Pages/Projects/New/ProjectNew";
import ProjectDetail from "./Pages/Projects/Detail/ProjectDetail";
import ProjectEdit from "./Pages/Projects/Edit/ProjectEdit";
import Tasks from "./Pages/Tasks/Tasks";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const history: any = createBrowserHistory();

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route
          path="/"
          element={
            <ReponsiveItem
              component={LoginTemplate}
              componentMobile={LoginTemplateMobile}
            />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <ReponsiveItem
              component={HomeTemplate}
              componentMobile={HomeTemplateMobile}
            />
          }
        >
          <Route path="*" element={<PageNotFound />} />
          {/* PROJECT ROUTE  */}
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectNew />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="projects/:id/edit" element={<ProjectEdit />} />
          <Route path="projects/:projectId/board" element={<Tasks />} />
          {/* PROJECT ROUTE  */}
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<ListUser />} />
        </Route>
        <Route index element={<Navigate to="projects" />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);
