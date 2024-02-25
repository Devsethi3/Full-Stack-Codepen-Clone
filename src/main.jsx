import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/userContext/UserContext.jsx";
import { ProjectContextProvider } from "./context/userContext/postContext/PostContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <ProjectContextProvider>
        <Router>
          <App />
        </Router>
      </ProjectContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
