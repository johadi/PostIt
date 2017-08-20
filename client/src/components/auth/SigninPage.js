import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import AuthHeader from '../headers/AuthHeader';
import { signinAction } from '../../actions/auth/signinAction';
import FormField from './SignInFormField';
import ErrorComponent from '../ErrorComponent';

/**
 * Signin class declaration
 */
export class SigninPage extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @return {void} void
   */
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: ''
      }
    };
  }
  /**
   * handle submit
   * @param {e} e
   * @return {void} void
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signinAction(this.state.credentials);
  }
  /**
   * handle change
   * @param {e} e
   * @return {void} void
   */
  handleChange(e) {
    const credentials = this.state.credentials;
    credentials[e.target.name] = e.target.value;
    this.setState({ credentials });
  }
  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <AuthHeader/>
              <div className="inner cover">
                <h2 className="cover-heading"><strong>Login to PostIt,</strong></h2>
                <p className="lead">Share your moment with colleagues and friends.</p>
                <form onSubmit={e => this.handleSubmit(e)} className="form-horizontal" role="form">
                  { this.props.signinState.fails ? <ErrorComponent show={true} fails={this.props.signinState.fails} /> : null }
                  <FormField errors={this.props.signinState.errors} onChange={e => this.handleChange(e)} value={this.state.credentials.username}
                             name="username" placeholder="Username"/>
                  <FormField type="password" errors={this.props.signinState.errors} onChange={e => this.handleChange(e)}
                             value={this.state.credentials.password} name="password" placeholder="Password"/>
                  <div className="form-group lead">
                    <div className="col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                      <button id="signin" type="submit" className="btn btn-lg btn-success btn-block">Login now</button>
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
        </div>
      </div>
    );
  }
}
SigninPage.propTypes = {
  signinState: PropTypes.object.isRequired,
  signinAction: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  signinState: state.signinReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ signinAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
