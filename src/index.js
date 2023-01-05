import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "assets/css/index.css";
import "./assets/fonts/Lato/Lato-Black.ttf";
import "./assets/fonts/Lato/Lato-BlackItalic.ttf";
import "./assets/fonts/Lato/Lato-Bold.ttf";
import "./assets/fonts/Lato/Lato-BoldItalic.ttf";
import "./assets/fonts/Lato/Lato-BoldItalic.ttf";
import "./assets/fonts/Lato/Lato-Italic.ttf";
import "./assets/fonts/Lato/Lato-Light.ttf";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import  "/node_modules/font-awesome/css/font-awesome.min.css"
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth";

import "./i18n.config"

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Redirect to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
);
