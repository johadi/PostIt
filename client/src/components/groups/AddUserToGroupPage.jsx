import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import { addUserToGroup, addUserToGroupClear } from '../../actions/group/groupActions';
import '../../build/static/styles/group-custom.scss';
import MainHeader from '../headers/MainHeader.jsx';
import GroupSideBar from './GroupSideBar.jsx';
import AddUserToGroup from './AddUserToGroup.jsx';
/**
 * Created Group Add User
 */
class AddUserToGroupPage extends React.Component {
  /**
   * @return {void} void
   */
  componentWillUnmount() {
    this.props.addUserToGroupClear();
  }

  /**
   * handles addUser
   * @return {void} void
   * @param {object} e
   */
  handleAddUser(e) {
    e.preventDefault();
    const username = e.target.id;
    const groupId = this.props.groupId;
    this.props.addUserToGroup(groupId, username);
  }

  /**
   * renders component
   * @return {XML} XML/JSX
   */
  render() {
    const { name } = this.props.groupUsers;
    return (
        <div className="container">
          <MainHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default"
                 style={{ marginTop: '30px', paddingTop: '20px' }}>
              <AddUserToGroup
                  onAddUser={e => this.handleAddUser(e)}
                  addUserError={this.props.groupState.addUserErr}
                  addUserSuccess={this.props.groupState.addUserSuccess}
                  name={name}
                  groupId={this.props.groupId}
              />
            </div>
            <GroupSideBar groupId={this.props.groupId}/>
          </div>
        </div>
    );
  }
}
AddUserToGroupPage.propTypes = {
  addUserToGroup: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupState: PropTypes.object.isRequired,
  addUserToGroupClear: PropTypes.func.isRequired,
  groupUsers: PropTypes.object
};
const mapStateToProps = state => ({
  groupState: state.groupReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  addUserToGroup, addUserToGroupClear }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserToGroupPage);
