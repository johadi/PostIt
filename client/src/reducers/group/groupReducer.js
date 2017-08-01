import actionTypes from '../../actions/actionTypes';

const initialState = {
  error: null,
  add_user_error: null,
  add_user_success: false,
  post_message_error: null,
  get_group_messages_error: null,
  group_messages: null,
  group_view_message: null, // hold all messages for individual view
  group_view_message_error: null,
  group_users: null,
  group_users_error: null,
  group_users_pagination: null,
  group_users_pagination_error: null,
  groups_user_belongs: null,
  groups_user_belongs_error: null,
  groups_user_belongs_pagination: null,
  groups_user_belongs_pagination_error: null,
  message_board_messages_pagination: null,
  message_board_messages_pagination_error: null,
  users_search: null,
  users_search_error: null
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
    case actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL:
      state = {
        ...state,
        group_messages: action.payload,
        get_group_messages_error: null,
      };
      break;
    case actionTypes.GET_GROUP_MESSAGES_ERROR:
      state = {
        ...state,
        group_messages: null,
        group_view_message: null,
        get_group_messages_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_GROUP_MESSAGES_ERROR:
      state = {
        ...state,
        group_messages: null,
        get_group_messages_error: null
      };
      break;
    case actionTypes.VIEW_MESSAGE_SUCCESSFUL:
      state = {
        ...state,
        group_view_message: action.payload, // hold all messages to be used in message/:id route
        group_view_message_error: null
      };
      break;
    case actionTypes.VIEW_MESSAGE_ERROR:
      state = {
        ...state,
        group_view_message: null,
        group_view_message_error: action.payload
      };
      break;
    case actionTypes.CLEAR_VIEW_MESSAGE_ERROR:
      state = {
        ...state,
        group_view_message: null,
        group_view_message_error: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_SUCCESSFUL:
      state = {
        ...state,
        group_users: action.payload,
        group_users_error: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_ERROR:
      state = {
        ...state,
        group_users_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_GROUP_USERS_ERROR:
      state = {
        ...state,
        group_users_error: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_PAGINATION_SUCCESSFUL:
      state = {
        ...state,
        group_users_pagination: action.payload,
        group_users_pagination_error: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_PAGINATION_ERROR:
      state = {
        ...state,
        group_users_pagination: null,
        group_users_pagination_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_GROUP_USERS_PAGINATION_ERROR:
      state = {
        ...state,
        group_users_pagination: null,
        group_users_pagination_error: null
      };
      break;
    case actionTypes.GET_GROUPS_USER_BELONGS_TO_SUCCESSFUL:
      state = {
        ...state,
        groups_user_belongs: action.payload,
        groups_user_belongs_error: null
      };
      break;
    case actionTypes.GET_GROUPS_USER_BELONGS_TO_ERROR:
      state = {
        ...state,
        groups_user_belongs: null,
        groups_user_belongs_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_GROUPS_USER_BELONGS_TO_ERROR:
      state = {
        ...state,
        groups_user_belongs: null,
        groups_user_belongs_error: null
      };
      break;
    case actionTypes.GET_GROUPS_USER_BELONGS_TO_PAGINATION_SUCCESSFUL:
      state = {
        ...state,
        groups_user_belongs_pagination: action.payload,
        groups_user_belongs_pagination_error: null
      };
      break;
    case actionTypes.GET_GROUPS_USER_BELONGS_TO_PAGINATION_ERROR:
      state = {
        ...state,
        groups_user_belongs_pagination: null,
        groups_user_belongs_pagination_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_GROUPS_USER_BELONGS_TO_PAGINATION_ERROR:
      state = {
        ...state,
        groups_user_belongs_pagination: null,
        groups_user_belongs_pagination_error: null
      };
      break;
    case actionTypes.GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_SUCCESSFUL:
      state = {
        ...state,
        message_board_messages_pagination: action.payload,
        message_board_messages_pagination_error: null
      };
      break;
    case actionTypes.GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_ERROR:
      state = {
        ...state,
        message_board_messages_pagination: null,
        message_board_messages_pagination_error: action.payload
      };
      break;
    case actionTypes.CLEAR_GET_MESSAGES_OF_MASSAGE_BOARD_PAGINATION_ERROR:
      state = {
        ...state,
        message_board_messages_pagination: null,
        message_board_messages_pagination_error: null
      };
      break;
    case actionTypes.USERS_SEARCH_SUCCESSFUL:
      state = {
        ...state,
        users_search: action.payload,
        users_search_error: null
      };
      break;
    case actionTypes.USERS_SEARCH_ERROR:
      state = {
        ...state,
        users_search: null,
        users_search_error: action.payload
      };
      break;
    case actionTypes.CLEAR_USERS_SEARCH_ERROR:
      state = {
        ...state,
        users_search: null,
        users_search_error: null
      };
      break;
    default:
      return state;
  }
  return state;
};
export default groupReducer;
