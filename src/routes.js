import Dashboard from "views/Dashboard";
import FolderDetails from "views/FolderDetails";
import Login from "views/Login";
import Config from "views/Config";
import Settings from "views/Settings";
import Hotels from "views/Hotels";
import Folders from "views/Folders";
import ForgotPassword from "views/password/Forgot";
import SetNewPassword from "views/password/SetNew";
import Flight from "views/Flight";

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
    path: "/details",
    name: "Dossiers",
    icon: "fa fa-envelope",
    component: FolderDetails,
    layout: "/admin",
    show: true,
  },
  // {
  //   path: "/folders",
  //   name: "Folders",
  //   icon: "fa fa-envelope",
  //   component: Folders,
  //   layout: "/admin",
  //   show: true,
  // },
  {
    path: "/flights",
    name: "Flights",
    icon: "fa fa-plane",
    component: Flight,
    layout: "/admin",
    show: true,
  },
  {
    path: "/filters",
    name: "Hotels",
    icon: "fa fa-filter",
    component: Hotels,
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
