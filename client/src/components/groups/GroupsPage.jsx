import React from 'react';
import PropTypes from 'react-proptypes';
import MainHeader from '../headers/MainHeader.jsx';
import SideBar from './SideBar.jsx';
import AllGroups from './AllGroups.jsx';

/**
 * GroupsPage class declaration
 */
export default class GroupsPage extends React.Component {
  /**
   * renders the component
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
                  <AllGroups
                    userGroupsPagination={this.props.userGroupsPagination}/>
                </div>
              </div>
            </div>
            <SideBar/>
          </div>
        </div>
    );
  }
}
GroupsPage.propTypes = {
  userGroupsPagination: PropTypes.object.isRequired
};

