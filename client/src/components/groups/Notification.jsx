import React from 'react';
import Moment from 'react-moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import jwtDecode from 'jwt-decode';
import { updateReadMessage } from '../../actions/group/groupActions';

/**
 * Notification class declaration
 * @class Notification
 * @extends {React.Component}
 */
export class Notification extends React.Component {
  /**
   * constructor
   * @param {object} props
   * @memberOf Notification
   */
  constructor(props) {
    super(props);
    this.userDetail = jwtDecode(window.sessionStorage.token);
  }

  /**
   * @method componentDidMount
   * @return {void}
   */
  componentDidMount() {
    if (!lodash.includes(this.props.message.readersId,
        this.userDetail.id)) {
      this.props.updateReadMessage(this.props.message.id);
    }
  }
  /**
   * returns date
   * @method showTime
   * @param {string} date
   * @return {number} number
   */
  showTime(date) {
    const postDate = new Date(date);
    const diff = new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }
  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    const { message, name } = this.props;
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    let priority = <span
      className="badge text-capitalize notification-normal">
      {message.priority}
    </span>;
    if (message.priority === 'urgent') {
      priority = <span
        className="badge text-capitalize notification-urgent">
        {message.priority}
      </span>;
    }
    if (message.priority === 'critical') {
      priority = <span
        className="badge text-capitalize notification-critical">
        {message.priority}
      </span>;
    }
    return (
      <div className="col-md-12" id="message-board-div">
        <h3><span className="text-capitalize">{name}</span> group</h3>
        <p>Sent by <span className="text-green">
          {message.User.username}
        </span>
          {this.showTime(message.createdAt) >= 24 ?
            <small> on {new Date(message.createdAt)
              .toLocaleString('en-us', dateOptions)}
            </small> : <small> <Moment fromNow>{message.createdAt}</Moment></small>}
        </p>
        <hr/>
        <p>{priority}</p>
        <p className="message-body">
          {message.body}
        </p>
      </div>
    );
  }
}
Notification.propTypes = {
  message: PropTypes.object,
  name: PropTypes.string,
  updateReadMessage: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateReadMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
