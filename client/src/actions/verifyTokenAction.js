import { browserHistory } from 'react-router';
import axios from 'axios';
import actionTypes from './actionTypes';

const verifyToken = () => (dispatch) => {
  if (window.sessionStorage.token) {
    axios.get('/api/v1/verify-token',
      { headers: { 'x-auth': window.sessionStorage.token } })
          .then((res) => {
            if (res.status === 200) {
              const payload = {
                verified: !!window.sessionStorage.token,
                userDetail: res.data
              };
              return dispatch({ type: actionTypes.VERIFY_TOKEN, payload });
            }
            // Remove an invalid token if there exists one
            if (window.sessionStorage.token) {
              window.sessionStorage.removeItem('token');
            }
            browserHistory.push('/signin');
            return dispatch({ type: actionTypes.VERIFY_TOKEN,
              payload: false });
          })
          .catch(() => {
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

export default verifyToken;
