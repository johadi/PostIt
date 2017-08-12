import {combineReducers} from 'redux';
import signinReducer from './auth/signinReducer';
import signupReducer from './auth/signupReducer';
import groupReducer from './group/groupReducer';
import verifyTokenReducer from './verifyTokenReducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  verifyTokenReducer,
  groupReducer
});
