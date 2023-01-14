import React from "react";
import ReactDOM from "react-dom/client";
import Project from "./Pages/Project/Project";

// Setup Redux
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";
// Setup Routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
