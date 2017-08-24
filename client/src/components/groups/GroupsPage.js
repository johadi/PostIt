import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import GroupHeader from '../headers/GroupHeader';
import SideBar from './SideBar';
import AllGroups from './Groups';

/**
 * GroupsPage class declaration
 */
export default class GroupsPage extends React.Component {
  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const { Groups } = this.props.groupsUserBelongsTo;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <AllGroups groupsUserBelongsToPagination={this.props.groupsUserBelongsToPagination}/>
                </div>
              </div>
            </div>
            <SideBar userGroups={Groups}/>
          </div>
        </div>
    );
  }
}
GroupsPage.propTypes = {
  groupsUserBelongsTo: PropTypes.object.isRequired,
  groupsUserBelongsToPagination: PropTypes.object.isRequired
};

