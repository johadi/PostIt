import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'react-proptypes';

const Notification = (props) => {
  const { message, name } = props;
  const showTime = (date) => {
    const postDate = new Date(date);
    const diff = new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  };
  const dateOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  let priority = <span style={{ backgroundColor: 'green' }} className="badge text-capitalize">{message.priority}</span>;
  if (message.priority === 'urgent') {
    priority = <span style={{ backgroundColor: 'orange' }} className="badge text-capitalize">{message.priority}</span>;
  }
  if (message.priority === 'critical') {
    priority = <span style={{ backgroundColor: 'darkred' }} className="badge text-capitalize">{message.priority}</span>;
  }
  return (
      <div className="col-md-12" id="message-board-div">
        <h2><span className="text-capitalize">{name}</span> group</h2>
        <p>Sent by <a href="#">{message.User.username}</a>
          {showTime(message.createdAt) >= 24 ? <small> on {new Date(message.createdAt).toLocaleString('en-us', dateOptions)}
          </small> : <small> <Moment fromNow>{message.createdAt}</Moment></small>}
        </p>
        <hr/>
        <p>{priority}</p>
        <p className="message-body">
          {message.body}
        </p>
      </div>
  );
};
Notification.propTypes = {
  message: PropTypes.object,
  name: PropTypes.string
};
export default Notification;
