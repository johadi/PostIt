import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

// action for creating group
export const createGroup = name => (dispatch) => {
  axios.post('/api/group', { name }, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        browserHistory.push(`/group/${res.data.id}/add`);
        dispatch({ type: actionTypes.GROUP_CREATE_SUCCESSFUL });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          dispatch({ type: actionTypes.GROUP_CREATE_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          dispatch({ type: actionTypes.GROUP_CREATE_ERROR, payload: err.response.data });
        }
      });
};
// action for adding user to a group
export const addUserToGroup = (groupId, username) => (dispatch) => {
  axios.post(`/api/group/${groupId}/user`, { user: username }, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GROUP_ADD_USER_SUCCESSFUL });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          dispatch({ type: actionTypes.GROUP_ADD_USER_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          dispatch({ type: actionTypes.GROUP_ADD_USER_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing error when adding user to group
export const clearAddUserToGroupError = () => ({
  type: actionTypes.CLEAR_ADD_USER_TO_GROUP_ERROR
});
// action for posting message to a group
export const postMessage = (groupId, message) => (dispatch) => {
  axios.post(`/api/group/${groupId}/message`, { message }, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        browserHistory.push(`/group/${groupId}/board`);
        dispatch({ type: actionTypes.POST_MESSAGE_SUCCESSFUL });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          dispatch({ type: actionTypes.POST_MESSAGE_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          dispatch({ type: actionTypes.POST_MESSAGE_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when posting message to a group
export const clearPostMessageError = () => ({
  type: actionTypes.CLEAR_POST_MESSAGE_ERROR
});

// action for getting all messages in a particular group for a user
export const getGroupMessages = groupId => (dispatch) => {
  axios.get(`/api/group/${groupId}/message`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL, payload: res.data });
        // console.log(res.data, groupId);
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_MESSAGES_ERROR, payload: 'Error Occurred...Try again' });
          // console.log(err.response.data.name);
        } else {
          browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_MESSAGES_ERROR, payload: err.response.data });
          // console.log(err.response.data);
        }
      });
};
// action for clearing errors when getting messages in a particular group for a user
export const clearGetGroupMessagesError = () => ({
  type: actionTypes.CLEAR_GET_GROUP_MESSAGES_ERROR
});
// action for getting all messages in a particular group for a user
export const viewMessage = (groupId, messageId) => (dispatch) => {
  axios.get(`/api/group/${groupId}/message/${messageId}`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.VIEW_MESSAGE_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          browserHistory.goBack();
          dispatch({ type: actionTypes.VIEW_MESSAGE_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          browserHistory.goBack();
          dispatch({ type: actionTypes.VIEW_MESSAGE_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when getting messages in a particular group for a user
export const clearViewMessageError = () => ({
  type: actionTypes.CLEAR_VIEW_MESSAGE_ERROR
});
// action for getting all users in a particular group for a user
export const getGroupUsers = groupId => (dispatch) => {
  axios.get(`/api/group/${groupId}/group-users`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUP_USERS_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_USERS_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_USERS_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when getting all users in a particular group for a user
export const clearGetGroupUsersError = () => ({
  type: actionTypes.CLEAR_GET_GROUP_USERS_ERROR
});
// action for getting all users in a particular group for a user
export const getGroupsUserBelongsTo = () => (dispatch) => {
  axios.get('/api/group/user/groups', { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when getting all users in a particular group for a user
export const clearGetGroupsUserBelongsToError = () => ({
  type: actionTypes.CLEAR_GET_GROUPS_USER_BELONGS_TO_ERROR
});
