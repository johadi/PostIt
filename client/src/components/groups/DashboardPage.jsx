import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { cancelModal } from '../../actions/auth/signupAction';
import MainHeader from '../headers/MainHeader.jsx';
import SideBar from './SideBar.jsx';
import MessageBoard from './MessageBoard.jsx';
import SignupModal from './SignupModal.jsx';

/**
 * Dashboard class declaration
 */
class Dashboard extends React.Component {
  /**
   * @return {void} void
   */
  componentDidMount() {
    // Show modal when user just signup
    if (this.props.signupState.welcome) {
      const signupModal = $('#myModal');
      signupModal.modal('show');
      // Cancel Modal state whenever user cancel modal
      signupModal.on('hidden.bs.modal', () => {
        this.props.cancelModal();
      });
    }
  }

  /**
   * Renders this component
   * @return {XML} XML
   */
  render() {
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div
              className="col-md-push-1 col-md-7 col-sm-12
              col-xs-12 panel panel-default"
              id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <MessageBoard
                    boardMessagesPagination={this.props.boardMessagesPagination}
                  />
                </div>
              </div>
            </div>
            <SideBar/>
          </div>
          <SignupModal/>
        </div>
    );
  }
}
Dashboard.propTypes = {
  cancelModal: PropTypes.func.isRequired,
  boardMessagesPagination: PropTypes.object.isRequired,
  signupState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ cancelModal }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
