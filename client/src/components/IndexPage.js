import React from 'react';
import { Link } from 'react-router';
import AuthHeader from './headers/AuthHeader';

export default props => (
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover">
              <h1 className="cover-heading heading-text"><strong>PostIt</strong></h1>
              <p className="lead"><strong>PostIt</strong> is a simple application where friends,
                colleagues and love ones send notifications to one another via a group</p>
              <p>Join and share happy moment with those you care about</p>
              <form className="form-horizontal" role="form">
                <div className="form-group lead">
                  <div className="col-lg-offset-2 col-lg-8">
                    <Link to="/signin" className="btn btn-lg btn-success">Login now</Link>|
                    <Link to="/signup" className="btn btn-lg btn-danger">Join now</Link>
                  </div>
                </div>
              </form>

            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Designed by by Jimoh Hadi</p>
              </div>
            </div>

          </div>

        </div>
    );

