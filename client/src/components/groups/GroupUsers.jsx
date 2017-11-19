import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getGroupUsers } from '../../actions/group/groupActions';

/**
 * GroupUsers class declaration
 * @class GroupUsers
 * @extends {React.Component}
 */
export class GroupUsers extends React.Component {
  /**
   * Class constructor
   * @param {object} props
   * @memberOf GroupUsers
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
  /**
   * Handles select for pagination buttons
   * @method handleSelect
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getGroupUsers(this.props.groupId, eventKey);
  }

  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { name, users, metaData } = this.props.groupUsers;
    const { totalCount, totalPages } = metaData;
    return (
        <div className="col-md-12" id="message-board-div">
          <h3 className="text-capitalize">{name} group members</h3>
          <p className="text-display">
            <strong>{totalCount} {totalCount === 1 ? 'member' : 'members'}</strong>
          </p>
          <hr/>
          <div className="list-group">
            {users.map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">
                    {user.User.fullname}
                  </h5>
                </Link>
            ))}
          </div>
          <hr/>
          {totalPages <= 1 ? null :
              <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={totalPages}
                  maxButtons={10}
                  activePage={this.state.activePage}
                  onSelect={event => this.handleSelect(event)}
              />
          }
        </div>
    );
  }
}
GroupUsers.propTypes = {
  groupState: PropTypes.object.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupUsers: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsers);

