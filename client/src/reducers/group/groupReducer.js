import actionTypes from '../../actions/actionTypes';

const initialState = {
  error: null,
  add_user_error: null,
  add_user_success: false,
  post_message_error: null
};
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GROUP_CREATE_SUCCESSFUL:
      state = {
        error: null
      };
      break;
    case actionTypes.GROUP_CREATE_ERROR:
      state = {
        error: action.payload
      };
      break;
    case actionTypes.GROUP_ADD_USER_SUCCESSFUL:
      state = {
        ...state,
        add_user_error: null,
        add_user_success: true
      };
      break;
    case actionTypes.GROUP_ADD_USER_ERROR:
      state = {
        ...state,
        add_user_success: null,
        add_user_error: action.payload
      };
      break;
    case actionTypes.CLEAR_ADD_USER_TO_GROUP_ERROR:
      state = {
        ...state,
        add_user_success: false,
        add_user_error: null
      };
      break;
    case actionTypes.POST_MESSAGE_SUCCESSFUL:
      state = {
        ...state,
        post_message_error: null
      };
      break;
    case actionTypes.POST_MESSAGE_ERROR:
      state = {
        ...state,
        post_message_error: action.payload
      };
      break;
    case actionTypes.CLEAR_POST_MESSAGE_ERROR:
      state = {
        ...state,
        post_message_error: null
      };
      break;
    default:
      return state;
  }
  return state;
};
export default groupReducer;
