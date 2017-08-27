import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsers } from '../../actions/group/groupActions';

/**
 * GroupSideBar class declaration
 */
class GroupSideBar extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.groupId);
  }

  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const usersLength = this.props.users.length;
    return (
        <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <Link className="btn btn-block btn-lg navy-header">Activities</Link>
            <Link to={`/group/${this.props.groupId}/board`} className="btn btn-default btn-block">
              <i className="fa fa-envelope-open text-display" aria-hidden="true"></i> Group notifications
            </Link>
            <Link to={`/group/${this.props.groupId}/message`} className="btn btn-default btn-block">
              <i className="fa fa-pencil-square text-display" aria-hidden="true"></i> Send notification here
            </Link>
            <Link to={`/group/${this.props.groupId}/add`} className="btn btn-default btn-block">
              <i className="fa fa-user-plus text-display" aria-hidden="true"></i> Add User to group
            </Link>
            <Link to={`/group/${this.props.groupId}/users`} className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true"></i> Group members
            </Link>
            <Link to="/dashboard" className="btn btn-default btn-block">
              <span
                className="text-danger"><strong> <i className="fa fa-user-times" aria-hidden="true"></i> Back to Dashboard</strong>
              </span>
            </Link>
          </p>
          <hr/>
          <div className="list-group">
            <Link className="list-group-item active navy-header">
              <h5 className="list-group-item-heading text-center">Group Members</h5>
            </Link>
          </div>
          <div className="list-group">
            {this.props.users.splice(0, 6).map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{user.User.username}</h5>
                </Link>
            ))}
            {usersLength <= 6 ? null :
                <Link to="/group-users" className="list-group-item btn btn-primary">
                  <h5 className="list-group-item-heading"><strong>
                    <Link to={`/group/${this.props.groupId}/users`}>See all members</Link></strong>
                  </h5>
                </Link>
            }
          </div>
        </div>
    );
  }
}
GroupSideBar.propTypes = {
  groupState: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  getGroupUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupSideBar);
