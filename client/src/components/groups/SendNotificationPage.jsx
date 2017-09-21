import React from 'react';
import PropTypes from 'react-proptypes';
import MainHeader from '../headers/MainHeader.jsx';
import GroupSideBar from './GroupSideBar.jsx';
import SendNotification from './SendNotification.jsx';

/**
 * SendNotificationPage class declaration
 */
export default class SendNotificationPage extends React.Component {
  // we have to pass our groupId params down
  // to SendNotification since we have a lot to do there
  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { name } = this.props.groupUsers;
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12
            col-xs-12 panel panel-default"
                 id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <SendNotification name={name} groupId={this.props.groupId}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={this.props.groupId}/>
          </div>
        </div>
    );
  }
}
SendNotificationPage.propTypes = {
  groupUsers: PropTypes.object.isRequired,
  groupId: PropTypes.string
};

