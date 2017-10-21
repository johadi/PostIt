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
/**
 * Reducer function for password related operations
 * @function passwordReducer
 * @param {object} state
 * @param {object} action
 * @return {object} state the new state
 */
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
        errors: action.payload
      };
      break;
    case actionTypes.RECOVERY_UNSUCCESSFUL:
      state = {
        ...state,
        message: null,
        success: false,
        errors: null,
        fails: action.payload
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
        resetErrors: action.payload
      };
      break;
    case actionTypes.RESET_UNSUCCESSFUL:
      state = {
        ...state,
        resetMessage: null,
        resetSuccess: false,
        resetErrors: null,
        resetFails: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
export default passwordReducer;
