import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsers } from '../../../actions/group/groupActions';
import Page from '../Page.jsx';

import NullComponent from '../NullComponent.jsx';
import SendNotification from '../SendNotification.jsx';

/**
 * SendNotificationContainer class declaration
 * @class SendNotificationContainer
 * @extends {React.Component}
 */
class SendNotificationContainer extends React.Component {
  /**
   * @method componentWillMount
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore ?
      <Page groupId={this.props.params.groupId}>
        <SendNotification
          name={groupUsersStore.name}
          groupId={this.props.params.groupId}
        />
      </Page> : <NullComponent/>;
  }
}
SendNotificationContainer.propTypes = {
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SendNotificationContainer);

