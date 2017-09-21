import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import { getUsersSearch } from '../../actions/group/groupActions';

/**
 * AddUserToGroup class declaration
 */
export class AddUserToGroup extends React.Component {
  /**
   * handles form submit
   * @return {void} void
   * @param {e} e
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.getUsersSearch(this.props.groupId, this.search.value);
  }
  /**
   * handles user click
   * @return {void} void
   * @param {e} e
   */
  handleAddUser(e) {
    this.props.onAddUser(e);
    e.target.setAttribute('disabled', true);
    e.target.setAttribute('class', 'btn btn-success btn-sm btn-block');
    e.target.text = 'Member';
  }
  /**
   * handles Search
   * @return {void} void
   * @param {e} e
   */
  handleSearch(e) {
    this.props.getUsersSearch(this.props.groupId, e.target.value);
  }

  /**
   * render component
   * @return {XML} XML/JSX
   */
  render() {
    const { usersSearch } = this.props.groupState;
    return (
        <form onSubmit={e => this.handleSubmit(e)}
              className="form-horizontal" role="form">
          <h4 className="text-center">
            Add members to <span className="text-capitalize text-display">
            {this.props.name}</span> group</h4>
          <div className="row well well-sm">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="input-group">
                <input id="search" name="search"
                       ref={input => this.search = input}
                       onKeyUp={e => this.handleSearch(e)}
                       placeholder="Search Users by Username or Email"
                       type="text" className="form-control"/>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-post">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <table className="table table-striped">
                <caption>
                  <h4>Search result appears here</h4>
                  {this.props.addUserSuccess && <h4 className="text-center text-success">
                    User added successfully</h4>
                  }
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
                  !!usersSearch && usersSearch.allUsers.map((user) => {
                    if (lodash.includes(usersSearch.groupUsersId, user.id)) {
                      return (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>
                              <a className="btn btn-success btn-sm btn-block" disabled >
                                Member
                              </a>
                            </td>
                          </tr>
                      );
                    }
                    return (
                          <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>
                              <a onClick={e => this.handleAddUser(e)}
                                   id={user.username}
                                   className="btn btn-primary btn-sm btn-block" href="">
                                Add
                              </a>
                            </td>
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
AddUserToGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onAddUser: PropTypes.func.isRequired,
  addUserError: PropTypes.any,
  addUserSuccess: PropTypes.bool,
  groupState: PropTypes.object.isRequired,
  getUsersSearch: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserToGroup);

