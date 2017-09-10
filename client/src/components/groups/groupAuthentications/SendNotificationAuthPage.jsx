import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers } from '../../../actions/group/groupActions';

import NullPage from '../NullPage.jsx';
import SendNotificationPage from '../SendNotificationPage.jsx';

/**
 * SendNotificationAuthPage class declaration
 */
class SendNotificationAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * renders the component
   * @return {XML} XML
   */
  render() {
    const { groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore ? <SendNotificationPage
        groupUsers={groupUsersStore} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
SendNotificationAuthPage.propTypes = {
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
  bindActionCreators({ verifyToken, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SendNotificationAuthPage);

