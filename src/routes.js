import Dashboard from "views/Dashboard";
import Login from "views/Login";
import LoginV2 from "views/Login-v2";
import Settings from "views/Settings";
import Filters from "views/Filters";

var routes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    protected : true,
  },
  // {
  //   path: "/filters",
  //   name: "Filters",
  //   icon: "nc-icon nc-settings",
  //   component: Filters,
  //   layout: "/admin",
  //   protected: true,
  // },
  {
    path: "/config",
    name: "Configuration",
    icon: "nc-icon nc-settings",
    component: Settings,
    layout: "/admin",
    protected : true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/auth",
    protected : false,
  },
  // {
  //   path: "/login-v2",
  //   name: "Login-V2",
  //   icon: "nc-icon nc-bank",
  //   component: LoginV2,
  //   layout: "/auth",
  //   protected: false,
  // }
];
export default routes;
