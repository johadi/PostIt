/* eslint-disable import/no-unresolved */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App.jsx';
import auth from './components/auth';
import groupContainers from './components/groups/groupContainers';
import IndexPage from './components/IndexPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="/signup" component={auth.SignupPage}/>
      <Route path="/signin" component={auth.SigninPage}/>
      <Route path="/recover-password"
             component={auth.RecoverPasswordPage}/>
      <Route path="/reset-password"
             component={auth.ResetPasswordPage}/>

      <Route component={groupContainers.AuthenticateUser}>
        <Route path="/dashboard"
               component={groupContainers.DashboardContainer}/>
        <Route path="/message/:groupId/:messageId"
               component={groupContainers.NotificationViewContainer}/>
        <Route path="/group/:groupId/message"
               component={groupContainers.SendNotificationContainer}/>
        <Route path="/group/:groupId/board"
               component={groupContainers.GroupBoardContainer}/>
        <Route path="/create-group"
               component={groupContainers.CreateGroupContainer}/>
        <Route path="/group/:groupId/add"
               component={groupContainers.AddUserGroupContainer}/>
        <Route path="/groups"
               component={groupContainers.GroupsContainer}/>
        <Route path="/group/:groupId/users"
               component={groupContainers.GroupUsersContainer}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
);
