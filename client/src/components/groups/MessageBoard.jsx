import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import jwtDecode from 'jwt-decode';
import Moment from 'react-moment';
import { Pagination } from 'react-bootstrap';
import {
  getAllUserGroups,
  getBoardMessages } from '../../actions/group/groupActions';

/**
 * MessageBoard class declaration
 * @class MessageBoard
 * @extends {React.Component}
 */
export class MessageBoard extends React.Component {
  /**
   * class constructor
   * @param {object} props
   * @memberOf MessageBoard
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
   * @method componentDidMount
   * @return {void} void
   */
  componentDidMount() {
    this.props.getAllUserGroups();
  }

  /**
   * Handle select for pagination
   * @method handleSelect
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getBoardMessages(eventKey);
  }

  /**
   * Performs time calculation for message
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
    const { messages, pages, count } = this.props.boardMessages;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2><strong>Notification board</strong></h2>
          <small className="text-red">{count === 1 ?
            `(${count}) notification` :
            `(${count}) notifications`} you have not read</small>
          <hr/>
          {
            messages.map((message) => {
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
                <div key={message.id} className="media">
                  <div className="media-left message">
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <span className="text-capitalize">
                        {message.User.username}
                      </span>
                      <small>
                        <Link to={`/group/${message.Group.id}/board`}>
                          <i><span className="text-capitalize"
                          > {message.Group.name} </span>group</i>
                        </Link>
                        <small> {priority} </small>
                        {this.showTime(message.createdAt) >= 23 ?
                          <small> posted on {new Date(message.createdAt)
                            .toLocaleString('en-us', this.dateOptions)}</small> :
                          <small> Sent <Moment fromNow>
                            {message.createdAt}</Moment>
                          </small>}
                      </small>
                    </h4>
                    <p className="text-overflow">
                      <Link to={`/message/${message.Group.id}/${message.id}`}>
                        {message.body}
                      </Link></p>
                  </div>
                  <hr/>
                </div>
              );
            })
          }
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
          {
            count === 0 ? <p className="no-message">
              You have no unread notifications yet. Only
              notifications you have not read are shown here.</p> : null
          }
        </div>
    );
  }
}
MessageBoard.propTypes = {
  getAllUserGroups: PropTypes.func.isRequired,
  getBoardMessages: PropTypes.func.isRequired,
  boardMessages: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUserGroups,
  getBoardMessages }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
