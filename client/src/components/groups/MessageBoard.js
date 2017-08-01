import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Pagination } from 'react-bootstrap';
import { getGroupsUserBelongsTo, getMessagesOfMessageBoardPagination } from '../../actions/group/groupActions';

class MessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
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
    this.reload=0;
  }
  componentDidMount(){
    this.props.getGroupsUserBelongsTo();
  }
  handleSelect=(eventKey)=>{
    this.setState({activePage: eventKey});
    this.props.getMessagesOfMessageBoardPagination(eventKey);
    // if(this.reload===1){
    //   this.props.getGroupsUserBelongsTo();
    // }
    this.props.getGroupsUserBelongsTo();
  }
  showTime(date){
    const postDate=new Date(date);
    const diff=new Date().valueOf() - postDate.valueOf();
    return new Date(diff).getHours();
  }
  render() {
    // this.props.getGroupsUserBelongsTo(); // force side bar to render anytime this page renders
    const {messages, pages, count} = this.props.messageBoardMessagesPagination;
    return (
        <div className="col-md-12" id="message-board-div">
          <h2>Message board</h2>
          <hr/>
          {
            messages.map((message) => {
              return <div key={message.id} className="media">
                <div className="media-left">
                </div>
                <div className="media-body">
                  <h4 className="media-heading"><span className="text-capitalize"> {message.User.username}</span>
                    <small>
                      <Link to={`/group/${message.Group.id}/board`}>
                        <i><span className="text-capitalize"> {message.Group.name} </span>group</i>
                      </Link>
                      {this.showTime(message.createdAt) >= 23 ?
                          <small> posted on {new Date(message.createdAt).toLocaleString('en-us', this.dateOptions)}</small> :
                          <small> Sent <Moment fromNow>{message.createdAt}</Moment></small>}
                    </small>
                  </h4>
                  <p className="text-overflow"><Link to={`/message/${message.Group.id}/${message.id}`}>{message.body}</Link></p>
                </div>
                <hr/>
              </div>;
            })
          }
          {pages <= 1 ? null:
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
                  onSelect={this.handleSelect}
              />
          }
          {
            count===0 ? <p>You have no message yet. Create group and start adding members to share notifications.</p> : null
          }
        </div>
    );
  }
}
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupsUserBelongsTo,
  getMessagesOfMessageBoardPagination }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageBoard);
