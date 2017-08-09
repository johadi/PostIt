import actionTypes from '../actions/actionTypes';

const initalState = {
  tokenExist: !!window.sessionStorage.token,
  success: false
};
const VerifyTokenReducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_TOKEN:
      state = {
        ...state,
        tokenExist: !!window.sessionStorage.token,
        success: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
export default VerifyTokenReducer;
