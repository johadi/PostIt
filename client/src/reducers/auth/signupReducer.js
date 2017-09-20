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
        success: true,
        welcome: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.SIGNUP_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        welcome: false,
        // capture validation errors like Email required
        errors: action.payload
      };
      break;
    case actionTypes.SIGNUP_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        welcome: false,
        // capture all failed responses like User Not Found
        fails: action.payload
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
