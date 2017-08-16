import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import {resetPasswordAction} from '../../actions/auth/passwordAction';
import FormField from './ResetPasswordFormField';
import ErrorComponent from '../ErrorComponent';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
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
    this.props.resetPasswordAction(this.props.location.query.qrp, this.state.user);
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
            <h2 className="cover-heading text-signup">Reset Password for PostIt</h2>
            <div className="row">
              <form onSubmit={this.handleSubmit} role="form" className="form-horizontal">
                { this.props.resetState.reset_fails ? <ErrorComponent fails={this.props.resetState.reset_fails} /> : null }
                { !this.props.resetState.reset_message ? null :
                  <div className="alert alert-success alert-dismissible">
                    { this.props.resetState.reset_message }
                  </div>}
                <div className="col-lg-offset-2 col-lg-8">
                  <FormField type="password" errors={this.props.resetState.reset_errors} onChange={this.handleChange}
                             value={this.state.user.password} name="password" placeholder="Password"/>
                  <FormField type="password" errors={this.props.resetState.reset_errors} onChange={this.handleChange}
                             value={this.state.user.confirm_password} name="confirm_password" placeholder="Confirm password"/>
                </div>
                <div className="col-lg-offset-2 col-lg-8">
                  <div className="form-group lead">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-danger btn-block">Reset my password</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
          <div className="mastfoot">
            <div className="inner">
              <p>Designed by Johadi</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    resetState: state.passwordReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({resetPasswordAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
