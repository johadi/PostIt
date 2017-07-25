import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import AuthPages from './components/auth';
import groupPages from './components/groups/groupAuthentications';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="/signup" component={AuthPages.SignupPage}/>
      <Route path="/signin" component={AuthPages.SigninPage}/>
      <Route component={groupPages.AuthenticateUser}>
        <Route path="/dashboard" component={groupPages.DashboardAuthPage}/>
        <Route path="/message" component={groupPages.MessageViewAuthPage}/>
        <Route path="/post-message" component={groupPages.PostMessageAuthPage}/>
        <Route path="/group-messages" component={groupPages.GroupMessageBoardAuthPage}/>
        <Route path="/create-group" component={groupPages.CreateGroupAuthPage}/>
        <Route path="/add-user-group" component={groupPages.CreatedGroupAddUserAuthPage}/>
        <Route path="/groups" component={groupPages.GroupsAuthPage}/>
        <Route path="/group-users" component={groupPages.GroupUsersAuthPage}/>
      </Route>
      <Route path="*" component={NotFoundPage}/>
    </Route>
);
