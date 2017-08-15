import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import AuthHeader from '../headers/AuthHeader';
import {signupAction} from '../../actions/auth/signupAction';
import FormField from './SignUpFormField';
import ErrorComponent from '../ErrorComponent';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: ''
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
    this.props.signupAction(this.state.user);
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
            <h2 className="cover-heading text-signup">Recover Password for PostIt</h2>
            <div className="row">
              <form onSubmit={this.handleSubmit} role="form" className="form-horizontal">
                { this.props.signupState.fails ? <ErrorComponent fails={this.props.signupState.fails} /> : null }
                <div className="col-lg-offset-2 col-lg-8">
                  <FormField type="email" errors={this.props.signupState.errors} onChange={this.handleChange}
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signupState: state.signupReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({signupAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
// { this.props.signupState.error ? <ErrorComponent error={this.props.signupState.error} /> : null }
