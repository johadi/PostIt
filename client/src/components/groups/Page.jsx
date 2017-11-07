import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { cancelModal } from '../../actions/auth/signupAction';
import SignupModal from './SignupModal';
import { MainHeader } from '../headers';
import { MainFooter } from '../footers';
import { GroupSideBar, MainSideBar } from '../sideBars';

/**
 * Page class declaration
 * @class Page
 * @extends {React.Component}
 */
export class Page extends React.Component {
  /**
   * @method componentDidMount
   * @return {void}
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
   * @method componentDidUpdate
   * @return {void}
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
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    return (
      <div className="container">
        <MainHeader/>
        <nav id="myNavmenu" className="navmenu navmenu-default navmenu-fixed-left offcanvas">
          <div className="col-xs-12">
            { this.props.groupId ?
              <GroupSideBar groupId={this.props.groupId}/> : <MainSideBar/>
            }
          </div>
        </nav>
        <div id="group-body" className="row">
          <button className="btn btn-default visible-xs pull-right btn-nav"
                  data-toggle="offcanvas" data-target="#myNavmenu">
            <strong>...</strong>
          </button>
          <div className="col-md-push-1 col-md-7
            col-sm-7 col-xs-12 panel panel-default"
               id="page-panel">
            <div className="panel-body">
              <div className="row">
                { this.props.children }
              </div>
            </div>
          </div>
          <div className="main side-bar col-md-push-2 col-md-3 col-sm-push-1 col-sm-4 hidden-xs well">
            { this.props.groupId ?
              <GroupSideBar groupId={this.props.groupId}/> : <MainSideBar/>
            }
          </div>
        </div>
        <MainFooter/>
        <SignupModal/>
      </div>
    );
  }
}
Page.propTypes = {
  children: PropTypes.element,
  groupId: PropTypes.string,
  showModal: PropTypes.bool,
  cancelModal: PropTypes.func,
  signupState: PropTypes.object
};
const mapStateToProps = state => ({
  signupState: state.signupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ cancelModal }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Page);
