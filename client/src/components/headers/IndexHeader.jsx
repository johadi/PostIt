import React from 'react';
import { IndexLink, Link } from 'react-router';

const IndexHeader = props => (
    <div className="masthead clearfix">
      <div className="inner">
        <h2 className="masthead-brand">PostIt</h2>
        <nav>
          <ul className="nav masthead-nav">
            <li><IndexLink activeClassName = "index-active" to="/">Home</IndexLink></li>
            <li><Link activeClassName = "index-active" to="/signin">Login</Link></li>
            <li><Link activeClassName = "index-active" to="/signup">Sign up</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
export default IndexHeader;
