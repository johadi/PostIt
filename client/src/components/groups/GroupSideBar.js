import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroupUsers } from '../../actions/group/groupActions';

class GroupSideBar extends React.Component{
  componentWillMount(){
    this.props.getGroupUsers(this.props.groupId);
  }
  render(){
    return (
        <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <Link className="btn btn-block btn-lg navy-header">Activities</Link>
            <Link to={`/group/${this.props.groupId}/board`} className="btn btn-default btn-block">Group Messages</Link>
            <Link to={`/group/${this.props.groupId}/message`} className="btn btn-default btn-block">Post Message here</Link>
            <Link to={`/group/${this.props.groupId}/add`} className="btn btn-default btn-block">Add User to Group</Link>
            <Link to={`/group/${this.props.groupId}/users`} className="btn btn-default btn-block">Group Members</Link>
            <Link to="/dashboard" className="btn btn-default btn-block"><span
                className="text-danger"><strong>Leave Group</strong></span></Link>
          </p>
          <hr/>
          <div className="list-group">
            <Link className="list-group-item active navy-header">
              <h5 className="list-group-item-heading text-center">Group Members</h5>
            </Link>
          </div>
          <div className="list-group">
            {this.props.users.splice(0,5).map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{user.User.fullname}</h5>
                </Link>
            ))}
            <Link to="/group-users" className="list-group-item btn btn-primary">
              <h5 className="list-group-item-heading"><strong><Link to={`/group/${this.props.groupId}/users`}>See all members</Link></strong></h5>
            </Link>
          </div>
        </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    groupState: state.groupReducer
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupSideBar);
