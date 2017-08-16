import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export const recoverPasswordAction = userEmail => (dispatch) => {
  axios.post('/api/user/recover-password', userEmail)
    .then((res) => {
      if (res.status !== 200) {
        const payload = 'Something went wrong...Try again';
        return dispatch({ type: actionTypes.RECOVERY_UNSUCCESSFUL, payload });
      }
      const payload = res.data; // password link sent
      return dispatch({ type: actionTypes.RECOVERY_SUCCESSFUL, payload });
    })
    .catch((err) => {
      if (err && err.response.data.validateError) {
        dispatch({ type: actionTypes.RECOVERY_VALIDATION_ERROR, payload: err.response.data.validateError });
      } else if (err && err.response.data.name === 'SequelizeConnectionError') {
        dispatch({ type: actionTypes.RECOVERY_VALIDATION_ERROR, payload: err.response.data.validateError });
        dispatch({ type: actionTypes.RECOVERY_UNSUCCESSFUL, payload: 'Error connecting to database...Try again' });
      } else {
        dispatch({ type: actionTypes.RECOVERY_VALIDATION_ERROR, payload: err.response.data.validateError });
        dispatch({ type: actionTypes.RECOVERY_UNSUCCESSFUL, payload: err.response.data });
      }
    });
};
export const resetPasswordAction = (queryParam, passwordDetail) => (dispatch) => {
  axios.post(`/api/user/reset-password?qrp=${queryParam}`, passwordDetail)
    .then((res) => {
      if (res.status !== 200) {
        const payload = 'Something went wrong...Try again';
        return dispatch({ type: actionTypes.RESET_UNSUCCESSFUL, payload });
      }
      const payload = res.data; // password link sent
      dispatch({ type: actionTypes.RESET_SUCCESSFUL, payload });
      return true;
    })
    .catch((err) => {
      if (err && err.response.data.validateError) {
        dispatch({ type: actionTypes.RESET_VALIDATION_ERROR, payload: err.response.data.validateError });
      } else if (err && err.response.data.name === 'SequelizeConnectionError') {
        dispatch({ type: actionTypes.RESET_VALIDATION_ERROR, payload: err.response.data.validateError });
        dispatch({ type: actionTypes.RESET_UNSUCCESSFUL, payload: 'Error connecting to database...Try again' });
      } else {
        dispatch({ type: actionTypes.RESET_VALIDATION_ERROR, payload: err.response.data.validateError });
        dispatch({ type: actionTypes.RESET_UNSUCCESSFUL, payload: err.response.data });
      }
    });
};
