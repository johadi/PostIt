import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  welcome: false,
  errors: null,
  fails: null
};
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESSFUL:
      state = {
        ...state,
        success: !!window.sessionStorage.token,
        welcome: !!window.sessionStorage.token,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.SIGNUP_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload // capture validation errors like Email required
      };
      break;
    case actionTypes.SIGNUP_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload // capture all failed responses like User Not Found
      };
      break;
    case actionTypes.CANCEL_MODAL:
      state = {
        ...state,
        welcome: action.payload // falsify to cancel the modal
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signupReducer;
