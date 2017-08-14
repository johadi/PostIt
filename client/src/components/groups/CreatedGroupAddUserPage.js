import React from 'react';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'react-proptypes';
import {addUserToGroup, clearAddUserToGroupError, getGroupUsers} from '../../actions/group/groupActions';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import CreatedGroupAddUser from './CreatedGroupAddUser';
import groupBackGround from '../../utils/groupPagesBackground';
/**
 * Created Group Add User
 */
class CreatedGroupAddUserPage extends React.Component {
  /**
   * @return {void} void
   */
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }

  /**
   * @return {void} void
   */
  componentWillUnmount(){
    this.props.clearAddUserToGroupError();
  }

  /**
   * handles addUser
   * @param e
   */
  handleAddUser = (e)=>{
    e.preventDefault();
    const username=e.target.id;
    const groupId = this.props.groupId;
    this.props.addUserToGroup(groupId,username);
    this.props.getGroupUsers(this.props.groupId);// necessary here to keep users side bar state
  }

  /**
   * renders component
   * @return {XML} XML/JSX
   */
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
                  groupId={this.props.groupId}
              />
            </div>
            <GroupSideBar groupId={this.props.groupId} users={Users}/>
          </div>
        </div>
    );
  }
}
CreatedGroupAddUserPage.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  getGroupUsers: PropTypes.func.isRequired,
  groupState: PropTypes.object.isRequired,
  clearAddUserToGroupError: PropTypes.func.isRequired
};
const mapStateToProps=(state)=>{
  return {
    groupState: state.groupReducer
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ addUserToGroup, clearAddUserToGroupError, getGroupUsers }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatedGroupAddUserPage);
