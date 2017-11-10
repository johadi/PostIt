import React from 'react';
import PropTypes from 'react-proptypes';

/**
 * User's detail component
 * @function UserDetail
 * @param {object} userDetail
 * @return {XML} JSX
 */
const UserDetail = ({ userDetail }) => {
  const { username, fullname, mobile, email } = userDetail;
  return (
    <div className="list-group profile-items">
      <div className="list-group-item profile-header">
        <h5 className="list-group-item-heading text-center profile">
          Your profile
        </h5>
      </div>
      <div className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {username}
        </h5>
      </div>
      <div className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {fullname}
        </h5>
      </div>
      {
        mobile ?
          <div className="list-group-item">
            <h5 className="list-group-item-heading text-center">
              {mobile}
            </h5>
          </div> : null
      }
      <div className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {email}
        </h5>
      </div>
    </div>
  );
};
UserDetail.propTypes = {
  userDetail: PropTypes.object.isRequired
};
export default UserDetail;
