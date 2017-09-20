import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import MainHeader from '../headers/MainHeader.jsx';
import SideBar from './SideBar.jsx';
import CreateGroup from './CreateGroup.jsx';

/**
 * CreateGroupPage class declaration
 */
export default class CreateGroupPage extends React.Component {
  /**
   * renders this component
   * @return {XML} XML
   */
  render() {
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div
              className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default"
              id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <CreateGroup/>
                </div>
              </div>
            </div>
            <SideBar/>
          </div>
        </div>
    );
  }
}

