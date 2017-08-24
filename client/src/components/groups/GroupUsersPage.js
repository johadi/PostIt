import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import GroupUsers from './GroupUsers';

/**
 * GroupUsersPage class declaration
 */
export default class GroupUsersPage extends React.Component {
  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    const { name, Users } = this.props.groupUsers;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <GroupUsers groupUsersPagination={this.props.groupUsersPagination} name={name} users={Users} groupId={this.props.groupId}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={ this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}
GroupUsersPage.propTypes = {
  groupUsers: PropTypes.object.isRequired,
  groupUsersPagination: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired
};
