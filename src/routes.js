import Dashboard from "views/Dashboard";
import Login from "views/Login";
import Config from "views/Config";
import Settings from "views/Settings";
import Filters from "views/Filters";
import ForgotPassword from "views/password/Forgot";
import SetNewPassword from "views/password/SetNew";

var routes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    show: true,
  },
  {
    path: "/filters",
    name: "Filters",
    icon: "nc-icon nc-settings",
    component: Filters,
    layout: "/admin",
    show: true,
  },
  {
    path: "/config",
    name: "Configuration",
    icon: "nc-icon nc-settings",
    component: Config,
    layout: "/admin",
    show: true,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-settings",
    component: Settings,
    layout: "/admin",
    show: false,
  }, {
    path: "/login",
    component: Login,
    layout: "/auth",
    show: false,
  }, {
    path: "/password/forgot",
    component: ForgotPassword,
    layout: "/auth",
    show: false,
  }, {
    path: "/password/new/:token",
    name: "SetNewPassword",
    icon: "nc-icon nc-bank",
    component: SetNewPassword,
    layout: "/auth",
    show: false,
  },
];
export default routes;
