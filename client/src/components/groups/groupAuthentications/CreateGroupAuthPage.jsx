import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getUserGroups } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import CreateGroupPage from '../CreateGroupPage.jsx';

/**
 * CreateGroupAuthPage class declaration
 */
class CreateGroupAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getUserGroups();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groupsUserBelongs } = this.props.groupState;
    return this.props.tokenStatus.success && groupsUserBelongs ? <CreateGroupPage
        groupsUserBelongsTo={groupsUserBelongs}/> : <NullPage/>;
  }
}
CreateGroupAuthPage.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken, getUserGroups }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupAuthPage);

