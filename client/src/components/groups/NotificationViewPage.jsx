import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import jwtDecode from 'jwt-decode';
import { updateReadMessage } from '../../actions/group/groupActions';
import MainHeader from '../headers/MainHeader.jsx';
import GroupSideBar from './GroupSideBar.jsx';
import Notification from './Notification.jsx';

/**
 * NotificationViewPage class declaration
 */
class NotificationViewPage extends React.Component {
  /**
   * constructor
   * @param {object} props
   * @return {void} void
   */
  constructor(props) {
    super(props);
    this.userDetail = jwtDecode(window.sessionStorage.token);
  }

  /**
   * @return {void} void
   */
  componentDidMount() {
    if (!lodash.includes(this.props.message.readersId, this.userDetail.id)) {
      this.props.updateReadMessage(this.props.message.id);
    }
  }

  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const { name } = this.props.groupUsers;
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default"
                 id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <Notification name={name} message={this.props.message}/>
                </div>
              </div>
            </div>
            <GroupSideBar groupId={this.props.groupId}/>
          </div>
        </div>
    );
  }
}
NotificationViewPage.propTypes = {
  updateReadMessage: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  groupUsers: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateReadMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewPage);
