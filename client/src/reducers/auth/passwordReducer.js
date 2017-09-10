import actionTypes from '../../actions/actionTypes';

const initialState = {
  message: null,
  success: false,
  errors: null,
  fails: null,
  resetMessage: null,
  resetSuccess: false,
  resetErrors: null,
  resetFails: null
};
const passwordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECOVERY_SUCCESSFUL:
      state = {
        ...state,
        message: action.payload,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case actionTypes.RECOVERY_VALIDATION_ERROR:
      state = {
        ...state,
        message: null,
        success: false,
        fails: null,
        errors: action.payload // capture validation errors like Email required
      };
      break;
    case actionTypes.RECOVERY_UNSUCCESSFUL:
      state = {
        ...state,
        message: null,
        success: false,
        errors: null,
        fails: action.payload // capture all failed responses like User Not Found
      };
      break;
    case actionTypes.RESET_SUCCESSFUL:
      state = {
        ...state,
        resetMessage: action.payload,
        resetSuccess: true,
        resetErrors: null,
        resetFails: null
      };
      break;
    case actionTypes.RESET_VALIDATION_ERROR:
      state = {
        ...state,
        resetMessage: null,
        resetSuccess: false,
        resetFails: null,
        resetErrors: action.payload // capture validation errors like Email required
      };
      break;
    case actionTypes.RESET_UNSUCCESSFUL:
      state = {
        ...state,
        resetMessage: null,
        resetSuccess: false,
        resetErrors: null,
        resetFails: action.payload // capture all failed responses like User Not Found
      };
      break;
    default:
      return state;
  }
  return state;
};
export default passwordReducer;
