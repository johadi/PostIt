import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers, getGroupUsersPaginated } from '../../../actions/group/groupActions';
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
    this.props.getGroupUsers(this.props.params.groupId); // for side bar
    this.props.getGroupUsersPaginated(this.props.params.groupId, 1); // for group users page
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { groupUsersStore, groupUsersPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore && groupUsersPaginated ?
        <GroupUsersPage
            groupUsers={groupUsersStore} groupUsersPagination={groupUsersPaginated}
            groupId={this.props.params.groupId}
        /> : <NullPage/>;
  }
}
GroupUsersAuthPage.propTypes = {
  getGroupUsers: PropTypes.func.isRequired,
  getGroupUsersPaginated: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken, getGroupUsers, getGroupUsersPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersAuthPage);

