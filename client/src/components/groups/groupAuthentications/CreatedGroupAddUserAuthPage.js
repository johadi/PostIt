import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import NullPage from '../NullPage';
import CreatedGroupAddUserPage from '../CreatedGroupAddUserPage';

class CreatedGroupAddUserAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
  }
  render() {
    return this.props.tokenStatus.success ? <CreatedGroupAddUserPage groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatedGroupAddUserAuthPage);

