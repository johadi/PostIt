import actionTypes from '../../actions/actionTypes';

const initialState = {
  message: null,
  success: false,
  errors: null,
  fails: null,
  reset_message: null,
  reset_success: false,
  reset_errors: null,
  reset_fails: null
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
        reset_message: action.payload,
        reset_success: true,
        reset_errors: null,
        reset_fails: null
      };
      break;
    case actionTypes.RESET_VALIDATION_ERROR:
      state = {
        ...state,
        reset_message: null,
        reset_success: false,
        reset_fails: null,
        reset_errors: action.payload // capture validation errors like Email required
      };
      break;
    case actionTypes.RESET_UNSUCCESSFUL:
      state = {
        ...state,
        reset_message: null,
        reset_success: false,
        reset_errors: null,
        reset_fails: action.payload // capture all failed responses like User Not Found
      };
      break;
    default:
      return state;
  }
  return state;
};
export default passwordReducer;
