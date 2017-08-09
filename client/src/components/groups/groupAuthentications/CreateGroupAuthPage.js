import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import CreateGroupPage from '../CreateGroupPage';

class CreateGroupAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo();
  }
  render() {
    const {groups_user_belongs} = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs ? <CreateGroupPage
        groupsUserBelongsTo={groups_user_belongs}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupsUserBelongsTo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupAuthPage);

