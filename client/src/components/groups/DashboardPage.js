import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { cancelModal } from '../../actions/auth/signupAction';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import SideBar from './SideBar';
import MessageBoard from './MessageBoard';
import groupBackGround from '../../utils/groupPagesBackground';
import SignupModal from './SignupModal';

/**
 * Dashboard class declaration
 */
class Dashboard extends React.Component {
  /**
   * @return {void} void
   */
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
    if (this.props.signupState.welcome) { // Show modal when user just signup
      const signupModal = $('#myModal');
      signupModal.modal('show');
      signupModal.on('hidden.bs.modal', (e) => { // Cancel Modal state whenever user cancel modal
        this.props.cancelModal();
      });
    }
  }

  /**
   * Renders this component
   * @return {XML} XML
   */
  render() {
    const { Groups } = this.props.groupsUserBelongsTo;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <MessageBoard messageBoardMessagesPagination={this.props.messageBoardMessagesPagination}/>
                </div>
              </div>
            </div>
            <SideBar userGroups={Groups}/>
          </div>
          <SignupModal/>
        </div>
    );
  }
}
Dashboard.propTypes = {
  groupsUserBelongsTo: PropTypes.func.isRequired,
  cancelModal: PropTypes.func.isRequired,
  messageBoardMessagesPagination: PropTypes.object.isRequired,
  signupState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ cancelModal }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
