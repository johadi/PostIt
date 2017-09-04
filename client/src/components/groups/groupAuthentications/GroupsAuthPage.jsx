import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getUserGroups, getUserGroupsPaginated } from '../../../actions/group/groupActions';
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
    this.props.getUserGroups(); // for side bar
    this.props.getUserGroupsPaginated(1); // for group page
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { groupsUserBelongs, userGroupsPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && groupsUserBelongs && userGroupsPaginated ? <GroupsPage
        groupsUserBelongsTo={groupsUserBelongs}
        groupsUserBelongsToPagination={userGroupsPaginated} /> : <NullPage/>;
  }
}
GroupsAuthPage.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  getUserGroupsPaginated: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getUserGroups,
  getUserGroupsPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsAuthPage);

