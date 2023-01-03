import React, { useEffect, useRef, useState } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, useLocation } from "react-router-dom";
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import routes from "routes.js";
import { checkAuth } from "api/auth";
import { useHistory } from 'react-router-dom';

var ps;

function Admin(props) {
  const { push } = useHistory()
  const mainPanel = useRef();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = async () => {
    const isAuth = await checkAuth();
    if (!isAuth) {
      push('/auth/login');
    }
  }
  
  useEffect(() => {
    refreshToken();
    setIsLoading(false);
  }, [])

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });

  useEffect(() => {
    if (!isLoading) {
      mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }, [location, isLoading]);

  return (
    <div>
      {
        isLoading ? null :
          (
            <div className="wrapper">
              <Sidebar
                {...props}
                routes={routes}
                bgColor={"black"}
                activeColor={"info"}
              />
              <div className="main-panel" ref={mainPanel}>
                <Navbar {...props} />
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
                <Footer fluid />
              </div>
            </div>
          )
      }
    </div>
  );
}

export default Admin;
