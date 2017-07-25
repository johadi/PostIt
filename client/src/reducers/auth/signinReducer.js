import actionTypes from '../../actions/actionTypes';

const initialState = {
  success: false,
  error: null
};
const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        error: null
      };
      break;
    default:
      return state;
  }
  return state;
};
export default signinReducer;
