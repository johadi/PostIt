import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AuthHeader from '../headers/AuthHeader';
import {signinAction} from '../../actions/auth/signinAction';
import FormField from './SignInFormField';
import ErrorComponent from '../ErrorComponent';

class SigninPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
  }
  // handles the background of signin page
  componentDidMount(){
    const body = document.getElementById('body');
    const app = document.getElementById('app');
    app.className = 'site-wrapper';
    body.className = 'body';
    body.style.height = '100%';
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signinAction(this.state.credentials);
  }
  handleChange = (e) => {
    let credentials = this.state.credentials;
    credentials[e.target.name] = e.target.value;
    this.setState({credentials});
  }
  render() {
    return (
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover">
              <h2 className="cover-heading"><strong>Login to PostIt,</strong></h2>
              <p className="lead">Share your moment with colleagues and friends.</p>
              <form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
                { this.props.signinState.fails ? <ErrorComponent show={true} fails={this.props.signinState.fails} /> : null }
                <FormField errors={this.props.signinState.errors} onChange={this.handleChange} value={this.state.credentials.username}
                           name="username" placeholder="Username"/>
                <FormField type="password" errors={this.props.signinState.errors} onChange={this.handleChange}
                           value={this.state.credentials.password} name="password" placeholder="Password"/>
                <div className="form-group lead">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <button type="submit" className="btn btn-lg btn-success btn-block">Login now</button>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <span className="pull-left">
                      No Account yet ? <Link className="text-underline text-signin" to="/signup"><strong>Sign up</strong></Link>
                    </span>
                    <span className="pull-right">
                      Forget Password ?
                      <Link className="text-underline text-signin" to="/recover-password"> <strong>Click</strong></Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="mastfoot">
              <div className="inner">
                <p>Designed by Joadi</p>
              </div>
            </div>

          </div>

        </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signinState: state.signinReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signinAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
