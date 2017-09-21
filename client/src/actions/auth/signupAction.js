import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export const signupAction = user => dispatch =>
  axios.post('/api/v1/user/signup', user)
    .then((res) => {
      if (res.status !== 201) {
        const payload = 'Something went wrong...Try again';
        dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, payload });
      }
      const token = res.data; // get the token
      window.sessionStorage.token = token;
      browserHistory.push('/dashboard');
      dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL });
    })
    .catch((err) => {
      if (err.response.data.validateError) {
        dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: err.response.data.validateError });
      } else {
        dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
          payload: err.response.data.validateError });
        dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL,
          payload: err.response.data });
      }
    });

export const cancelModal = () => ({
  type: actionTypes.CANCEL_MODAL,
  payload: false
});
