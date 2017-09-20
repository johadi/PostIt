import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getUserGroupsPaginated } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import GroupsPage from '../GroupsPage.jsx';

/**
 * GroupsContainer class declaration
 */
class GroupsContainer extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getUserGroupsPaginated(1); // for group page
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    const { userGroupsPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && userGroupsPaginated ?
      <GroupsPage
        userGroupsPagination={userGroupsPaginated} /> : <NullPage/>;
  }
}
GroupsContainer.propTypes = {
  getUserGroupsPaginated: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserGroupsPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);

