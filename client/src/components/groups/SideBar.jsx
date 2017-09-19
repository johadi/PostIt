import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { getUserGroups } from '../../actions/group/groupActions';

/**
 * SideBar class declaration
 */
class SideBar extends React.Component {
  /**
   * renders the component
   * @return {XML} JSX
   */
  render() {
    const userDetail = jwtDecode(window.sessionStorage.token);
    return (
        <div className="main side-bar col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <p className="btn navy-header btn-lg btn-block">Quick Links</p>
            <Link to="/create-group" className="btn btn-default btn-block">
              <i className="fa fa-lg fa-plus-circle text-display"
                 aria-hidden="true"></i> Create Group
            </Link>
            <Link to="/groups" className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true"></i> All My Groups
            </Link>
          </p>
          <hr/>
          <div className="list-group profile-items-header">
            <p className="list-group-item profile-header">
              <h5 className="list-group-item-heading text-center profile">Your profile</h5>
            </p>
          </div>
          <div className="list-group profile-items">
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">{userDetail.username}</h5>
            </p>
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">{userDetail.fullname}</h5>
            </p>
            {
              userDetail.mobile ?
                <p className="list-group-item">
                  <h5 className="list-group-item-heading text-center">{userDetail.mobile}</h5>
                </p> : null
            }
            <p className="list-group-item">
              <h5 className="list-group-item-heading text-center">{userDetail.email}</h5>
            </p>
          </div>
        </div>
    );
  }
}
export default SideBar;
