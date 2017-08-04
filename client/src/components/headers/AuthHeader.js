import React from 'react';
import { IndexLink, Link } from 'react-router';

export default props => (
      <div className="masthead clearfix">
        <div className="inner">
          <h2 className="masthead-brand">PostIt</h2>
          <nav>
            <ul className="nav masthead-nav">
              <li className="active"><IndexLink to="/">Home</IndexLink></li>
              <li><Link to="/signin">Login</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
              <li><Link to="#">About us</Link></li>
              <li><Link to="#">Contact us</Link></li>
            </ul>
          </nav>
        </div>
      </div>
  );
