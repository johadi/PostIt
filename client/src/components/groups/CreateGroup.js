import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createGroup} from '../../actions/group/groupActions';

class CreateGroup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isValid: true // to determine if a group field name is not empty
    }
  }
  handleCreateGroup = (e) => {
    e.preventDefault();
    if(this.name.value){
      this.props.createGroup(this.name.value); // calls action creator to create group
      this.setState({isValid: true});
    }else{
      this.setState({isValid: false});
    }

  }

  render() {
    return (
        <div className="col-sm-offset-2 col-sm-8 well well-lg" id="create-group-div">
          <form onSubmit={this.handleCreateGroup} className="form-horizontal" role="form">
            <p className="text-center"><strong>Create Your Group and start adding members</strong></p>
            { !this.state.isValid ? <div className='alert alert-danger alert-dismissible text-center'>Group name required</div> :
                (this.props.groupState.error ? <div className='alert alert-danger alert-dismissible text-center'>
                  {this.props.groupState.error}</div> : null)
            }
            <div className="form-group">
              <div className="col-lg-12">
                <input type="text" name="name" ref={input=>this.name=input} className="form-control input-lg" id="name" placeholder="Enter Group name"/>
              </div>
            </div>

            <div className="form-group">
              <div className="col-md-12">
                <button type="submit" className="btn btn-block btn-post btn-lg">Create Group</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return {
    groupState: state.groupReducer
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ createGroup }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);

