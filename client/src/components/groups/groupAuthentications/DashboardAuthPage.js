import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import NullPage from '../NullPage';
import DashboardPage from '../DashboardPage';

class DashboardAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
  }
  render() {
    return this.props.tokenStatus.success ? <DashboardPage/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthPage);

