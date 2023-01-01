import Dashboard from "views/Dashboard.js";
import Login from "views/Login";

var routes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    protected : true ,
  },
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-bank",
    component: Login,
    layout: "/auth",
    protected : false ,
  }
];
export default routes;
