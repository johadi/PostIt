import React from 'react';
import { Link, browserHistory } from 'react-router';

/**
 * Main header component
 * @function MainHeader
 * @param {object} props
 * @return {XML} JSX
 */
const MainHeader = () => {
  const logout = () => {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  };
  return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"
                  data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <span className="navbar-brand"><strong>PostIt</strong></span>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav main-header-ul">
            <li>
              <Link activeClassName="main-header" to="/dashboard">
                <i className="fa fa-lg fa-tachometer" aria-hidden="true"></i> Dashboard</Link>
            </li>
            <li><Link activeClassName="main-header" to="/groups">
              <i className="fa fa-lg fa-users" aria-hidden="true"></i> Groups</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="main-header-logout">
              <Link to="#" onClick={logout}>
                <i className="fa fa-lg fa-sign-out" aria-hidden="true"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};
export default MainHeader;
