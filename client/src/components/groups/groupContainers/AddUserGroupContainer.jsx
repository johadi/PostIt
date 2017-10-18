import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import AddUserToGroupPage from '../AddUserToGroupPage.jsx';

/**
 * AddUserGroupContainer class declaration
 */
class AddUserGroupContainer extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore ?
      <AddUserToGroupPage
        groupUsers={groupUsersStore}
        groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
AddUserGroupContainer.propTypes = {
  params: PropTypes.object.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getGroupUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyToken, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserGroupContainer);

