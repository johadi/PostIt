import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { Pagination } from 'react-bootstrap';
import { getUserGroups, getUserGroupsPaginated } from '../../actions/group/groupActions';

/**
 * GroupsContainer class declaration
 */
export class GroupsContainer extends React.Component {
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
   */
  componentWillMount() {
    this.props.getUserGroups();
    // this.props.getUserGroupsPaginated(1);
  }

  /**
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getUserGroupsPaginated(eventKey);
    this.props.getUserGroups(); // necessary to keep side bar state else it will vanish
  }

  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const { pages, count, Groups } = this.props.groupsUserBelongsToPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2>Your Groups</h2>
          <p className="text-display"><strong className="group-count">
            Total groups you joined: {count}</strong></p>
          <hr/>
          <div className="list-group">
            {Groups.map(userGroup => (
                <Link to={`/group/${userGroup.Group.id}/board`}
                      key={userGroup.Group.id} className="group-div list-group-item">
                  <h5 className="list-group-item-heading">{userGroup.Group.name}</h5>
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
GroupsContainer.propTypes = {
  groupState: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  getUserGroupsPaginated: PropTypes.func.isRequired,
  groupsUserBelongsToPagination: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserGroups, getUserGroupsPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);

