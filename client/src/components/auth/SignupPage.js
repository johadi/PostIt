import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import '../../build/static/styles/auth-custom.scss';
import {signupAction} from '../../actions/auth/signupAction';
import FormField from './SignUpFormField';
import ErrorComponent from '../ErrorComponent';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        fullname: '',
        email: '',
        mobile: '',
        password: '',
        confirm_password: ''
      }
    }
  }
  // handles the background of signup page
  componentDidMount() {
    const body = document.getElementById('body');
    const app = document.getElementById('app');
    app.className = 'site-wrapper';
    body.className = 'body';
    body.style.height = '100%';
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signupAction(this.state.user);
  }
  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }
  render() {
    return (
        <div className="site-wrapper-inner">
          <div className="cover-container">
            <AuthHeader/>
            <div className="inner cover" style={{opacity: 0.8, backgroundColor: 'whitesmoke'}}>
              <h1 className="cover-heading text-signup"><strong>Sign up for PostIt,</strong></h1>
              <p className="lead text-signup">Share your moment with family and friends.</p>
              <div className="row">
                <form onSubmit={this.handleSubmit} role="form" className="form-horizontal">
                  { this.props.signupState.fails ? <ErrorComponent fails={this.props.signupState.fails} /> : null }
                  <div className="col-lg-6">
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.fullname}
                                name="fullname" placeholder="Full name"/>
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.email}
                                type="email" name="email" placeholder="Email"/>
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.mobile}
                                name="mobile" placeholder="Mobile No" required='required'/>
                  </div>
                  <div className="col-lg-6">
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.username}
                                name="username" placeholder="Username"/>
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.password}
                                type="password" name="password" placeholder="Password"/>
                    <FormField errors={this.props.signupState.errors} onChange={this.handleChange} value={this.state.user.confirm_password}
                                type="password" name="confirm_password" placeholder="Confirm password"/>
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
                        <p className="text-signup">
                          Already have an Account ? <Link className="text-primary"
                                                          to="/signin"><strong>Login</strong></Link>
                        </p>
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
const mapStateToProps = (state) => {
  return {
    signupState: state.signupReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signupAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
// { this.props.signupState.error ? <ErrorComponent error={this.props.signupState.error} /> : null }
