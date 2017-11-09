import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import { Pagination } from 'react-bootstrap';
import { getUsersSearch, clearUsersSearch } from '../../actions/group/groupActions';

/**
 * AddUserToGroup class declaration
 * @class AddUserToGroup
 * @extends {React.Component}
 */
export class AddUserToGroup extends React.Component {
  /**
   * class constructor
   * @param {object} props
   * @memberOf MessageBoard
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
  /**
   * @method componentWillUnMount
   * @return {void}
   */
  componentWillUnmount() {
    // this.props.getUsersSearch(this.props.groupId, '', '');
    this.props.clearUsersSearch();
  }
  /**
   * Handle select for pagination
   * @method handleSelect
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getUsersSearch(this.props.groupId, this.search.value, eventKey);
  }
  /**
   * Handles form submit
   * @method handleSubmit
   * @return {void}
   * @param {object} event - event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.getUsersSearch(this.props.groupId, this.search.value);
  }
  /**
   * Handles user click
   * @method handleAddUser
   * @return {void}
   * @param {object} event - event
   */
  handleAddUser(event) {
    this.props.onAddUser(event);
    event.target.setAttribute('disabled', true);
    event.target.setAttribute('class', 'btn btn-success btn-sm btn-block');
    event.target.text = 'Member';
  }
  /**
   * Handles Search
   * @method handleSearch
   * @return {void} void
   * @param {object} event - event
   */
  handleSearch(event) {
    this.props.getUsersSearch(this.props.groupId, event.target.value);
  }

  /**
   * Render component
   * @return {XML} JSX
   */
  render() {
    let pagination;
    const { usersSearch } = this.props.groupState;
    // check if search result page is more than one and
    // display the pagination buttons
    if (usersSearch && usersSearch.pages > 1) {
      pagination = <tr><td colSpan="4">
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={usersSearch.pages}
          maxButtons={10}
          activePage={this.state.activePage}
          onSelect={event => this.handleSelect(event)}
        />
      </td></tr>;
    } else {
      pagination = null;
    }
    return (
        <form onSubmit={event => this.handleSubmit(event)}
              className="form-horizontal" role="form">
          <h4 className="text-center">
            Add members to <span className="text-capitalize text-display">
            {this.props.name}</span> group</h4>
          <div className="row well well-sm">
            <div className="col-lg-10 col-lg-offset-1">
              <div className="input-group">
                <input id="search" name="search"
                       ref={input => this.search = input}
                       onKeyUp={event => this.handleSearch(event)}
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
            <div className="col-lg-12 col-xs-12">
              <div className="table-responsive">
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
                            <a onClick={event => this.handleAddUser(event)}
                               id={user.username}
                               className="btn btn-primary btn-sm btn-block" href="">
                              Add
                            </a>
                          </td>
                        </tr>
                      );
                    })
                  }
                  {pagination}
                  </tbody>
                </table>
              </div>
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
  groupId: PropTypes.string.isRequired,
  clearUsersSearch: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersSearch, clearUsersSearch }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserToGroup);

