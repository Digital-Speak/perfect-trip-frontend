import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/img/login/logo.png';

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const { t } = useTranslation();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a
          href={`${process.env.REACT_APP_CLIENT_URL}/admin/dashboard`}
          className="simple-text logo-normal"
        >
          <img alt='logo' src={logo} />
        </a>
      </div>
      <div className="sidebar-wrapper position-relative" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              prop?.show &&
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{t(`${prop.name}`)}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
        <Nav className="position-absolute fixed-bottom">
        <li
             
              >
                <NavLink
                  to={'/admin/settings'}
                  className="nav-link"
                  activeClassName="active"
                >
                  
                  <p> <i className="fa fa-cogs" />settings</p>
                </NavLink>
              </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
