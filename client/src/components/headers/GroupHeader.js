import React from 'react';
import '../../build/static/styles/auth-custom.scss';
export default props => (
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
          <li className="active"><a href="#">Dashboard</a></li>
          <li><a href="#">Groups</a></li>
          <li><a href="#">Friends</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Message</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Jimoh <b className="caret"></b></a>
            <ul className="dropdown-menu">
              <li><a href="#">Profile</a></li>
              <li><a href="#">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
