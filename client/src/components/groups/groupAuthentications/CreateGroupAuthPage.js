import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getGroupsUserBelongsTo } from '../../../actions/group/groupActions';
import NullPage from '../NullPage';
import CreateGroupPage from '../CreateGroupPage';

/**
 * CreateGroupAuthPage class declaration
 */
class CreateGroupAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
    this.props.getGroupsUserBelongsTo();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groups_user_belongs } = this.props.groupState;
    return this.props.tokenStatus.success && groups_user_belongs ? <CreateGroupPage
        groupsUserBelongsTo={groups_user_belongs}/> : <NullPage/>;
  }
}
CreateGroupAuthPage.propTypes = {
  verifyToken: PropTypes.func.isRequired,
  getGroupsUserBelongsTo: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getGroupsUserBelongsTo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupAuthPage);

