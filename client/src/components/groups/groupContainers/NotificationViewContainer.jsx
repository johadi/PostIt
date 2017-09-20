import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsers, viewMessage, clearViewMessageError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import MessageViewPage from '../NotificationViewPage.jsx';

/**
 * NotificationViewContainer class declaration
 */
class NotificationViewContainer extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.viewMessage(this.props.params.groupId,
      this.props.params.messageId);
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
    const { groupViewMessage, groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupViewMessage && groupUsersStore ?
        <MessageViewPage
          groupId={this.props.params.groupId}
          groupUser={groupUsersStore}
          message={groupViewMessage}/> : <NullPage/>;
  }
}
NotificationViewContainer.propTypes = {
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
const mapDispatchToProps = dispatch => bindActionCreators({
  viewMessage, clearViewMessageError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewContainer);

