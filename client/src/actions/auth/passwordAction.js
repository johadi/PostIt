import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export const recoverPasswordAction = userEmail =>
  dispatch => axios.post('/api/v1/user/recover-password', userEmail)
    .then((res) => {
      if (res.status !== 200) {
        const payload = 'Something went wrong...Try again';
        return dispatch({
          type: actionTypes.RECOVERY_UNSUCCESSFUL,
          payload
        });
      }
      const payload = res.data; // password link sent
      return dispatch({ type: actionTypes.RECOVERY_SUCCESSFUL,
        payload });
    })
    .catch((err) => {
      if (err && err.response.data.validateError) {
        dispatch({
          type: actionTypes.RECOVERY_VALIDATION_ERROR,
          payload: err.response.data.validateError
        });
      } else {
        dispatch({
          type: actionTypes.RECOVERY_VALIDATION_ERROR,
          payload: err.response.data.validateError
        });
        dispatch({
          type: actionTypes.RECOVERY_UNSUCCESSFUL,
          payload: err.response.data
        });
      }
    });
export const resetPasswordAction = (queryParam, passwordDetail) =>
  dispatch => axios.post(`/api/v1/user/reset-password?token=${queryParam}`,
    passwordDetail)
    .then((res) => {
      if (res.status !== 200) {
        const payload = 'Something went wrong...Try again';
        dispatch({
          type: actionTypes.RESET_UNSUCCESSFUL,
          payload
        });
      }
      const payload = res.data; // password changed successfully
      dispatch({ type: actionTypes.RESET_SUCCESSFUL, payload });
    })
    .catch((err) => {
      if (err && err.response.data.validateError) {
        dispatch({
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: err.response.data.validateError
        });
      } else if (err && err.response.data === 'Passwords not matched') {
        // Don't redirect if error is because password is not matched
        dispatch({
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: err.response.data.validateError
        });
        dispatch({
          type: actionTypes.RESET_UNSUCCESSFUL,
          payload: err.response.data
        });
      } else {
        // Redirect user to recover password if any other error
        browserHistory.push('/recover-password');
        dispatch({
          type: actionTypes.RESET_VALIDATION_ERROR,
          payload: err.response.data.validateError
        });
        dispatch({
          type: actionTypes.RESET_UNSUCCESSFUL,
          payload: err.response.data
        });
      }
    });
