import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  errors: null,
  fails: null
};
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: !!window.sessionStorage.token,
        errors: null, // clears all errors
        fails: null
      };
      break;
    case actionTypes.SIGNIN_VALIDATION_ERROR:
      state = {
        ...state,
        success: false,
        errors: action.payload // capture validation errors like Username required
      };
      break;
    case actionTypes.SIGNIN_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload // capture all failed responses like User Not Found
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signinReducer;
