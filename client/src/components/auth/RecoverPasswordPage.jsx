import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { recoverPasswordAction } from '../../actions/auth/passwordAction';
import FormField from './FormField';
import ErrorComponent from '../ErrorComponent';
import { IndexHeader } from '../headers';
import { IndexFooter } from '../footers';

/**
 * RecoverPasswordPage class declaration
 * @class RecoverPasswordPage
 * @extends {React.Component}
 */
export class RecoverPasswordPage extends React.Component {
  /**
   * Class constructor
   * @param {object} props
   * @memberOf RecoverPasswordPage
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
   * Handles submit
   * @method handleSubmit
   * @param {object} event - event
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.recoverPasswordAction(this.state.user);
  }
  /**
   * Handles change
   * @method handleChange
   * @param {object} event - event
   * @return {void}
   */
  handleChange(event) {
    const user = this.state.user;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }
  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <IndexHeader/>
              <div className="inner cover col-sm-offset-1 col-sm-10 cover-div">
                <h2 className="cover-heading text-signup">Recover Password for PostIt</h2>
                <div className="row">
                  <form onSubmit={event => this.handleSubmit(event)}
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
                      <FormField
                        type="email"
                        errors={this.props.recoveryState.errors}
                        onChange={event => this.handleChange(event)}
                        value={this.state.user.email}
                        name="email"
                        placeholder="Enter email you used for registration"
                        auth="any"
                      />
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
              <IndexFooter/>
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
