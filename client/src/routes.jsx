import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import {
  SignupPage, SigninPage, RecoverPasswordPage, ResetPasswordPage }
  from './components/auth';
import { AuthenticateUser, DashboardContainer, NotificationViewContainer,
  SendNotificationContainer, GroupBoardContainer, CreateGroupContainer,
  AddUserGroupContainer, GroupsContainer, GroupUsersContainer }
  from './components/groups/groupContainers';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="/signup" component={SignupPage}/>
      <Route path="/signin" component={SigninPage}/>
      <Route path="/recover-password"
             component={RecoverPasswordPage}/>
      <Route path="/reset-password"
             component={ResetPasswordPage}/>

      <Route component={AuthenticateUser}>
        <Route path="/dashboard"
               component={DashboardContainer}/>
        <Route path="/message/:groupId/:messageId"
               component={NotificationViewContainer}/>
        <Route path="/group/:groupId/message"
               component={SendNotificationContainer}/>
        <Route path="/group/:groupId/board"
               component={GroupBoardContainer}/>
        <Route path="/create-group"
               component={CreateGroupContainer}/>
        <Route path="/group/:groupId/add"
               component={AddUserGroupContainer}/>
        <Route path="/groups"
               component={GroupsContainer}/>
        <Route path="/group/:groupId/users"
               component={GroupUsersContainer}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
);
