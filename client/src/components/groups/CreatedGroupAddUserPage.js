import React from 'react';
import { Link } from 'react-router';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import GroupSideBar from './GroupSideBar';
import CreatedGroupAddUser from './CreatedGroupAddUser';
import groupBackGround from '../../utils/groupPagesBackground';
/**
 * Created Group Add User
 */
export default class CreatedGroupAddUserPage extends React.Component {
  componentDidMount() {
    groupBackGround(); // Change background of pages to suit user pages
  }
  render() {
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default"style={{ marginTop: '30px', paddingTop: '20px' }}>
              <CreatedGroupAddUser/>
            </div>
            <GroupSideBar/>
          </div>
        </div>
    );
  }
}

