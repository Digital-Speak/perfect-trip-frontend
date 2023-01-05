import Dashboard from "views/Dashboard";
import Login from "views/Login";
import Settings from "views/Settings";
import Filters from "views/Filters";
import ForgotPassword from "views/ForgotPassword";

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
  {
    path: "/forgotpassword",
    name: "Forgot",
    icon: "nc-icon nc-bank",
    component: ForgotPassword,
    layout: "/auth",
    protected : false,
  },
];
export default routes;
