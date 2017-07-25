import React from 'react';
import { Link } from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import '../../build/static/styles/auth-custom.scss';

export default class SigninPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const body = document.getElementById('body');
    const app = document.getElementById('app');
    app.className = 'site-wrapper';
    body.className = 'body';
    body.style.height = '100%';
  }
  render() {
    return (
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover">
              <h2 className="cover-heading"><strong>Login to PostIt,</strong></h2>
              <p className="lead">Share your moment with colleagues and friends.</p>
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <input type="text" className="form-control" id="username" placeholder="Username"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <input type="password" className="form-control" id="password" placeholder="Password"/>
                  </div>
                </div>

                <div className="form-group lead">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <button type="submit" className="btn btn-lg btn-success btn-block">Login now</button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <div className="checkbox" style={{ textAlign: 'left' }}>
                      <label>
                        <input type="checkbox"/> Remember me
                      </label>
                    </div>
                    <p>
                      No Account yet ? <Link className="text-underline text-signin" to="/signup"><strong>Sign up</strong></Link>
                    </p>
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
  }
}
