import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import signinAction from '../../actions/auth/signinAction';
import FormField from './FormField.jsx';
import ErrorComponent from '../ErrorComponent.jsx';
import { IndexHeader } from '../headers';
import { IndexFooter } from '../footers';

/**
 * SigninPage class declaration
 * @class SigninPage
 * @extends {React.Component}
 */
export class SigninPage extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf SigninPage
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
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    if (window.sessionStorage.token) {
      browserHistory.push('/dashboard');
    }
  }
  /**
   * Handle submit
   * @method handleSubmit
   * @param {object} e - event
   * @return {void} void
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.signinAction(this.state.credentials);
  }
  /**
   * Handle change
   * @method handleChange
   * @param {e} e - event
   * @return {void} void
   */
  handleChange(e) {
    const credentials = this.state.credentials;
    credentials[e.target.name] = e.target.value;
    this.setState({ credentials });
  }
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <IndexHeader/>
              <div className="inner cover">
                <h2 className="cover-heading">
                  <strong>Login to PostIt,</strong>
                </h2>
                <p className="lead">
                  Share your moment with colleagues and friends.
                </p>
                <form onSubmit={e => this.handleSubmit(e)}
                      className="form-horizontal" role="form">
                  { this.props.signinState.fails ?
                    <ErrorComponent
                      show={true}
                      fails={this.props.signinState.fails}
                    /> : null
                  }
                  <FormField errors={this.props.signinState.errors}
                             onChange={e => this.handleChange(e)}
                             value={this.state.credentials.username}
                             name="username"
                             placeholder="Username"
                             auth="signin"
                  />
                  <FormField type="password"
                             errors={this.props.signinState.errors}
                             onChange={e => this.handleChange(e)}
                             value={this.state.credentials.password}
                             name="password"
                             placeholder="Password"
                             auth="signin"
                  />
                  <div className="form-group lead">
                    <div className="col-lg-offset-2
                    col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                      <button id="signin" type="submit"
                              className="btn btn-lg btn-success btn-block">Login now
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-lg-offset-2
                    col-lg-8 col-md-offset-1 col-md-10 col-sm-offset-2 col-sm-8">
                    <span className="pull-left">
                      No Account yet ?
                      <Link className="text-underline text-signin" to="/signup">
                        <strong> Sign up</strong>
                      </Link>
                    </span>
                      <span className="pull-right">
                      Forget Password ?
                      <Link className="text-underline text-signin" to="/recover-password">
                        <strong> Click</strong></Link>
                    </span>
                    </div>
                  </div>
                </form>
              </div>
              <IndexFooter/>
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
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signinAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
