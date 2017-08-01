import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroupsUserBelongsTo } from '../../actions/group/groupActions';

class SideBar extends React.Component {
  componentWillMount() {
    this.props.getGroupsUserBelongsTo();
  }
  render() {
    const groupsLength=this.props.userGroups.length;
    return (
        <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <Link className="btn navy-header btn-lg btn-block">Quick Links</Link>
            <Link to="/create-group" className="btn btn-default btn-block">
              <i className="fa fa-lg fa-plus-circle text-display" aria-hidden="true"></i> Create Group
            </Link>
            <Link to="/groups" className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true"></i> All My Groups
            </Link>
          </p>
          <hr/>
          <div className="list-group">
            <Link className="list-group-item active navy-header">
              <h5 className="list-group-item-heading text-center">Your top groups</h5>
            </Link>
          </div>
          <div className="list-group">
            {this.props.userGroups.splice(0, 5).map(userGroup => (
                <Link to={`/group/${userGroup.Group.id}/board`} key={userGroup.Group.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{userGroup.Group.name}</h5>
                </Link>
            ))}
            {
              groupsLength < 6 ? null :
                  <Link to="/group-users" className="list-group-item btn btn-primary">
                    <h5 className="list-group-item-heading"><strong><Link to={'/groups'}>See all you groups</Link></strong></h5>
                  </Link>
            }
          </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupsUserBelongsTo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
