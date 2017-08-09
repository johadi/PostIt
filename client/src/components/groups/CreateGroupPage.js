import React from 'react';
import { Link } from 'react-router';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import SideBar from './SideBar';
import CreateGroup from './CreateGroup';
import groupBackGround from '../../utils/groupPagesBackground';

export default class CreateGroupPage extends React.Component {
  componentDidMount() {
    groupBackGround();
  }
  render() {
    const { Groups } = this.props.groupsUserBelongsTo;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <CreateGroup/>
                </div>
              </div>
            </div>
            <SideBar userGroups={Groups}/>
          </div>
        </div>
    );
  }
}

