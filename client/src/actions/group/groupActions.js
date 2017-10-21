import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

/**
 * Action creator for creating group
 * @function createGroup
 * @param {string} name name of the group
 * @return {void}
 */
export const createGroup = name => dispatch =>
  axios.post('/api/v1/group', { name },
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        browserHistory.push(`/group/${res.data.id}/add`);
        dispatch({ type: actionTypes.CREATE_GROUP_SUCCESS });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.CREATE_GROUP_ERROR,
            payload: err.response.data });
        }
      });
/**
 * Action creator for adding user to a group
 * @function addUserToGroup
 * @param {number} groupId group ID
 * @param {string} username added person's username
 * @return {void}
 */
export const addUserToGroup = (groupId, username) => dispatch =>
  axios.post(`/api/v1/group/${groupId}/user`, { user: username },
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then(() => {
        dispatch({ type: actionTypes.ADD_USER_SUCCESSFUL });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.ADD_USER_ERROR,
            payload: err.response.data });
        }
      });
/**
 * Action creator for clearing error when adding user to group
 * @function clearAddUserError
 * @return {void}
 */
export const clearAddUserError = () => ({
  type: actionTypes.CLEAR_ADD_USER_ERROR
});
/**
 * Action creator for posting message to a group
 * @function postMessage
 * @param {number} groupId group ID
 * @param {string} message message to send to the group
 * @param {string} priority priority level of the message
 * @return {void}
 */
export const postMessage = (groupId, message, priority) => dispatch =>
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
/**
 * Action creator for clearing errors when posting message to a group
 * @function clearMessageError
 * @return {void}
 */
export const clearMessageError = () => ({
  type: actionTypes.CLEAR_POST_MESSAGE_ERROR
});

/**
 * Action creator for getting all messages in a particular group for a user
 * @function getGroupMessages
 * @param {number} groupId group ID
 * @param {number} pageNumber page number since result is paginated
 * @return {void}
 */
export const getGroupMessages = (groupId, pageNumber) => (dispatch) => {
  const page = pageNumber || 1;
  return axios.get(`/api/v1/group/${groupId}/message?page=${page}`,
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

/**
 * Action creator for clearing errors when getting messages
 * in a particular group for a user
 * @function clearGroupMessagesError
 * @return {void}
 */
export const clearGroupMessagesError = () => ({
  type: actionTypes.CLEAR_GROUP_MESSAGES_ERROR
});
/**
 * Action creator for getting all messages in a particular group for a user
 * @function viewMessage
 * @param {number} groupId group ID
 * @param {number} messageId message ID
 * @return {void}
 */
export const viewMessage = (groupId, messageId) => dispatch =>
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
/**
 * Action creator for clearing errors when viewing a message
 * in a particular group for a user
 * @function clearViewMessageError
 * @return {void}
 */
export const clearViewMessageError = () => ({
  type: actionTypes.CLEAR_VIEW_MESSAGE_ERROR
});
/**
 * Action for getting all users in a particular group for a user with pagination
 * @function getGroupUsers
 * @param {number} groupId group ID of the user
 * @param {number} pageNumber page number since result is paginated
 * @return {void}
 */
export const getGroupUsers = (groupId, pageNumber) => (dispatch) => {
  const page = pageNumber || 1;
  return axios.get(`/api/v1/group/${groupId}/group-users?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.GROUP_USERS_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.GROUP_USERS_ERROR,
            payload: err.response.data });
        }
      });
};
/**
 * Action for getting all users in a particular group for a user
 * @function getAllUserGroups
 * @return {void}
 */
export const getAllUserGroups = () => (dispatch) => {
  const page = 0;
  // This will dispatch action that group member side bar can use
  return axios.get(`/api/v1/group/user/groups?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.ALL_USER_GROUPS_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.ALL_USER_GROUPS_ERROR,
            payload: err.response.data });
        }
      });
};
/**
 * Action creator for getting groups user belongs to in paginated format
 * @function getUserGroups
 * @param {number} pageNumber page number since result is paginated
 * @return {void}
 */
export const getUserGroups = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  return axios.get(`/api/v1/group/user/groups?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.USER_GROUPS_SUCCESS,
          payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.USER_GROUPS_ERROR,
            payload: err.response.data });
        }
      });
};
/**
 * Action creator for getting messages sent to groups a user belongs to
 * in a paginated format
 * @function getBoardMessages
 * @param {number} pageNumber page number since result is paginated
 * @return {void}
 */
export const getBoardMessages = pageNumber => (dispatch) => {
  const page = pageNumber || 1;
  // This will dispatch action that group member side bar can use
  return axios.get(`/api/v1/group/user/board?page=${page}`,
    { headers: { 'x-auth': window.sessionStorage.token } })
      .then((res) => {
        dispatch({ type: actionTypes.BOARD_MESSAGES_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        if (err) {
          dispatch({ type: actionTypes.BOARD_MESSAGES_ERROR,
            payload: err.response.data });
        }
      });
};
/**
 * Action creator for getting the result of searching users in the application
 * @function getUsersSearch
 * @param {number} groupId group ID
 * @param {string} searchTerm search term
 * @return {void}
 */
export const getUsersSearch = (groupId, searchTerm) => (dispatch) => {
  const search = searchTerm || '';
  const id = groupId || 0;
  return axios.get(`/api/v1/users?search=${search}&groupId=${id}`,
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
};
/**
 * Action creator for updating message status when a user read a message
 * @function updateReadMessage
 * @param {number} messageId Id of the message
 * @return {void}
 */
export const updateReadMessage = messageId => (dispatch) => {
  if (!messageId) {
    browserHistory.goBack();
  }
  return axios.post(`/api/v1/group/message-read/${messageId}`, {},
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
