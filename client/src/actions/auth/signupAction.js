import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export const signupAction = user => (dispatch) => {
  axios.post('/api/user/signup', user)
      .then((res) => {
        if (res.status !== 201) {
          const payload = 'Something went wrong...Try again';
          return dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, payload });
        }
        const token = res.data; // get the token
        window.sessionStorage.setItem('token', token);
        browserHistory.push('/dashboard');
        dispatch({ type: actionTypes.SIGNUP_SUCCESSFUL });
      })
      .catch((err) => {
        if (err.response.data.validateError) {
          dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
            payload: err.response.data.validateError });
        } else if (err.response.data.name === 'SequelizeConnectionError') {
          dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR,
            payload: err.response.data.validateError });
          dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, payload: 'Error connecting to database...Try again' });
        } else {
          dispatch({ type: actionTypes.SIGNUP_VALIDATION_ERROR,
            payload: err.response.data.validateError });
          dispatch({ type: actionTypes.SIGNUP_UNSUCCESSFUL, payload: err.response.data });
        }
      });
};

export const cancelModal = () => ({
  type: actionTypes.CANCEL_MODAL,
  payload: false
});
