import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postMessage,clearPostMessageError } from '../../actions/group/groupActions';

class SendNotification extends React.Component {
  constructor(props){
    super(props);
    this.state={
      input: {
        message: '',
        priority: 'normal'
      },
      isValid: true // Let's assume input is valid for now
    }
  }
  componentWillUnmount(){
    this.props.clearPostMessageError();
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.state.input.message && this.state.input.message.trim().length > 0){
      const groupId=this.props.groupId;
      const message=this.state.input.message;
      const priority=this.state.input.priority;
      this.props.postMessage(groupId,message,priority);
    }else{
      // Since input is empty, clear message errors to allow empty error report
      this.props.clearPostMessageError();
      this.setState({isValid: false}); // Input is now invalid, Report field is empty
    }
  };
  handleChange = (e)=>{
    let input = this.state.input;
    input[e.target.name]=e.target.value;
    this.setState({ input });
  }
  handleKeyUp = (e)=>{
    this.setState({isValid: true});
  }
  render() {
    const {post_message_error} = this.props.groupState;
    return (
        <div className="col-sm-offset-1 col-sm-10 well well-lg" id="post-message-div">
          <form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
            <p className="text-center"><strong>Send notification to <span style={{textTransform: 'capitalize'}}>
              {this.props.name} group</span></strong></p>
            {(!!post_message_error && <h4 className="text-danger text-center">{post_message_error}</h4>) ||
            (!this.state.isValid && <h4 className="text-danger text-center">Notification body required.</h4>)}
            <div className="form-group">
              <div className="col-lg-12">
                <textarea value={this.state.input.message}
                          onChange={this.handleChange} rows="5"
                          onKeyUp={this.handleKeyUp}
                          className="form-control"
                          name="message" id="message"
                          placeholder="Type your Notification"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-lg-12">
                <p className="help-block">
                  <strong>
                    Notification priority level: <span className="text-capitalize text-display">{this.state.input.priority}</span>
                  </strong>
                </p>
                <select value={this.state.input.priority}
                          onChange={this.handleChange}
                          className="form-control"
                          name="priority" id="priority">
                  <option value={'normal'}>Normal</option>
                  <option value={'urgent'}>Urgent</option>
                  <option value={'critical'}>Critical</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <button type="submit" className="btn btn-block btn-post btn-lg">Send Notification</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ postMessage,clearPostMessageError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SendNotification);
