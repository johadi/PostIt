import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { viewMessage, clearViewMessageError } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import MessageViewPage from '../MessageViewPage';

class MessageViewAuthPage extends React.Component {
  componentWillMount() {
    this.props.verifyToken();
    this.props.viewMessage(this.props.params.groupId, this.props.params.messageId);
  }
  componentWillUnmount(){
    this.props.clearViewMessageError();
  }
  render() {
    return this.props.tokenStatus.success && this.props.groupState.group_view_message ?
        <MessageViewPage message={this.props.groupState.group_view_message}/> : <NullPage/>;
  }
}
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, viewMessage, clearViewMessageError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageViewAuthPage);

