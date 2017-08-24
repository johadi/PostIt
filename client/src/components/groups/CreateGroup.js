import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/group/groupActions';

/**
 * CreateGroup class declaration
 */
export class CreateGroup extends React.Component {
  /**
   * class constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isValid: true // to determine if a group field name is not empty
    };
  }

  /**
   * handle create Group
   * @return {void} void
   * @param {e} e
   */
  handleCreateGroup(e) {
    e.preventDefault();
    if (this.name.value) {
      this.props.createGroup(this.name.value); // calls action creator to create group
      this.setState({ isValid: true });
    } else {
      this.setState({ isValid: false });
    }
  }

  /**
   * renders the component
   * @return {XML} XML/JSX
   */
  render() {
    return (
        <div className="col-sm-offset-2 col-sm-8 well well-lg" id="create-group-div">
          <form onSubmit={e => this.handleCreateGroup(e)} className="form-horizontal" role="form">
            <p className="text-center"><strong>Create Your Group and start adding members</strong></p>
            { !this.state.isValid ? <div className='alert alert-danger alert-dismissible text-center'>Group name required</div> :
                (this.props.groupState.error ? <div className='alert alert-danger alert-dismissible text-center'>
                  {this.props.groupState.error}</div> : null)
            }
            <div className="form-group">
              <div className="col-lg-12">
                <input type="text" name="name" ref={input => this.name = input} className="form-control input-lg" id="name" placeholder="Enter Group name"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-12">
                <button type="submit" className="btn btn-block btn-post btn-lg">Create group</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
CreateGroup.propTypes = {
  groupState: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ createGroup }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

