import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { getGroupMessages, clearGetGroupMessagesError } from '../../actions/group/groupActions';

class GroupNotificationBoard extends React.Component {
  constructor(props) {
    super(props);
    this.dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
  }
  showTime(date){
    const postDate=new Date(date);
    const diff=new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }


render() {
    const {count, rows} =this.props.groupState.group_messages;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2 style={{ textTransform: 'capitalize' }}>{this.props.name} Group</h2>
          <p>({count}) notifications</p>
          <hr/>
          {rows.map(message => (
                <div key={message.id} className="media">
                  <div className="media-left">
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{message.User.username}
                      {this.showTime(message.createdAt) >= 24 ? <small> posted on {new Date(message.createdAt).toLocaleString('en-us', this.dateOptions)}
                      </small> : <small> posted <Moment fromNow>{message.createdAt}</Moment></small>}
                    </h4>
                    <p className="text-overflow"><Link to={`/message/${this.props.groupId}/${message.id}`}>{message.body}</Link></p>
                  </div>
                  <hr/>
                </div>
            ))}
          <ul className="pagination">
            <li><a href="#">&laquo;</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&raquo;</a></li>
          </ul>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ getGroupMessages, clearGetGroupMessagesError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GroupNotificationBoard);
