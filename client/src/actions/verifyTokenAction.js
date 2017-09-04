import { browserHistory } from 'react-router';
import axios from 'axios';
import actionTypes from './actionTypes';

export const verifyToken = () => (dispatch) => {
  if (window.sessionStorage.token) {
    axios.get('/api/verify-token',
      { headers: { 'x-auth': window.sessionStorage.token } })
          .then((res) => {
            if (res.status === 200) {
              return dispatch({ type: actionTypes.VERIFY_TOKEN,
                payload: !!window.sessionStorage.token });
            }
            // Remove an invalid token if there exists one
            if (window.sessionStorage.token) {
              window.sessionStorage.removeItem('token');
            }
            browserHistory.push('/signin');
            return dispatch({ type: actionTypes.VERIFY_TOKEN,
              payload: false });
          })
          .catch((err) => {
            // Remove an invalid token if there exists one
            if (window.sessionStorage.token) {
              window.sessionStorage.removeItem('token');
            }
            browserHistory.push('/signin');
            return dispatch({ type: actionTypes.VERIFY_TOKEN,
              payload: false });
          });
  } else {
    browserHistory.push('/signin');
    return dispatch({ type: actionTypes.VERIFY_TOKEN,
      payload: false });
  }
};
