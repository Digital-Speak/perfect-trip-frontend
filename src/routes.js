import New from "views/folder/New";
import Edit from "views/folder/Edit";
import Config from "views/Config";
import ForgotPassword from "views/password/Forgot";
import Flight from "views/Flight";
import Hotels from "views/Hotels";
import Login from "views/Login";
import Settings from "views/Settings";
import SetNewPassword from "views/password/SetNew";
import Import from "views/Import";

var routes = [
  {
    path: "/newfolder",
    name: "new folder",
    icon: "nc-icon nc-bank",
    component: New,
    layout: "/admin",
    show: true,
  },
  {
    path: "/details",
    name: "filter",
    icon: "fa fa-envelope",
    component: Edit,
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
    path: "/flights",
    name: "Flights",
    icon: "fa fa-plane",
    component: Flight,
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
    name: "settings",
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
  {
    path: "/import",
    name: "Import Folders",
    icon: "nc-icon nc-single-copy-04",
    component: Import,
    layout: "/admin",
    show: true,
  }
];
export default routes;
