import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo, getGroupsUserBelongsToPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupsPage from '../GroupsPage.jsx';

/**
 * GroupsAuthPage class declaration
 */
class GroupsAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo(); // for side bar
    this.props.getGroupsUserBelongsToPagination(1); // for group page
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { groups_user_belongs, groups_user_belongs_pagination } = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs && groups_user_belongs_pagination ? <GroupsPage
        groupsUserBelongsTo={groups_user_belongs}
        groupsUserBelongsToPagination={groups_user_belongs_pagination} /> : <NullPage/>;
  }
}
GroupsAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupsUserBelongsTo: PropTypes.func.isRequired,
  getGroupsUserBelongsToPagination: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getGroupsUserBelongsTo,
  getGroupsUserBelongsToPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsAuthPage);

