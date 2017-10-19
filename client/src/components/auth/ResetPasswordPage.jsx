import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import IndexHeader from '../headers/IndexHeader.jsx';
import { resetPasswordAction } from '../../actions/auth/passwordAction';
import ResetPasswordFormField from './ResetPasswordFormField.jsx';
import ErrorComponent from '../ErrorComponent.jsx';

/**
 * ResetPasswordPage class declaration
 */
class ResetPasswordPage extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        confirmPassword: ''
      }
    };
  }
  /**
   * handles submit
   * @param {object} e
   * @return {void} void
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.resetPasswordAction(this.props.location.query.token,
      this.state.user);
  }
  /**
   * handles change
   * @param {object} e
   * @return {void} void
   */
  handleChange(e) {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  }
  /**
   * renders component
   * @param {object} e
   * @return {void} void
   */
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <IndexHeader/>
              <div className="inner cover cover-div">
                <h2 className="cover-heading text-signup">Reset Password for PostIt</h2>
                <div className="row">
                  <form onSubmit={e => this.handleSubmit(e)}
                        role="form" className="form-horizontal">
                    { this.props.resetState.resetFails ?
                      <ErrorComponent fails={this.props.resetState.resetFails} /> : null
                    }
                    { !this.props.resetState.resetMessage ? null :
                      <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close"
                                data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">x</span>
                        </button>
                        { this.props.resetState.resetMessage }
                      </div>}
                    <div className="col-lg-offset-2 col-lg-8">
                      <ResetPasswordFormField type="password"
                                 errors={this.props.resetState.resetErrors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.password}
                                 name="password"
                                 placeholder="Password"/>
                      <ResetPasswordFormField type="password"
                                 errors={this.props.resetState.resetErrors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.confirmPassword}
                                 name="confirmPassword"
                                 placeholder="Confirm password"/>
                    </div>
                    <div className="col-lg-offset-2 col-lg-8">
                      <div className="form-group lead">
                        <div className="col-lg-12">
                          <button type="submit" className="btn btn-danger btn-block">
                            Reset my password
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
ResetPasswordPage.propTypes = {
  resetPasswordAction: PropTypes.func.isRequired,
  resetState: PropTypes.object.isRequired,
  location: PropTypes.object
};
const mapStateToProps = state => ({
  resetState: state.passwordReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetPasswordAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
