import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getGroupUsersPaginated } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupUsersPage from '../GroupUsersPage.jsx';

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
        <GroupUsersPage
          groupUsersPagination={groupUsersPaginated}
          groupId={this.props.params.groupId}
        /> : <NullPage/>;
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

