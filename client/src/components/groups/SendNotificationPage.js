import React from 'react';
import { Link } from 'react-router';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import SendNotification from './SendNotification';
import groupBackGround from '../../utils/groupPagesBackground';

export default class SendNotificationPage extends React.Component {
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }
  // we have to pass our groupId params down to PostMessage since we have a lot to do there
  render() {
    const {id, name, Users}=this.props.groupUsers;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <SendNotification name={name} groupId={this.props.groupId}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}

