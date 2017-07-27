import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupMessages, clearGetGroupMessagesError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import GroupMessageBoardPage from '../GroupMessageBoardPage';

class GroupMessageBoardAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupMessages(this.props.params.groupId);
  }
  // componentWillUnmount(){
  //   this.props.clearGetGroupMessagesError();
  // }
  render() {
    return this.props.tokenStatus.success && this.props.groupState.group_messages ?
        <GroupMessageBoardPage groupId={this.props.params.groupId}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupMessages, clearGetGroupMessagesError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupMessageBoardAuthPage);

