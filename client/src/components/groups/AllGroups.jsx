import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { Pagination } from 'react-bootstrap';
import { getAllUserGroups, getUserGroups } from '../../actions/group/groupActions';

/**
 * GroupsContainer class declaration
 * @class GroupsContainer
 * @extends {React.Component}
 */
export class AllGroups extends React.Component {
  /**
   * class constructor
   * @param {object} props
   * @memberOf GroupsContainer
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  /**
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.getAllUserGroups();
  }

  /**
   * Handles Select for pagination buttons
   * @method handleSelect
   * @param {number} eventKey
   * @return {void} void
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getUserGroups(eventKey);
  }

  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { pages, count, groups } = this.props.userGroups;
    return (
        <div className="col-md-12 yo" id="message-board-div">
          <h2>Your Groups</h2>
          <p className="text-display"><strong className="group-count">
            Total groups you joined: {count}</strong></p>
          <hr/>
          <div className="list-group">
            {groups.map(userGroup => (
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
AllGroups.propTypes = {
  groupState: PropTypes.object.isRequired,
  getAllUserGroups: PropTypes.func.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUserGroups, getUserGroups }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AllGroups);

