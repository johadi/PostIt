import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, getGroupMessages, clearGetGroupMessagesError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import GroupNotificationBoard from '../GroupNotificationBoardPage';

class GroupNotificationBoardAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupMessages(this.props.params.groupId);
    this.props.getGroupUsers(this.props.params.groupId);
  }
  // componentWillUnmount(){
  //   this.props.clearGetGroupMessagesError();
  // }
  render() {
    const {group_users, group_messages} = this.props.groupState;
    return this.props.tokenStatus.success && group_messages && group_users ?
        <GroupNotificationBoard groupUsers={group_users} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupMessages, clearGetGroupMessagesError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupNotificationBoardAuthPage);

