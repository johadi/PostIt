import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers } from '../../../actions/group/groupActions';

import NullPage from '../NullPage';
import SendNotificationPage from '../SendNotificationPage';

/**
 * SendNotificationAuthPage class declaration
 */
class SendNotificationAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * renders the component
   * @return {XML} XML
   */
  render() {
    const { group_users } = this.props.groupState;
    return this.props.tokenStatus.success && group_users ? <SendNotificationPage
        groupUsers={group_users} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
SendNotificationAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SendNotificationAuthPage);

