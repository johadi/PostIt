/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

export const signinAction = userCredentials => dispatch =>
  axios.post('/api/v1/user/signin', userCredentials)
      .then((res) => {
        if (res.status !== 200) {
          const payload = 'Something went wrong...Try again';
          dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL, payload });
        }
        const token = res.data; // get the token
        window.sessionStorage.token = token;
        browserHistory.push('/dashboard');
        dispatch({ type: actionTypes.SIGNIN_SUCCESSFUL });
      })
      .catch((err) => {
        if (err.response.data.validateError) {
          dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR,
            payload: err.response.data.validateError });
        } else if (err.response.data === 'Incorrect password') {
          const error = { password: ['Incorrect password'] };
          dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR,
            payload: error });
        } else {
          dispatch({ type: actionTypes.SIGNIN_VALIDATION_ERROR,
            payload: err.response.data.validateError });
          dispatch({ type: actionTypes.SIGNIN_UNSUCCESSFUL,
            payload: err.response.data });
        }
      });

