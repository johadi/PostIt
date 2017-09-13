import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
import { getGroupUsersPaginated } from '../../actions/group/groupActions';

/**
 * GroupUsers class declaration
 */
export class GroupUsers extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }
  /**
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getGroupUsersPaginated(this.props.groupId, eventKey);
  }

  /**
   * renders the component
   * @return {XML} XML
   */
  render() {
    const { name, users, count, pages } = this.props.groupUsersPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2 className="text-capitalize">{name} group members</h2>
          <p className="text-display">
            <strong>{count} {count === 1 ? 'member' : 'members'}</strong>
          </p>
          <hr/>
          <div className="list-group">
            {users.map(user => (
                <Link key={user.User.id} className="list-group-item">
                  <h5 className="list-group-item-heading">{user.User.fullname}</h5>
                </Link>
            ))}
          </div>
          <hr/>
          {pages <= 1 ? null :
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
                  onSelect={e => this.handleSelect(e)}
              />
          }
        </div>
    );
  }
}
GroupUsers.propTypes = {
  groupState: PropTypes.object.isRequired,
  getGroupUsersPaginated: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupUsersPagination: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupUsersPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsers);

