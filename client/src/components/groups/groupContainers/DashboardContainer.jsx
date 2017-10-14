import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getBoardMessagesPaginated } from '../../../actions/group/groupActions';
import NullPage from '../NullPage.jsx';
import MessageBoard from '../MessageBoard.jsx';
import Page from '../Page.jsx';

/**
 * DashboardContainer class declaration
 */
class DashboardContainer extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.getBoardMessagesPaginated();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { boardMessagesPaginated } = this.props.groupState;
    return this.props.tokenStatus.success && boardMessagesPaginated ?
      <Page>
        <MessageBoard boardMessagesPagination={boardMessagesPaginated}/>
      </Page> : <NullPage/>;
  }
}
DashboardContainer.propTypes = {
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getBoardMessagesPaginated: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getBoardMessagesPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

