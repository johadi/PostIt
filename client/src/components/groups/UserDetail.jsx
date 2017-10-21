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
      <p className="list-group-item profile-header">
        <h5 className="list-group-item-heading text-center profile">
          Your profile
        </h5>
      </p>
      <p className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {username}
        </h5>
      </p>
      <p className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {fullname}
        </h5>
      </p>
      {
        mobile ?
          <p className="list-group-item">
            <h5 className="list-group-item-heading text-center">
              {mobile}
            </h5>
          </p> : null
      }
      <p className="list-group-item">
        <h5 className="list-group-item-heading text-center">
          {email}
        </h5>
      </p>
    </div>
  );
};
UserDetail.propTypes = {
  userDetail: PropTypes.object.isRequired
};
export default UserDetail;
