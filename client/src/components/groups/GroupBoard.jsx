import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import lodash from 'lodash';
import jwtDecode from 'jwt-decode';
import Moment from 'react-moment';
import { Pagination } from 'react-bootstrap';
import {
  getGroupMessages,
  clearGroupMessagesError } from '../../actions/group/groupActions';

/**
 * GroupBoard class declaration
 * @class GroupBoard
 * @extends {React.Component}
 */
export class GroupBoard extends React.Component {
  /**
   * @param {object} props
   * @memberOf GroupBoard
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
   * Performs time calculation
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
   * Handle Select for pagination buttons
   * @method handleSelect
   * @param {number} paginationNumber
   * @return {void} void
   */
  handleSelect(paginationNumber) {
    this.setState({ activePage: paginationNumber });
    this.props.getGroupMessages(this.props.groupId, paginationNumber);
  }

  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    const { count, rows, pages } = this.props.groupState.groupMessages;
    return (
        <div className="col-md-12" id="message-board-div">
          <h3 className="text-capitalize">{this.props.name} Group </h3>
          <p>({count}) {count === 1 ? 'notification' : 'notifications'}</p>
          <hr/>
          {rows.map((message) => {
            let priority = <span className="badge text-capitalize notification-normal">
              {message.priority}
              </span>;
            if (message.priority === 'urgent') {
              priority = <span className="badge text-capitalize notification-urgent">
                {message.priority}
                </span>;
            }
            if (message.priority === 'critical') {
              priority = <span className="badge text-capitalize notification-critical">
                {message.priority}</span>;
            }
            return (
              <div key={message.id} className="media message">
                <div className="media-left">
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{message.User.username}
                    {this.showTime(message.createdAt) >= 23 ?
                      <small>
                        posted on {new Date(message.createdAt)
                        .toLocaleString('en-us', this.dateOptions)}
                      </small> :
                      <small> Sent <Moment fromNow>{message.createdAt}
                      </Moment> {priority} |
                        {
                          lodash.includes(message.readersId, this.userDetail.id) ?
                            <span className="text-success"> Read</span> :
                            <span className="text-red"> Unread</span>
                        }
                      </small>
                    }
                  </h4>
                  <p className="text-overflow"><Link
                    to={`/message/${this.props.groupId}/${message.id}`}>
                    {message.body}</Link></p>
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
                  onSelect={event => this.handleSelect(event)}
              />
          }
        </div>
    );
  }
}
GroupBoard.propTypes = {
  getGroupMessages: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupState: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupMessages,
  clearGroupMessagesError }, dispatch);
export default connect(mapStateToProps,
  mapDispatchToProps)(GroupBoard);
