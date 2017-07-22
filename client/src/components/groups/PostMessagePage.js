import React from 'react';
import { Link } from 'react-router';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import SideBar from './SideBar';
import PostMessage from './PostMessage';
import groupBackGround from '../../utils/groupPagesBackground';

export default class PostMessagePage extends React.Component {
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
                  <PostMessage/>
                </div>
              </div>
            </div>
            <SideBar/>
          </div>
        </div>
    );
  }
}

