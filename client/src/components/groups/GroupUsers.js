import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getGroupUsers, getGroupUsersPagination } from '../../actions/group/groupActions';


class GroupUsers extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activePage: 1
    };
  }
  componentWillMount(){
    this.props.getGroupUsers(this.props.groupId);
  }
  handleSelect=(eventKey)=>{
    this.setState({activePage: eventKey});
    this.props.getGroupUsersPagination(this.props.groupId, eventKey);
    this.props.getGroupUsers(this.props.groupId); // necessary to keep users side bar state
  }
  render(){
    const {Users, count, pages} = this.props.groupUsersPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2 className="text-capitalize">{this.props.name} Group Members</h2>
          <p className="text-display"><strong>{count} {count===1 ? 'member' : 'members'}</strong></p>
          <hr/>
          <div className="list-group">
            {Users.map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{user.User.fullname}</h5>
                </Link>
            ))}
          </div>
          <hr/>
          {pages <= 1 ? null:
              <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={pages}
                  maxButtons={10}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect}
              />
          }
        </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    groupState: state.groupReducer
  };
}
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupUsers, getGroupUsersPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsers);

