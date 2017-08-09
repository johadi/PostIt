import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import { updateMessageReadAfterView } from '../../actions/group/groupActions';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import Notification from './Notification';
import groupBackGround from '../../utils/groupPagesBackground';

class NotificationViewPage extends React.Component {
  constructor(props){
    super(props);
    this.userDetail=jwtDecode(window.sessionStorage.token);
  }
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
    if (!_.includes(this.props.message.readersId, this.userDetail.id)) {
      this.props.updateMessageReadAfterView(this.props.message.id);
    }
  }
  render() {
    const { name, Users } = this.props.groupUsers;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <Notification name={name} message={this.props.message}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ updateMessageReadAfterView }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewPage);
