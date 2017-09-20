import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'react-proptypes';
import MainHeader from '../headers/MainHeader.jsx';
import GroupSideBar from './GroupSideBar.jsx';
import GroupUsers from './GroupUsers.jsx';

/**
 * GroupUsersPage class declaration
 */
export default class GroupUsersPage extends React.Component {
  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7
            col-sm-12 col-xs-12 panel panel-default"
                 id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <GroupUsers
                    groupUsersPagination={this.props.groupUsersPagination}
                    groupId={this.props.groupId}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={ this.props.groupId}/>
          </div>
        </div>
    );
  }
}
GroupUsersPage.propTypes = {
  groupUsersPagination: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired
};
