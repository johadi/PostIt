import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postMessage,clearPostMessageError } from '../../actions/group/groupActions';

class PostMessage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      input: {
        message: ''
      },
      isValid: true // Let's assume input is valid for now
    }
  }
  componentWillUnmount(){
    this.props.clearPostMessageError();
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    if(this.state.input.message){
      const groupId=this.props.groupId;
      const message=this.state.input.message;
      this.props.postMessage(groupId,message);
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
  render() {
    const {post_message_error} = this.props.groupState;
    return (
        <div className="col-sm-offset-1 col-sm-10 well well-lg" id="post-message-div">
          <form onSubmit={this.handleSubmit} className="form-horizontal" role="form">
            <p className="text-center"><strong>Post to <span style={{textTransform: 'capitalize'}}>
              {this.props.name} group</span></strong></p>
            {(!!post_message_error && <h4 className="text-danger text-center">{post_message_error}</h4>) ||
            (!this.state.isValid && <h4 className="text-danger text-center">Message body required.</h4>)}
            <div className="form-group">
              <div className="col-lg-12">
                <textarea value={this.state.input.message} onChange={this.handleChange} rows="5"
                          className="form-control" name="message" id="message" placeholder="Type your Post"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-12">
                <button type="submit" className="btn btn-block btn-post btn-lg">Send Post</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(PostMessage);
