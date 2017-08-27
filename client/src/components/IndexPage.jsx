import React from 'react';
import { Link } from 'react-router';
import AuthHeader from './headers/AuthHeader.jsx';

const IndexPage = props => (
    <div className="body">
      <div className="site-wrapper">
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover">
              <h1 className="cover-heading heading-text">
                <strong>
                  PostIt <i className="fa fa-handshake-o" aria-hidden="true"></i>
                </strong>
              </h1>
              <p className="lead"><strong>PostIt</strong> is a simple application where friends,
                colleagues and love ones send notifications to one another via a group</p>
              <p>Join and share happy moment with those you care about <i className="fa fa-lg fa-smile-o" aria-hidden="true"></i></p>
              <form className="form-horizontal" role="form">
                <div className="form-group lead">
                  <div className="col-lg-offset-2 col-lg-8">
                    <Link to="/signin" className="btn btn-lg btn-success">
                      <i className="fa fa-lg fa-thumbs-up" aria-hidden="true"></i> Login now
                    </Link> &nbsp;
                    <Link to="/signup" className="btn btn-lg btn-danger">
                      <i className="fa fa-lg fa-user-plus" aria-hidden="true"></i> Join now
                    </Link>
                  </div>
                </div>
              </form>

            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Designed by Johadi</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
export default IndexPage;
