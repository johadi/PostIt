import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo, getMessagesOfMessageBoardPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import DashboardPage from '../DashboardPage.jsx';

/**
 * DashboardAuthPage class declaration
 */
class DashboardAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo();
    this.props.getMessagesOfMessageBoardPagination();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groups_user_belongs, message_board_messages_pagination } = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs && message_board_messages_pagination ?
        <DashboardPage messageBoardMessagesPagination={message_board_messages_pagination}
                       groupsUserBelongsTo={groups_user_belongs}
        /> : <NullPage/>;
  }
}
DashboardAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupsUserBelongsTo: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getMessagesOfMessageBoardPagination: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getGroupsUserBelongsTo,
  getMessagesOfMessageBoardPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthPage);

