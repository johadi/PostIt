import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { getBoardMessages } from '../../../actions/group/groupActions';
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
    this.props.getBoardMessages();
  }

  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    const { boardMessagesStore } = this.props.groupState;
    return this.props.tokenStatus.success && boardMessagesStore ?
      <Page>
        <MessageBoard boardMessages={boardMessagesStore}/>
      </Page> : <NullPage/>;
  }
}
DashboardContainer.propTypes = {
  groupState: PropTypes.object.isRequired,
  tokenStatus: PropTypes.object.isRequired,
  getBoardMessages: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getBoardMessages }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

