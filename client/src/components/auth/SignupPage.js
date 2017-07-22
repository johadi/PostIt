import React from 'react';
import { Link } from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import '../../build/static/styles/auth-custom.scss';

export default class SignupPage extends React.Component {
  render() {
    return (
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover" style={{ opacity: 0.8, backgroundColor: 'whitesmoke' }}>
              <h1 className="cover-heading text-signup"><strong>Sign up for PostIt,</strong></h1>
              <p className="lead text-signup">Share your moment with family and friends.</p>
              <div className="row">
                <form role="form" className="form-horizontal">
                  <div className="col-lg-6">

                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="text" className="form-control" id="fullname" placeholder="Full name"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="email" className="form-control" id="email" placeholder="Email"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="text" className="form-control" id="mobile" placeholder="Mobile No"/>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="text" className="form-control" id="username" placeholder="Username"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="password" className="form-control" id="password" placeholder="Password"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-12">
                        <input type="password" className="form-control" id="confirm_password" placeholder="Confirm Password"/>
                      </div>
                    </div>

                  </div>
                  <div className="col-lg-6">
                    <div className="form-group lead">
                      <div className="col-lg-12">
                        <button type="submit" className="btn btn-lg btn-primary pull-left">Sign up</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="col-lg-12">
                        <p className="text-signup">Already have an Account ? <Link className="text-primary" to="/signin"><strong>Login</strong></Link></p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Designed by by Jimoh Hadi</p>
              </div>
            </div>

          </div>

        </div>
    );
  }
}

