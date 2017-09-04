import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import jwtDecode from 'jwt-decode';
import Moment from 'react-moment';
import { Pagination } from 'react-bootstrap';
import { getUserGroups, getBoardMessagesPaginated } from '../../actions/group/groupActions';

/**
 * MessageBoard class declaration
 */
export class MessageBoard extends React.Component {
  /**
   * class constructor
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
    this.reload = 0;
    this.userDetail = jwtDecode(window.sessionStorage.token);
  }

  /**
   * @return {void} void
   */
  componentDidMount() {
    this.props.getUserGroups();
  }

  /**
   * handle select for pagination
   * @return {void} void
   * @param {number} eventKey
   */
  handleSelect(eventKey) {
    this.setState({ activePage: eventKey });
    this.props.getBoardMessagesPaginated(eventKey);
    // if(this.reload===1){
    //   this.props.getUserGroups();
    // }
    this.props.getUserGroups();
  }

  /**
   * Perform time calculation
   * @param {date} date
   * @return {number} number
   */
  showTime(date) {
    const postDate = new Date(date);
    const diff = new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }

  /**
   * render the component
   * @return {XML} XML/JSX
   */
  render() {
    // this.props.getUserGroups(); // force side bar to render anytime this page renders
    const { messages, pages, count } = this.props.messageBoardMessagesPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2><strong>Notification board</strong></h2>
          <small style={{ color: 'red' }}>{count === 1 ? `(${count}) notification` : `(${count}) notifications`} you have not read</small>
          <hr/>
          {
            messages.map((message) => {
              let priority = <span style={{ backgroundColor: 'green' }}
                                   className="badge text-capitalize">{message.priority}</span>;
              if (message.priority === 'urgent') {
                priority = <span style={{ backgroundColor: 'orange' }}
                                 className="badge text-capitalize">{message.priority}</span>;
              }
              if (message.priority === 'critical') {
                priority = <span style={{ backgroundColor: 'darkred' }}
                                 className="badge text-capitalize">{message.priority}</span>;
              }
              return (
                <div key={message.id} className="media">
                  <div className="media-left message">
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading"><span className="text-capitalize">
                      {message.User.username}</span>
                      <small>
                        <Link to={`/group/${message.Group.id}/board`}>
                          <i><span className="text-capitalize">
                            {message.Group.name} </span>group</i>
                        </Link>
                        <small> {priority} </small>
                        {this.showTime(message.createdAt) >= 23 ?
                          <small> posted on {new Date(message.createdAt)
                            .toLocaleString('en-us', this.dateOptions)}</small> :
                          <small> Sent <Moment fromNow>{message.createdAt}</Moment></small>}
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
  getUserGroups: PropTypes.func.isRequired,
  getBoardMessagesPaginated: PropTypes.func.isRequired,
  messageBoardMessagesPagination: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getUserGroups,
  getBoardMessagesPaginated }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
