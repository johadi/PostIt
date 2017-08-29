import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AuthHeader from '../headers/AuthHeader.jsx';
import { resetPasswordAction } from '../../actions/auth/passwordAction';
import FormField from './ResetPasswordFormField.jsx';
import ErrorComponent from '../ErrorComponent.jsx';

/**
 * ResetPasswordPage class declaration
 */
class ResetPasswordPage extends React.Component {
  /**
   * class cpnstructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        password: '',
        confirm_password: ''
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
    this.props.resetPasswordAction(this.props.location.query.qrp, this.state.user);
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
              <AuthHeader/>
              <div className="inner cover" style={{ opacity: 0.8, backgroundColor: 'whitesmoke' }}>
                <h2 className="cover-heading text-signup">Reset Password for PostIt</h2>
                <div className="row">
                  <form onSubmit={e => this.handleSubmit(e)} role="form" className="form-horizontal">
                    { this.props.resetState.reset_fails ? <ErrorComponent fails={this.props.resetState.reset_fails} /> : null }
                    { !this.props.resetState.reset_message ? null :
                      <div className="alert alert-success alert-dismissible">
                        { this.props.resetState.reset_message }
                      </div>}
                    <div className="col-lg-offset-2 col-lg-8">
                      <FormField type="password" errors={this.props.resetState.reset_errors} onChange={e => this.handleChange(e)}
                                 value={this.state.user.password} name="password" placeholder="Password"/>
                      <FormField type="password" errors={this.props.resetState.reset_errors} onChange={e => this.handleChange(e)}
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
const mapDispatchToProps = dispatch => bindActionCreators({ resetPasswordAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
