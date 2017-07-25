import { browserHistory } from 'react-router';
import axios from 'axios';
import actionTypes from './actionTypes';

export const verifyToken = () => (dispatch) => {
  if (window.sessionStorage.token) {
    axios.get('/api/verify-token', { headers: { 'x-auth': window.sessionStorage.token } })
          .then((res) => {
            if (res.status === 200) {
              return dispatch({ type: actionTypes.VERIFY_TOKEN, payload: !!window.sessionStorage.token });
            }
            // window.location.href = '/signin';
            browserHistory.push('/signin');
            return dispatch({ type: actionTypes.VERIFY_TOKEN, payload: false });
          })
          .catch((err) => {
            // window.location.href = '/signin';
            browserHistory.push('/signin');
            return dispatch({ type: actionTypes.VERIFY_TOKEN, payload: false });
          });
  } else {
      // window.location.href = '/signin';
    browserHistory.push('/signin');
    return dispatch({ type: actionTypes.VERIFY_TOKEN, payload: false });
  }
};
