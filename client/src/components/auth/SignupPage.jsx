import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import IndexHeader from '../headers/IndexHeader.jsx';
import { signupAction } from '../../actions/auth/signupAction';
import FormField from './SignUpFormField.jsx';
import ErrorComponent from '../ErrorComponent.jsx';

/**
 * SignupPage class declaration
 */
export class SignupPage extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @return {null} null
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        fullname: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: ''
      }
    };
  }
  /**
   * @return {void} void
   */
  componentWillMount() {
    if (window.sessionStorage.token) {
      browserHistory.push('/dashboard');
    }
  }
  /**
   * handle submit
   * @return {e} e
   * @param {e} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signupAction(this.state.user);
  }
  /**
   * handle change
   * @return {e} e
   * @param {e} e
   */
  handleChange(e) {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }
  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <IndexHeader/>
              <div className="inner cover"
                   style={{ opacity: 0.8, backgroundColor: 'whitesmoke' }}>
                <h1 className="cover-heading text-signup">
                  <strong>Sign up for PostIt,</strong>
                </h1>
                <p className="lead text-signup">
                  Share your moment with family and friends.
                </p>
                <div className="row">
                  <form onSubmit={e => this.handleSubmit(e)}
                        role="form" className="form-horizontal">
                    { this.props.signupState.fails ? <ErrorComponent
                      fails={this.props.signupState.fails} /> : null }
                    <div className="col-lg-6">
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.fullname}
                                 name="fullname" placeholder="Full name"/>
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.email}
                                 type="email" name="email"
                                 placeholder="Email"/>
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.mobile}
                                 name="mobile"
                                 placeholder="Mobile No. e.g +23480123456789"
                                 required='required'/>
                    </div>
                    <div className="col-lg-6">
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.username}
                                 name="username" placeholder="Username"/>
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.password}
                                 type="password"
                                 name="password" placeholder="Password"/>
                      <FormField errors={this.props.signupState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.confirmPassword}
                                 type="password" name="confirmPassword"
                                 placeholder="Confirm password"/>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <div className="col-lg-12">
                          <p className="text-signup pull-left">
                            Already have an Account ?
                            <Link className="text-primary" to="/signin">
                              <strong> Login</strong></Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group lead">
                        <div className="col-lg-12">
                          <button
                            id="signup"
                            type="submit"
                            className="btn btn-lg btn-primary pull-right">
                            Sign up
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
              <div className="mastfoot">
                <div className="inner">
                  <p>Copyright &copy; Johadi PostIt 2017</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SignupPage.propTypes = {
  signupAction: PropTypes.func.isRequired,
  signupState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
