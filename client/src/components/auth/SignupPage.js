import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import AuthHeader from '../headers/AuthHeader';
import { signupAction } from '../../actions/auth/signupAction';
import FormField from './SignUpFormField';
import ErrorComponent from '../ErrorComponent';

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
        confirm_password: ''
      }
    };
  }
  /**
   * mount
   * @return {null} null
   */
  componentDidMount() {
    console.log('hello');
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
              <AuthHeader/>
              <div className="inner cover" style={{ opacity: 0.8, backgroundColor: 'whitesmoke' }}>
                <h1 className="cover-heading text-signup"><strong>Sign up for PostIt,</strong></h1>
                <p className="lead text-signup">Share your moment with family and friends.</p>
                <div className="row">
                  <form onSubmit={e => this.handleSubmit(e)} role="form" className="form-horizontal">
                    { this.props.signupState.fails ? <ErrorComponent fails={this.props.signupState.fails} /> : null }
                    <div className="col-lg-6">
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.fullname}
                                 name="fullname" placeholder="Full name"/>
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.email}
                                 type="email" name="email" placeholder="Email"/>
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.mobile}
                                 name="mobile" placeholder="Mobile No. e.g +23480123456789" required='required'/>
                    </div>
                    <div className="col-lg-6">
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.username}
                                 name="username" placeholder="Username"/>
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.password}
                                 type="password" name="password" placeholder="Password"/>
                      <FormField errors={this.props.signupState.errors} onChange={e => this.handleChange(e)} value={this.state.user.confirm_password}
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
                  <p>Designed by Johadi</p>
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
const mapDispatchToProps = dispatch => bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
// { this.props.signupState.error ? <ErrorComponent error={this.props.signupState.error} /> : null }
