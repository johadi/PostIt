import React from 'react';
import { Link, browserHistory } from 'react-router';

const MainHeader = (props) => {
  const logout = () => {
    window.sessionStorage.removeItem('token');
    browserHistory.push('/');
  };
  return (
      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle"
                  data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#"><strong>PostIt</strong></a>
        </div>
        <div className="collapse navbar-collapse navbar-ex1-collapse">
          <ul className="nav navbar-nav">
            <li className="active">
              <Link to="/dashboard"><i className="fa fa-lg fa-tachometer" aria-hidden="true">
              </i> Dashboard</Link>
            </li>
            <li><Link to="/groups"><i className="fa fa-lg fa-users" aria-hidden="true">
            </i> Groups</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li style={{ marginRight: '10px' }}>
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
