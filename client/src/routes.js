import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import AuthPages from './components/auth';
import groupPages from './components/groups';
import IndexPage from './components/IndexPage';
import NotFoundPage from './components/NotFoundPage';

export default (
    <Route path='/' component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="/signup" component={AuthPages.SignupPage}/>
      <Route path="/signin" component={AuthPages.SigninPage}/>
      <Route path="/dashboard" component={groupPages.DashboardPage}/>
      <Route path="/message" component={groupPages.MessageViewPage}/>
      <Route path="/post-message" component={groupPages.PostMessagePage}/>
      <Route path="/group-messages" component={groupPages.GroupMessageBoardPage}/>
      <Route path="/create-group" component={groupPages.CreateGroupPage}/>
      <Route path="/add-user-group" component={groupPages.CreatedGroupAddUserPage}/>
      <Route path="/groups" component={groupPages.GroupsPage}/>
      <Route path="/group-users" component={groupPages.GroupUsersPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
);
