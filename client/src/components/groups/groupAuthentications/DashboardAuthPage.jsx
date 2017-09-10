import React from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { verifyToken } from '../../../actions/verifyTokenAction';
import { getUserGroups, getBoardMessagesPaginated } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import DashboardPage from '../DashboardPage.jsx';

/**
 * DashboardAuthPage class declaration
 */
class DashboardAuthPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getUserGroups();
    this.props.getBoardMessagesPaginated();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { groupsUserBelongs, boardMessagesPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && groupsUserBelongs && boardMessagesPaginated ?
        <DashboardPage boardMessagesPagination={boardMessagesPaginated}
                       groupsUserBelongsTo={groupsUserBelongs}
        /> : <NullPage/>;
  }
}
DashboardAuthPage.propTypes = {
  getUserGroups: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getBoardMessagesPaginated: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  verifyToken,
  getUserGroups,
  getBoardMessagesPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthPage);

