import actionTypes from '../actions/actionTypes';

const initalState = {
  tokenExist: false,
  success: false,
  userDetail: null
};
/**
 * Reducer function for verify token related operations
 * @function verifyTokenReducer
 * @param {object} state
 * @param {object} action
 * @return {object} state - the new state
 */
const verifyTokenReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_TOKEN:
      state = {
        ...state,
        tokenExist: !!window.sessionStorage.token,
        success: action.payload.verified,
        userDetail: action.payload.userDetail
      };
      break;
    default:
      return state;
  }
  return state;
};
export default verifyTokenReducer;
