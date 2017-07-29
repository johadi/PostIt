import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroupUsers } from '../../actions/group/groupActions';


class GroupUsers extends React.Component{
  componentWillMount(){
    this.props.getGroupUsers(this.props.groupId);
  }
  render(){
    return (
        <div className="col-md-12" id="message-board-div">
          <h2 className="text-capitalize">{this.props.name} Group Members</h2>
          <hr/>
          <div className="list-group">
            {this.props.users.map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{user.User.fullname}</h5>
                </Link>
            ))}
          </div>
          <hr/>
          <ul className="pagination">
            <li><a href="#">&laquo;</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&raquo;</a></li>
          </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsers);

