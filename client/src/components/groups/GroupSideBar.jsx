import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import jwtDecode from 'jwt-decode';

/**
 * GroupSideBar class declaration
 */
class GroupSideBar extends React.Component {
  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const userDetail = jwtDecode(window.sessionStorage.token);
    return (
        <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <Link className="btn btn-block btn-lg navy-header">
              Activities
            </Link>
            <Link to={`/group/${this.props.groupId}/board`}
                  className="btn btn-default btn-block">
              <i className="fa fa-envelope-open text-display" aria-hidden="true">
              </i> Group notifications
            </Link>
            <Link to={`/group/${this.props.groupId}/message`}
                  className="btn btn-default btn-block">
              <i className="fa fa-pencil-square text-display" aria-hidden="true">
              </i> Send notification here
            </Link>
            <Link to={`/group/${this.props.groupId}/add`}
                  className="btn btn-default btn-block">
              <i className="fa fa-user-plus text-display" aria-hidden="true">
              </i> Add User to group
            </Link>
            <Link to={`/group/${this.props.groupId}/users`}
                  className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true">
              </i> Group members
            </Link>
          </p>
          <hr/>
          <div className="list-group profile-items-header">
            <p className="list-group-item profile-header">
              <h5 className="list-group-item-heading text-center profile">
                Your profile
              </h5>
            </p>
          </div>
          <div className="list-group profile-items">
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">
                {userDetail.username}
              </h5>
            </p>
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">
                {userDetail.fullname}
              </h5>
            </p>
            {
              userDetail.mobile ?
                <p className="list-group-item">
                  <h5 className="list-group-item-heading text-center">
                    {userDetail.mobile}
                  </h5>
                </p> : null
            }
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">
                {userDetail.email}
              </h5>
            </p>
          </div>
        </div>
    );
  }
}
GroupSideBar.propTypes = {
  groupId: PropTypes.string.isRequired,
};
export default GroupSideBar;
