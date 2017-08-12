import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, getGroupMessages, clearGetGroupMessagesError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import GroupNotificationBoard from '../GroupNotificationBoardPage';

/**
 * GroupNotificationBoardAuthPage class declaration
 */
class GroupNotificationBoardAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupMessages(this.props.params.groupId);
    this.props.getGroupUsers(this.props.params.groupId);
  }
  // componentWillUnmount(){
  //   this.props.clearGetGroupMessagesError();
  // }
  /**
   * renders the component
   * @return {XML} XML
   */
  render() {
    const { group_users, group_messages } = this.props.groupState;
    return this.props.tokenStatus.success && group_messages && group_users ?
        <GroupNotificationBoard groupUsers={group_users} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
GroupNotificationBoardAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupMessages: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupMessages, clearGetGroupMessagesError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupNotificationBoardAuthPage);

