// import React from 'react';
// import { browserHistory } from 'react-router';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { verifyToken } from '../../../actions/verifyTokenAction';
// import { getGroupsUserBelongsTo } from '../../../actions/group/groupActions';
// import NullPage from '../NullPage';
// import GroupsPage from '../GroupsPage';
//
// class GroupsAuthPage extends React.Component {
//   componentWillMount() {
//     this.props.verifyToken();
//     this.props.getGroupsUserBelongsTo();
//   }
//   render() {
//     const {groups_user_belongs} = this.props.groupState;
//     return this.props.tokenStatus.success && groups_user_belongs ? <GroupsPage groupsUserBelongsTo={groups_user_belongs}/> : <NullPage/>;
//   }
// }
// const mapStateToProps = state => ({
//   tokenStatus: state.verifyTokenReducer,
//   groupState: state.groupReducer
// });
// const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupsUserBelongsTo }, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(GroupsAuthPage);

import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo, getGroupsUserBelongsToPagination } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import GroupsPage from '../GroupsPage';

class GroupsAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo(); // for side bar
    this.props.getGroupsUserBelongsToPagination(1); // for group page
  }
  render() {
    const {groups_user_belongs, groups_user_belongs_pagination} = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs && groups_user_belongs_pagination ? <GroupsPage
        groupsUserBelongsTo={groups_user_belongs}
        groupsUserBelongsToPagination={groups_user_belongs_pagination} /> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getGroupsUserBelongsTo,
  getGroupsUserBelongsToPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsAuthPage);

