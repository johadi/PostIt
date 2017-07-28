import React from 'react';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addUserToGroup, clearAddUserToGroupError} from '../../actions/group/groupActions';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import CreatedGroupAddUser from './CreatedGroupAddUser';
import groupBackGround from '../../utils/groupPagesBackground';
/**
 * Created Group Add User
 */
class CreatedGroupAddUserPage extends React.Component {
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }
  componentWillUnmount(){
    console.log('About to mount');
    this.props.clearAddUserToGroupError();
  }
  handleAddUser = (e)=>{
    e.preventDefault();
    const username=e.target.id;
    const groupId = this.props.groupId;
    this.props.addUserToGroup(groupId,username);
  }
  render() {
    const {id, name, Users}=this.props.groupUsers;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default"style={{ marginTop: '30px', paddingTop: '20px' }}>
              <CreatedGroupAddUser
                  onAddUser={this.handleAddUser}
                  addUserError={this.props.groupState.add_user_error}
                  addUserSuccess={this.props.groupState.add_user_success}
                  name={name}
              />
            </div>
            <GroupSideBar groupId={this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    groupState: state.groupReducer
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ addUserToGroup, clearAddUserToGroupError }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatedGroupAddUserPage);
