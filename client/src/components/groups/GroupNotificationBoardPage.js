import React from 'react';
import PropTypes from 'react-proptypes';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import GroupNotificationBoard from './GroupNotificationBoard';
import groupBackGround from '../../utils/groupPagesBackground';

/**
 * GroupMessageBoardPage class declaration
 */
export default class GroupMessageBoardPage extends React.Component {
  /**
   * @return {void} void
   */
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }

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
                  <GroupNotificationBoard name={name} groupId={this.props.groupId}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}
GroupMessageBoardPage.propTypes = {
  groupUsers: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired
};

