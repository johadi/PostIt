import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsersPaginated } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupUsers from '../GroupUsers.jsx';
import Page from '../Page.jsx';

/**
 * GroupUsersContainer class declaration
 */
class GroupUsersContainer extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getGroupUsersPaginated(this.props.params.groupId, 1);
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { groupUsersPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && groupUsersPaginated ?
      <Page groupId={ this.props.params.groupId}>
        <GroupUsers
          groupUsersPagination={groupUsersPaginated}
          groupId={this.props.params.groupId} />
      </Page> : <NullPage/>;
  }
}
GroupUsersContainer.propTypes = {
  getGroupUsersPaginated: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupUsersPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupUsersContainer);

