import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo, getMessagesOfMessageBoardPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import DashboardPage from '../DashboardPage';

class DashboardAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo();
    this.props.getMessagesOfMessageBoardPagination();
  }
  render() {
    const {groups_user_belongs,message_board_messages_pagination} = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs && message_board_messages_pagination ?
        <DashboardPage messageBoardMessagesPagination={message_board_messages_pagination}
                       groupsUserBelongsTo={groups_user_belongs}
        /> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getGroupsUserBelongsTo,
  getMessagesOfMessageBoardPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthPage);

