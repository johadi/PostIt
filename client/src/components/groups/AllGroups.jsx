import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { Pagination } from 'react-bootstrap';
import { getUserGroups } from '../../actions/group/groupActions';

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
   * @return {void} void
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.getUserGroups(1);
  }
  /**
   * Handles Select for pagination buttons
   * @method handleSelect
   * @param {number} paginationNumber
   * @return {void} void
   */
  handleSelect(paginationNumber) {
    this.setState({ activePage: paginationNumber });
    this.props.getUserGroups(paginationNumber);
  }

  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { metaData, groups } = this.props.userGroups;
    const { totalCount, totalPages } = metaData;

    return (
        <div className="col-md-12 yo" id="message-board-div">
          <h3>Your Groups</h3>
          <p className="text-display"><strong className="group-count">
            Total groups you joined: {totalCount}</strong></p>
          <hr/>
          <div className="list-group">
            {groups.map(userGroup => (
                !!userGroup.Group &&
                <Link to={`/group/${userGroup.Group.id}/board`}
                      key={userGroup.Group.id} className="group-div list-group-item">
                  <h5 className="list-group-item-heading">{userGroup.Group.name}</h5>
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
AllGroups.propTypes = {
  groupState: PropTypes.object.isRequired,
  getUserGroups: PropTypes.func.isRequired,
  userGroups: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserGroups }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AllGroups);

