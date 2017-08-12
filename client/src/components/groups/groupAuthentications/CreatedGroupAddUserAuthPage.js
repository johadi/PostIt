import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import CreatedGroupAddUserPage from '../CreatedGroupAddUserPage';

/**
 * CreatedGroupAddUserAuthPage class declaration
 */
class CreatedGroupAddUserAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupUsers(this.props.params.groupId);
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { group_users } = this.props.groupState;
    return this.props.tokenStatus.success && group_users ?
        <CreatedGroupAddUserPage groupUsers={group_users} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
CreatedGroupAddUserAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getGroupUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatedGroupAddUserAuthPage);

