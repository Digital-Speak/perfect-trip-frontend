import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";

function Auth(props) {
 return (
  <div className="wrapper">
   <Switch>
    {routes.map((prop, key) => {
     return (
      <Route
       path={prop.layout + prop.path}
       component={prop.component}
       key={key}
      />
     );
    })}
    {/* <Redirect from='*' to='/admin/dashboard' /> */}
   </Switch>
  </div>
 );
}

export default Auth;
