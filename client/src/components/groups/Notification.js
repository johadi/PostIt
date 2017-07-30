import React from 'react';
import Moment from 'react-moment';

const Notification = ({message,name}) =>{
  const showTime=(date)=>{
    const postDate=new Date(date);
    const diff=new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }
  const dateOptions={
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return (
      <div className="col-md-12" id="message-board-div">
        <h2 style={{textTransform: 'capitalize'}}>{name} Group</h2>
        <p>Posted by <a href="#">{message.User.username}</a>
          {showTime(message.createdAt) >= 24 ? <small> on {new Date(message.createdAt).toLocaleString('en-us', dateOptions)}
          </small> : <small> <Moment fromNow>{message.createdAt}</Moment></small>}
        </p>
        <hr/>
        <p>
          {message.body}
        </p>
      </div>
  );
}
export default Notification;
