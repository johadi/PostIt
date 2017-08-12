import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, viewMessage, clearViewMessageError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import MessageViewPage from '../NotificationViewPage';

/**
 * NotificationViewAuthPage class declaration
 */
class NotificationViewAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.viewMessage(this.props.params.groupId, this.props.params.messageId);
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * @return {void} void
   */
  componentWillUnmount() {
    this.props.clearViewMessageError();
  }

  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    const { group_view_message, group_users } = this.props.groupState;
    return this.props.tokenStatus.success && group_view_message && group_users ?
        <MessageViewPage groupId={this.props.params.groupId} groupUsers={group_users} message={group_view_message}/> : <NullPage/>;
  }
}
NotificationViewAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  viewMessage: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  clearViewMessageError: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, viewMessage, clearViewMessageError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewAuthPage);

