import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, getGroupUsersPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import GroupUsersPage from '../GroupUsersPage';

class GroupUsersAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupUsers(this.props.params.groupId); // for side bar
    this.props.getGroupUsersPagination(this.props.params.groupId, 1); // for group users page
  }
  render() {
    const { group_users, group_users_pagination } = this.props.groupState;
    return this.props.tokenStatus.success && group_users && group_users_pagination ?
        <GroupUsersPage
            groupUsers={group_users} groupUsersPagination={group_users_pagination}
            groupId={this.props.params.groupId}
        /> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupUsers, getGroupUsersPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersAuthPage);

