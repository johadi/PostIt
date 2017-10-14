import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import MainHeader from '../headers/MainHeader.jsx';
import { cancelModal } from '../../actions/auth/signupAction';
import SideBar from './SideBar.jsx';
import GroupSideBar from './GroupSideBar.jsx';
import SignupModal from './SignupModal.jsx';

/**
 * Page class declaration
 */
class Page extends React.Component {
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
   * @return {void} void
   */
  componentDidUpdate() {
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
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    return (
      <div className="container">
        <MainHeader/>
        <div id="group-body" className="row">
          <div className="col-md-push-1 col-md-7
            col-sm-12 col-xs-12 panel panel-default"
               id="page-panel">
            <div className="panel-body">
              <div className="row">
                { this.props.children }
              </div>
            </div>
          </div>
          { this.props.groupId ?
            <GroupSideBar groupId={this.props.groupId}/> : <SideBar/> }
        </div>
        <SignupModal/>
      </div>
    );
  }
}
Page.propTypes = {
  children: PropTypes.element.isRequired,
  groupId: PropTypes.string,
  showModal: PropTypes.bool,
  cancelModal: PropTypes.func,
  signupState: PropTypes.object
};
Page.contextTypes = {
  router: PropTypes.object
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ cancelModal }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Page);
