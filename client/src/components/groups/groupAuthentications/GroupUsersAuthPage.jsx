import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, getGroupUsersPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupUsersPage from '../GroupUsersPage.jsx';

/**
 * GroupUsersAuthPage class declaration
 */
class GroupUsersAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupUsers(this.props.params.groupId); // for side bar
    this.props.getGroupUsersPagination(this.props.params.groupId, 1); // for group users page
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { group_users, group_users_pagination } = this.props.groupState;
    return this.props.tokenStatus.success && group_users && group_users_pagination ?
        <GroupUsersPage
            groupUsers={group_users} groupUsersPagination={group_users_pagination}
            groupId={this.props.params.groupId}
        /> : <NullPage/>;
  }
}
GroupUsersAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  getGroupUsersPagination: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupUsers, getGroupUsersPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersAuthPage);

