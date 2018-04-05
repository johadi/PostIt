import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroupUsers,
  addUserToGroup,
  clearAddUserError } from '../../../actions/group/groupActions';
import NullComponent from '../NullComponent';
import AddUserToGroup from '../AddUserToGroup';
import Page from '../Page';

/**
 * AddUserGroupContainer class declaration
 * @class AddUserGroupContainer
 * @extends {React.Component}
 */
class AddUserGroupContainer extends React.Component {
  /**
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.params.groupId);
    this.props.clearAddUserError();
  }

  /**
   * Handles addUser
   * @param {object} event - event
   * @return {void}
   */
  handleAddUser(event) {
    event.preventDefault();
    const username = event.target.id;
    const groupId = this.props.params.groupId;
    this.props.addUserToGroup(groupId, username);
  }
  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore ?
    <Page groupId={this.props.params.groupId}>
      <AddUserToGroup
        onAddUser={event => this.handleAddUser(event)}
        addUserError={this.props.groupState.addUserErr}
        addUserSuccess={this.props.groupState.addUserSuccess}
        name={groupUsersStore.name}
        groupId={this.props.params.groupId}
      />
    </Page> : <NullComponent/>;
  }
}
AddUserGroupContainer.propTypes = {
  params: PropTypes.object.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  clearAddUserError: PropTypes.func.isRequired,
  addUserToGroup: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getGroupUsers,
    addUserToGroup,
    clearAddUserError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserGroupContainer);

