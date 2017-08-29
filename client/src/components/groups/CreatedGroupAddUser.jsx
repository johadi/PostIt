import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import { getGroupUsers, getUsersSearch } from '../../actions/group/groupActions';

/**
 * CreateGroupAddUser class declaration
 */
export class CreateGroupAddUser extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsers(this.props.groupId);
  }

  /**
   * handles form submit
   * @return {void} void
   * @param {e} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.getUsersSearch(this.props.groupId, this.search.value);
    this.props.getGroupUsers(this.props.groupId); // to reload the group side bar
  }
  /**
   * handles Search
   * @return {void} void
   * @param {e} e
   */
  handleSearch(e) {
    this.props.getUsersSearch(this.props.groupId, e.target.value);
    this.props.getGroupUsers(this.props.groupId); // to reload the group side bar
  }

  /**
   * render component
   * @return {XML} XML/JSX
   */
  render() {
    const { users_search } = this.props.groupState;
    return (
        <form onSubmit={e => this.handleSubmit(e)} className="form-horizontal" role="form">
          <h3 className="text-center">Add Members to <span className="text-capitalize">{this.props.name}</span> group</h3>
          <div className="row well well-sm">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="input-group">
                <input id="search" name="search" ref={input => this.search = input} onKeyUp={e => this.handleSearch(e)}
                       placeholder="Search Users by Username or Email" type="text" className="form-control"/>
                <span className="input-group-btn">
              <button type="submit" className="btn btn-post"><i className="fa fa-search" aria-hidden="true"></i></button>
            </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped">
                <caption>
                  <h3>Search result appears here</h3>
                  {(this.props.addUserError && <h4 className="text-center text-danger">{this.props.addUserError}</h4>) ||
                  (this.props.addUserSuccess && <h4 className="text-center text-success">User added successfully</h4>)}
                </caption>
                <thead>
                <tr>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Add</th>
                </tr>
                </thead>
                <tbody>
                {
                  !!users_search && users_search.allUsers.map((user) => {
                    if (lodash.includes(users_search.groupUsersId, user.id)) {
                      return (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td><a className="btn btn-success btn-sm btn-block" disabled >Member</a></td>
                          </tr>
                      );
                    }
                    return (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td><a onClick={this.props.onAddUser} id={user.username} className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
                          </tr>
                    );
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </form>
    );
  }
}
CreateGroupAddUser.propTypes = {
  name: PropTypes.string.isRequired,
  onAddUser: PropTypes.func.isRequired,
  addUserError: PropTypes.any,
  addUserSuccess: PropTypes.bool.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  getUsersSearch: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupUsers, getUsersSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupAddUser);

