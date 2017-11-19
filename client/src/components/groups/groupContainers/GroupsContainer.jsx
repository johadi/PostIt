import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getUserGroups } from '../../../actions/group/groupActions';
import NullComponent from '../NullComponent';
import AllGroups from '../AllGroups';
import Page from '../Page';

/**
 * GroupsContainer class declaration
 * @class GroupsContainer
 * @extends {React.component}
 */
class GroupsContainer extends React.Component {
  /**
   * @method componentWillMount
   * @return {void}
   */
  componentWillMount() {
    this.props.getUserGroups(1); // for group page
  }

  /**
   * renders component
   * @return {XML} JSX
   */
  render() {
    const { userGroupsStore } = this.props.groupState;
    return this.props.tokenStatus.success && userGroupsStore ?
      <Page>
      <AllGroups userGroups={userGroupsStore}/>
      </Page> : <NullComponent/>;
  }
}
GroupsContainer.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserGroups }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupsContainer);

