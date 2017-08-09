import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers,viewMessage, clearViewMessageError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import MessageViewPage from '../NotificationViewPage';

class NotificationViewAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.viewMessage(this.props.params.groupId, this.props.params.messageId);
    this.props.getGroupUsers(this.props.params.groupId);
  }
  componentWillUnmount(){
    this.props.clearViewMessageError();
  }
  render() {
    const {group_view_message, group_users} = this.props.groupState;
    return this.props.tokenStatus.success && group_view_message && group_users ?
        <MessageViewPage groupId={this.props.params.groupId} groupUsers={group_users} message={group_view_message}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, viewMessage, clearViewMessageError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewAuthPage);

