import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import {
  getGroupUsers,
  viewMessage,
  clearViewMessageError } from '../../../actions/group/groupActions';
import NullComponent from '../NullComponent';
import Page from '../Page';
import Notification from '../Notification';

/**
 * NotificationViewContainer class declaration
 * @class NotificationViewContainer
 * @extends {React.Component}
 */
class NotificationViewContainer extends React.Component {
  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.viewMessage(this.props.params.groupId,
      this.props.params.messageId);
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * @method componentWillUnmount
   * @return {void} void
   */
  componentWillUnmount() {
    this.props.clearViewMessageError();
  }

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    const { groupViewMessage, groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupViewMessage && groupUsersStore ?
      <Page groupId={this.props.params.groupId}>
        <Notification name={groupUsersStore.name} message={groupViewMessage}/>
      </Page> : <NullComponent/>;
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

