import axios from 'axios';
import { browserHistory } from 'react-router';
import actionTypes from '../actionTypes';

/**
 * Action creator for login in a user
 * @function signinAction
 * @param {object} userCredentials user's login  details
 * @return {void}
 */
const signinAction = userCredentials => dispatch =>
  axios.post('/api/v1/user/signin', userCredentials)
      .then((res) => {
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

export default signinAction;
