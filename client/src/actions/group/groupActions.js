import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

// action for creating group
export const createGroup = name => (dispatch) => {
  axios.post('/api/v1/group', { name },
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        browserHistory.push(`/group/${res.data.id}/add`);
        dispatch({ type: actionTypes.GROUP_CREATE_SUCCESSFUL });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GROUP_CREATE_ERROR,
            payload: err.response.data });
        }
      });
};
// action for adding user to a group
export const addUserToGroup = (groupId, username) => (dispatch) => {
  axios.post(`/api/v1/group/${groupId}/user`, { user: username },
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then(() => {
        dispatch({ type: actionTypes.GROUP_ADD_USER_SUCCESSFUL });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GROUP_ADD_USER_ERROR,
            payload: err.response.data });
        }
      });
};
// action for clearing error when adding user to group
export const addUserToGroupClear = () => ({
  type: actionTypes.ADD_USER_TO_GROUP_CLEAR
});
// action for posting message to a group
export const postMessage = (groupId, message, priority) => (dispatch) => {
  axios.post(`/api/v1/group/${groupId}/message`, { message, priority },
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then(() => {
        browserHistory.push(`/group/${groupId}/board`);
        dispatch({ type: actionTypes.POST_MESSAGE_SUCCESSFUL });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.POST_MESSAGE_ERROR,
            payload: err.response.data });
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
  axios.get(`/api/v1/group/${groupId}/message?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          browserHistory.goBack();
          dispatch({ type: actionTypes.GET_GROUP_MESSAGES_ERROR,
            payload: err.response.data });
        }
      });
};
// action for clearing errors when getting messages
// in a particular group for a user
export const getGroupMessagesClear = () => ({
  type: actionTypes.GET_GROUP_MESSAGES_CLEAR
});
// action for getting all messages in a particular group for a user
export const viewMessage = (groupId, messageId) => (dispatch) => {
  axios.get(`/api/v1/group/${groupId}/message/${messageId}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.VIEW_MESSAGE_SUCCESSFUL,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          browserHistory.goBack();
          dispatch({ type: actionTypes.VIEW_MESSAGE_ERROR,
            payload: 'Error Occurred...Try again' });
        }
      });
};
// action for clearing errors when getting messages
// in a particular group for a user
export const clearViewMessageError = () => ({
  type: actionTypes.CLEAR_VIEW_MESSAGE_ERROR
});
// action for getting all users in a particular group for a user
export const getGroupUsers = groupId => (dispatch) => {
  const page = 0;
  axios.get(`/api/v1/group/${groupId}/group-users?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_GROUP_USERS_SUCCESSFUL,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GET_GROUP_USERS_ERROR,
            payload: err.response.data });
        }
      });
};
// action for clearing errors when getting all users in
// a particular group for a user
export const clearGetGroupUsersError = () => ({
  type: actionTypes.CLEAR_GROUP_USERS_ERROR
});
// action for getting all users in a particular group for a user with pagination
export const getGroupUsersPaginated = (groupId, pageNumber) => (dispatch) => {
  const page = pageNumber || 1;
  axios.get(`/api/v1/group/${groupId}/group-users?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GROUP_USERS_PAGINATED_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GROUP_USERS_PAGINATED_ERROR,
            payload: err.response.data });
        }
      });
};
// action for getting all users in a particular group for a user
export const getUserGroups = () => (dispatch) => {
  const page = 0;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/v1/group/user/groups?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_USER_GROUPS_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GET_USER_GROUPS_ERROR,
            payload: err.response.data });
        }
      });
};
// get groups user belongs to in paginated format
export const getUserGroupsPaginated = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/v1/group/user/groups?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.USER_GROUPS_PAGINATED_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.USER_GROUPS_PAGINATED_ERROR,
            payload: err.response.data });
        }
      });
};
// get messages sent to groups a user belongs paginated
export const getBoardMessagesPaginated = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  axios.get(`/api/v1/group/user/board?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GET_BOARD_MESSAGES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GET_BOARD_MESSAGES_ERROR,
            payload: err.response.data });
        }
      });
};
// get the result of searching users in the application
export const getUsersSearch = (groupId, searchTerm) => (dispatch) => {
  const search = searchTerm || '';
  const id = groupId || 0;
  axios.get(`/api/v1/users?search=${search}&groupId=${id}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.USERS_SEARCH_SUCCESSFUL,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.USERS_SEARCH_ERROR,
            payload: err.response.data });
        }
      });
  // return 1;
};
// get the result of searching users in the application
export const updateReadMessage = messageId => (dispatch) => {
  if (!messageId) {
    browserHistory.goBack();
  }
  axios.post(`/api/v1/group/message-read/${messageId}`, {},
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.MESSAGE_READ_SUCCESSFUL,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.MESSAGE_READ_ERROR,
            payload: err.response.data });
        }
      });
};
