import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { postMessage, clearPostMessageError } from '../../actions/group/groupActions';

/**
 * SendNotification class declaration
 */
export class SendNotification extends React.Component {
  /**
   * class constructor
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      input: {
        message: '',
        priority: 'normal'
      },
      isValid: true // Let's assume input is valid for now
    };
  }

  /**
   * @return {void} void
   */
  componentWillUnmount() {
    this.props.clearPostMessageError();
  }

  /**
   * @return {void} void
   * @param {object} e
   */
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.input.message && this.state.input.message.trim().length > 0) {
      const groupId = this.props.groupId;
      const message = this.state.input.message;
      const priority = this.state.input.priority;
      this.props.postMessage(groupId, message, priority);
    } else {
      // Since input is empty, clear message errors to allow empty error report
      this.props.clearPostMessageError();
      this.setState({ isValid: false }); // Input is now invalid, Report field is empty
    }
  }

  /**
   * @return {void} void
   * @param {object} e
   */
  handleChange(e) {
    const input = this.state.input;
    input[e.target.name] = e.target.value;
    this.setState({ input });
  }
  /**
   * @return {void} void
   * @param {object} e
   */
  handleKeyUp(e) {
    this.setState({ isValid: true });
  }

  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    const { post_message_error } = this.props.groupState;
    return (
        <div className="col-sm-offset-1 col-sm-10 well well-lg" id="post-message-div">
          <form onSubmit={e => this.handleSubmit(e)} className="form-horizontal" role="form">
            <p className="text-center"><strong>Send notification to <span className="text-capitalize">
              {this.props.name} group</span></strong></p>
            {(!!post_message_error && <h4 className="text-danger text-center">{post_message_error}</h4>) ||
            (!this.state.isValid && <h4 className="text-danger text-center">Notification body required.</h4>)}
            <div className="form-group">
              <div className="col-lg-12">
                <textarea value={this.state.input.message}
                          onChange={e => this.handleChange(e)} rows="5"
                          onKeyUp={e => this.handleKeyUp(e)}
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
                          onChange={e => this.handleChange(e)}
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
SendNotification.propTypes = {
  groupState: PropTypes.object.isRequired,
  clearPostMessageError: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ postMessage, clearPostMessageError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SendNotification);
