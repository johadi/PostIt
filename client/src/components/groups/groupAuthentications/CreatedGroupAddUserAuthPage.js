import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupUsers } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import CreatedGroupAddUserPage from '../CreatedGroupAddUserPage';

class CreatedGroupAddUserAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupUsers(this.props.params.groupId);
  }
  render() {
    const {group_users} = this.props.groupState;
    return this.props.tokenStatus.success && group_users ?
        <CreatedGroupAddUserPage groupUsers={group_users} groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatedGroupAddUserAuthPage);

