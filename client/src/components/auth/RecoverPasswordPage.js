import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import {recoverPasswordAction} from '../../actions/auth/passwordAction';
import FormField from './RecoverPasswordFormField';
import ErrorComponent from '../ErrorComponent';

class RecoverPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
      }
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.recoverPasswordAction(this.state.user);
  }
  handleChange = (e) => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({user});
  }
  render() {
    return (
      <div className="body">
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <AuthHeader/>
              <div className="inner cover col-sm-offset-1 col-sm-10" style={{opacity: 0.8, backgroundColor: 'whitesmoke'}}>
                <h2 className="cover-heading text-signup">Recover Password for PostIt</h2>
                <div className="row">
                  <form onSubmit={this.handleSubmit} role="form" className="form-horizontal">
                    { this.props.recoveryState.fails ? <ErrorComponent fails={this.props.recoveryState.fails} /> : null }
                    { !this.props.recoveryState.message ? null :
                      <div className="alert alert-success alert-dismissible">
                        { this.props.recoveryState.message }
                      </div>}
                    <div className="col-lg-offset-2 col-lg-8">
                      <FormField type="email" errors={this.props.recoveryState.errors} onChange={this.handleChange}
                                 value={this.state.user.email} name="email" placeholder="Enter email you used for registration"/>
                    </div>
                    <div className="col-lg-offset-2 col-lg-8">
                      <div className="form-group lead">
                        <div className="col-lg-12">
                          <button type="submit" className="btn btn-danger btn-block">Send password recovery link</button>
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
const mapStateToProps = (state) => {
  return {
    recoveryState: state.passwordReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({recoverPasswordAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPasswordPage);
// { this.props.signupState.error ? <ErrorComponent error={this.props.signupState.error} /> : null }
