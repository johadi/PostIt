import { combineReducers } from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import passwordReducer from './auth/passwordReducer';
import groupReducer from './group/groupReducer';
import verifyTokenReducer from './verifyTokenReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  verifyTokenReducer,
  groupReducer,
  passwordReducer
});
