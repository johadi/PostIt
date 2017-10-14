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
 */
class Notification extends React.Component {
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
    if (!lodash.includes(this.props.message.readersId,
        this.userDetail.id)) {
      this.props.updateReadMessage(this.props.message.id);
    }
  }
  /**
   * returns date
   * @param {object} date
   * @return {String} String
   */
  showTime(date) {
    const postDate = new Date(date);
    const diff = new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }
  /**
   * renders the component
   * @return {XML} XML/JSX
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
    let priority = <span style={{ backgroundColor: 'green' }}
                         className="badge text-capitalize">
    {message.priority}
    </span>;
    if (message.priority === 'urgent') {
      priority = <span style={{ backgroundColor: 'orange' }}
                       className="badge text-capitalize">
      {message.priority}
      </span>;
    }
    if (message.priority === 'critical') {
      priority = <span style={{ backgroundColor: 'darkred' }}
                       className="badge text-capitalize">
      {message.priority}
      </span>;
    }
    return (
      <div className="col-md-12" id="message-board-div">
        <h2><span className="text-capitalize">{name}</span> group</h2>
        <p>Sent by <span style={{ color: 'green' }}>
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
