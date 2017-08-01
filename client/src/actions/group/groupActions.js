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
export const postMessage = (groupId, message, priority) => (dispatch) => {
  axios.post(`/api/group/${groupId}/message`, { message, priority }, { headers: { 'x-auth': window.sessionStorage.token } })
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
export const getGroupMessages = (groupId, pageNumber) => (dispatch) => {
  const page = pageNumber || 1;
  axios.get(`/api/group/${groupId}/message?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
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
  const page = 0;
  axios.get(`/api/group/${groupId}/group-users?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
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
// action for getting all users in a particular group for a user with pagination
export const getGroupUsersPagination = (groupId, pageNumber) => (dispatch) => {
  const page = pageNumber || 1;
  axios.get(`/api/group/${groupId}/group-users?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUP_USERS_PAGINATION_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_USERS_PAGINATION_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_USERS_PAGINATION_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when getting all users in a particular group with pagination
export const clearGetGroupUsersPaginationError = () => ({
  type: actionTypes.CLEAR_GET_GROUP_USERS_PAGINATION_ERROR
});
// action for getting all users in a particular group for a user
export const getGroupsUserBelongsTo = () => (dispatch) => {
  const page = 0;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/group/user/groups?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
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
// get groups user belongs to in paginated format
export const getGroupsUserBelongsToPagination = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/group/user/groups?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_PAGINATION_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_PAGINATION_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUPS_USER_BELONGS_TO_PAGINATION_ERROR, payload: err.response.data });
        }
      });
};
// action for clearing errors when getting all users in a particular group for a user by pagination
export const clearGetGroupsUserBelongsToPaginationError = () => ({
  type: actionTypes.CLEAR_GET_GROUPS_USER_BELONGS_TO_PAGINATION_ERROR
});
// get messages sent to groups a user belongs paginated
export const getMessagesOfMessageBoardPagination = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/group/user/board?page=${page}`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_ERROR, payload: err.response.data });
        }
      });
  // return 1;
};
// action for clearing errors when getting all messages sent to user groups by pagination
export const clearGetMessagesOfMessageBoardPaginationError = () => ({
  type: actionTypes.CLEAR_GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_ERROR
});
// get the result of searching users in the application
export const getUsersSearch = (groupId, searchTerm) => (dispatch) => {
  const search = searchTerm || '';
  const id = groupId || 0
  axios.get(`/api/users?search=${search}&groupId=${id}`, { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.USERS_SEARCH_SUCCESSFUL, payload: res.data });
      })
      .catch((err) => {
        if (err.response.data.name === 'SequelizeConnectionError') {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.USERS_SEARCH_ERROR, payload: 'Error Occurred...Try again' });
        } else {
          // browserHistory.goBack();
          dispatch({ type: actionTypes.USERS_SEARCH_ERROR, payload: err.response.data });
        }
      });
  // return 1;
};
// action for clearing errors when getting all messages sent to user groups by pagination
export const clearGetUsersSearchError = () => ({
  type: actionTypes.CLEAR_USERS_SEARCH_ERROR
});
