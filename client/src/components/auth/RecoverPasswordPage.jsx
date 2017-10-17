import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import IndexHeader from '../headers/IndexHeader.jsx';
import { recoverPasswordAction } from '../../actions/auth/passwordAction';
import FormField from './RecoverPasswordFormField.jsx';
import ErrorComponent from '../ErrorComponent.jsx';

/**
 * RecoverPasswordPage class declaration
 */
class RecoverPasswordPage extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
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
    this.props.recoverPasswordAction(this.state.user);
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
              <div className="inner cover col-sm-offset-1 col-sm-10" style={{ opacity: 0.8,
                backgroundColor: 'whitesmoke' }}>
                <h2 className="cover-heading text-signup">Recover Password for PostIt</h2>
                <div className="row">
                  <form onSubmit={e => this.handleSubmit(e)}
                        role="form" className="form-horizontal">
                    { this.props.recoveryState.fails ?
                      <ErrorComponent fails={this.props.recoveryState.fails} /> : null }
                    { !this.props.recoveryState.message ? null :
                      <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close"
                                data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">x</span>
                        </button>
                        { this.props.recoveryState.message }
                      </div>}
                    <div className="col-lg-offset-2 col-lg-8">
                      <FormField type="email" errors={this.props.recoveryState.errors}
                                 onChange={e => this.handleChange(e)}
                                 value={this.state.user.email} name="email"
                                 placeholder="Enter email you used for registration"/>
                    </div>
                    <div className="col-lg-offset-2 col-lg-8">
                      <div className="form-group lead">
                        <div className="col-lg-12">
                          <button type="submit" className="btn btn-danger btn-block">
                            Send password recovery link
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
RecoverPasswordPage.propTypes = {
  recoverPasswordAction: PropTypes.func.isRequired,
  recoveryState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  recoveryState: state.passwordReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ recoverPasswordAction },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordPage);
