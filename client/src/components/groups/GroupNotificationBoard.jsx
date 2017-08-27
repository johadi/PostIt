import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
import Moment from 'react-moment';
import { Pagination } from 'react-bootstrap';
import { getGroupMessages, getGroupUsers, clearGetGroupMessagesError } from '../../actions/group/groupActions';

/**
 * GroupNotificationBoard class declaration
 */
export class GroupNotificationBoard extends React.Component {
  /**
   * @return {void} void
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
    this.dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    this.userDetail = jwtDecode(window.sessionStorage.token);
  }

  /**
   * performs time calculation
   * @param {date} date
   * @return {number} number
   */
  showTime(date) {
    const postDate = new Date(date);
    const diff = new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }

  /**
   * performs time calculation
   * @param {eventKey} eventKey
   * @return {void} void
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getGroupMessages(this.props.groupId, eventKey);
    this.props.getGroupUsers(this.props.groupId);
  }

  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    const { count, rows, pages } = this.props.groupState.group_messages;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2 className="text-capitalize">{this.props.name} Group </h2>
          <p>({count}) {count === 1 ? 'notification' : 'notifications'}</p>
          <hr/>
          {rows.map((message) => {
            let priority = <span style={{ backgroundColor: 'green' }} className="badge text-capitalize">{message.priority}</span>;
            if (message.priority === 'urgent') {
              priority = <span style={{ backgroundColor: 'orange' }} className="badge text-capitalize">{message.priority}</span>;
            }
            if (message.priority === 'critical') {
              priority = <span style={{ backgroundColor: 'darkred' }} className="badge text-capitalize">{message.priority}</span>;
            }
            return (
              <div key={message.id} className="media message">
                <div className="media-left">
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{message.User.username}
                    {this.showTime(message.createdAt) >= 23 ?
                      <small> posted on {new Date(message.createdAt).toLocaleString('en-us', this.dateOptions)}
                      </small> : <small> Sent <Moment fromNow>{message.createdAt}</Moment> {priority} |
                        {
                          _.includes(message.readersId, this.userDetail.id) ?
                            <span className="text-success"> Read</span> :
                            <span style={{ color: 'red' }}> Unread</span>
                        }
                      </small>
                    }
                  </h4>
                  <p className="text-overflow"><Link
                    to={`/message/${this.props.groupId}/${message.id}`}>{message.body}</Link></p>
                </div>
                <hr/>
              </div>
            );
          })}
          {pages <= 1 ? null :
              <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={pages}
                  maxButtons={10}
                  activePage={this.state.activePage}
                  onSelect={e => this.handleSelect(e)}
              />
          }
        </div>
    );
  }
}
GroupNotificationBoard.propTypes = {
  getGroupMessages: PropTypes.func.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupState: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMessages,
  clearGetGroupMessagesError,
  getGroupUsers
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupNotificationBoard);
