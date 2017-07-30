import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getGroupsUserBelongsTo, getGroupsUserBelongsToPagination } from '../../actions/group/groupActions';

class Groups extends React.Component {
  constructor(props){
    super(props);
    this.state={
      activePage: 1
    };
  }
  componentWillMount() {
    this.props.getGroupsUserBelongsTo();
    // this.props.getGroupsUserBelongsToPagination(1);
  }
  handleSelect=(eventKey)=>{
    this.setState({activePage: eventKey});
    this.props.getGroupsUserBelongsToPagination(eventKey);
    this.props.getGroupsUserBelongsTo(); // necessary to keep side bar state else it will vanish
  }
  render(){
    const {pages, count, Groups} = this.props.groupsUserBelongsToPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2>Your Groups</h2>
          <p className="text-display"><strong>Total groups you joined: {count}</strong></p>
          <hr/>
          <div className="list-group">
            {Groups.map(userGroup => (
                <Link to={`/group/${userGroup.Group.id}/board`} key={userGroup.Group.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{userGroup.Group.name}</h5>
                </Link>
            ))}
          </div>
          <hr/>
          {count <= 0 ? null:
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
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupsUserBelongsTo, getGroupsUserBelongsToPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Groups);

