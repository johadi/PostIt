import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

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
export const clearAddUserToGroupError = () => ({
  type: actionTypes.CLEAR_ADD_USER_TO_GROUP_ERROR
});
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
export const clearPostMessageError = () => ({
  type: actionTypes.CLEAR_POST_MESSAGE_ERROR
});
