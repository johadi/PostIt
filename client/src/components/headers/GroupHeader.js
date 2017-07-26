import React from 'react';
import { Link, browserHistory } from 'react-router';
import '../../build/static/styles/auth-custom.scss';

const GroupHeader = (props) => {
  const logout = () => {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  };
  return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">PostIt</a>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/groups">Groups</Link></li>
            <li><Link href="#">Friends</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="#">Notifications</Link></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">Jimoh <b className="caret"></b></a>
              <ul className="dropdown-menu">
                <li><Link href="#">Profile</Link></li>
                <li><Link to="#" onClick={logout}>Logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
  );
};
export default GroupHeader;
