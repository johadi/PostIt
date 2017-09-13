/* eslint-disable import/extensions, import/no-unresolved */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import AuthPages from './components/auth';
import groupPages from './components/groups/groupContainers';
import IndexPage from './components/IndexPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="/signup" component={AuthPages.SignupPage}/>
      <Route path="/signin" component={AuthPages.SigninPage}/>
      <Route path="/recover-password" component={AuthPages.RecoverPasswordPage}/>
      <Route path="/reset-password" component={AuthPages.ResetPasswordPage}/>

      <Route component={groupPages.AuthenticateUser}>
        <Route path="/dashboard"
               component={groupPages.DashboardContainer}/>
        <Route path="/message/:groupId/:messageId"
               component={groupPages.NotificationViewContainer}/>
        <Route path="/group/:groupId/message"
               component={groupPages.SendNotificationContainer}/>
        <Route path="/group/:groupId/board"
               component={groupPages.GroupBoardContainer}/>
        <Route path="/create-group"
               component={groupPages.CreateGroupContainer}/>
        <Route path="/group/:groupId/add"
               component={groupPages.AddUserGroupContainer}/>
        <Route path="/groups"
               component={groupPages.GroupsContainer}/>
        <Route path="/group/:groupId/users"
               component={groupPages.GroupUsersContainer}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
);
