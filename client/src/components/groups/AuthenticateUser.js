import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../actions/verifyTokenAction';
import NullPage from './NullPage';

class AuthenticateUser extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
  }
  render() {
    console.log('AFTER MOUNT');
    console.log(this.props.tokenStatus);
    return this.props.tokenStatus.success ? this.props.children : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateUser);

