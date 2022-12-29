import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import Login from "views/Login.js";

var routes = [
  {
    path: "/dashboard",
    name: "Accueil",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  }
];
export default routes;
