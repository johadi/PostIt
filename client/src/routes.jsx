/* eslint-disable import/extensions, import/no-unresolved */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import AuthPages from './components/auth';
import groupPages from './components/groups/groupAuthentications';
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
        <Route path="/dashboard" component={groupPages.DashboardAuthPage}/>
        <Route path="/message/:groupId/:messageId" component={groupPages.NotificationViewAuthPage}/>
        <Route path="/group/:groupId/message" component={groupPages.SendNotificationAuthPage}/>
        <Route path="/group/:groupId/board" component={groupPages.GroupNotificationBoardAuth}/>
        <Route path="/create-group" component={groupPages.CreateGroupAuthPage}/>
        <Route path="/group/:groupId/add" component={groupPages.AddUserGroupAuth}/>
        <Route path="/groups" component={groupPages.GroupsAuthPage}/>
        <Route path="/group/:groupId/users" component={groupPages.GroupUsersAuthPage}/>
      </Route>
       <Route path="*" component={NotFoundPage}/>
    </Route>
);
