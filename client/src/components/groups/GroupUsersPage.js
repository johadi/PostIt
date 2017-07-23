import React from 'react';
import { Link } from 'react-router';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import GroupUsers from './GroupUsers';
import groupBackGround from '../../utils/groupPagesBackground';

export default class GroupUsersPage extends React.Component {
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }
  render() {
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <GroupUsers/>
                </div>
              </div>
            </div>
            <GroupSideBar/>
          </div>
        </div>
    );
  }
}
