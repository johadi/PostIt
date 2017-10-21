import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsers } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupUsers from '../GroupUsers.jsx';
import Page from '../Page.jsx';

/**
 * GroupUsersContainer class declaration
 * @class GroupUsersContainer
 * @extends {React.Component}
 */
class GroupUsersContainer extends React.Component {
  /**
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.params.groupId, 1);
  }

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    const { groupUsersStore } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersStore ?
      <Page groupId={ this.props.params.groupId}>
        <GroupUsers
          groupUsers={groupUsersStore}
          groupId={this.props.params.groupId} />
      </Page> : <NullPage/>;
  }
}
GroupUsersContainer.propTypes = {
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersContainer);

