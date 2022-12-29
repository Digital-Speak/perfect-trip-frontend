import React from "react";
import { Route, Switch } from "react-router-dom";
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
   </Switch>
  </div>
 );
}

export default Auth;
