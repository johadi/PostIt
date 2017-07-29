import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroupsUserBelongsTo } from '../../actions/group/groupActions';

class Groups extends React.Component {
  componentWillMount() {
    this.props.getGroupsUserBelongsTo();
  }
  render(){
    return (
        <div className="col-md-12" id="message-board-div">
          <h2>All Your Groups</h2>
          <hr/>
          <div className="list-group">
            {this.props.userGroups.map(userGroup => (
                <Link to={`/group/${userGroup.Group.id}/board`} key={userGroup.Group.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{userGroup.Group.name}</h5>
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
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupsUserBelongsTo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Groups);

