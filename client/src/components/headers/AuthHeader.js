import React from 'react';
import { IndexLink, Link } from 'react-router';

const AuthHeader = props => (
    <div className="masthead clearfix">
      <div className="inner">
        <h2 className="masthead-brand">PostIt</h2>
        <nav>
          <ul className="nav masthead-nav">
            <li className="active"><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
export default AuthHeader;
