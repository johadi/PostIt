import actionTypes from '../../actions/actionTypes';

const initialState = {
  error: null,
  addUserErr: null,
  addUserSuccess: false,
  postMessageErr: null,
  groupMessagesErr: null,
  groupMessages: null,
  groupViewMessage: null,
  groupViewMessageErr: null,
  groupUsersStore: null,
  groupUsersError: null,
  userGroupsStore: null,
  userGroupsError: null,
  boardMessagesStore: null,
  boardMessagesError: null,
  usersSearch: null,
  usersSearchErr: null,
  messageRead: false,
  messageReadErr: null
};
/**
 * Reducer function for group related operations
 * @function groupReducer
 * @param {object} state
 * @param {object} action
 * @return {object} state - the new state
 */
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GROUP_SUCCESS:
      state = {
        ...state,
        error: null
      };
      break;
    case actionTypes.CREATE_GROUP_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;
    case actionTypes.ADD_USER_SUCCESSFUL:
      state = {
        ...state,
        addUserErr: null,
        addUserSuccess: true
      };
      break;
    case actionTypes.ADD_USER_ERROR:
      state = {
        ...state,
        addUserSuccess: false,
        addUserErr: action.payload
      };
      break;
    case actionTypes.CLEAR_ADD_USER_ERROR:
      state = {
        ...state,
        addUserSuccess: false,
        addUserErr: null
      };
      break;
    case actionTypes.POST_MESSAGE_SUCCESSFUL:
      state = {
        ...state,
        postMessageErr: null
      };
      break;
    case actionTypes.POST_MESSAGE_ERROR:
      state = {
        ...state,
        postMessageErr: action.payload
      };
      break;
    case actionTypes.CLEAR_POST_MESSAGE_ERROR:
      state = {
        ...state,
        postMessageErr: null
      };
      break;
    case actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL:
      state = {
        ...state,
        groupMessages: action.payload,
        groupMessagesErr: null,
      };
      break;
    case actionTypes.GET_GROUP_MESSAGES_ERROR:
      state = {
        ...state,
        groupMessages: null,
        groupViewMessage: null,
        groupMessagesErr: action.payload
      };
      break;
    case actionTypes.CLEAR_GROUP_MESSAGES_ERROR:
      state = {
        ...state,
        groupMessages: null,
        groupMessagesErr: null
      };
      break;
    case actionTypes.VIEW_MESSAGE_SUCCESSFUL:
      state = {
        ...state,
        groupViewMessage: action.payload,
        groupViewMessageErr: null
      };
      break;
    case actionTypes.VIEW_MESSAGE_ERROR:
      state = {
        ...state,
        groupViewMessage: null,
        groupViewMessageErr: action.payload
      };
      break;
    case actionTypes.CLEAR_VIEW_MESSAGE_ERROR:
      state = {
        ...state,
        groupViewMessage: null,
        groupViewMessageErr: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_SUCCESSFUL:
      state = {
        ...state,
        groupUsersStore: action.payload,
        groupUsersError: null
      };
      break;
    case actionTypes.GET_GROUP_USERS_ERROR:
      state = {
        ...state,
        groupUsersError: action.payload
      };
      break;
    case actionTypes.CLEAR_GROUP_USERS_ERROR:
      state = {
        ...state,
        groupUsersError: null
      };
      break;
    case actionTypes.GROUP_USERS_SUCCESS:
      state = {
        ...state,
        groupUsersStore: action.payload,
        groupUsersError: null
      };
      break;
    case actionTypes.GROUP_USERS_ERROR:
      state = {
        ...state,
        groupUsersStore: null,
        groupUsersError: action.payload
      };
      break;
    case actionTypes.USER_GROUPS_SUCCESS:
      state = {
        ...state,
        userGroupsStore: action.payload,
        userGroupsError: null
      };
      break;
    case actionTypes.USER_GROUPS_ERROR:
      state = {
        ...state,
        userGroupsStore: null,
        userGroupsError: action.payload
      };
      break;
    case actionTypes.BOARD_MESSAGES_SUCCESS:
      state = {
        ...state,
        boardMessagesStore: action.payload,
        boardMessagesError: null
      };
      break;
    case actionTypes.BOARD_MESSAGES_ERROR:
      state = {
        ...state,
        boardMessagesStore: null,
        boardMessagesError: action.payload
      };
      break;
    case actionTypes.CLEAR_BOARD_MESSAGES_ERROR:
      state = {
        ...state,
        boardMessagesStore: null,
        boardMessagesError: null
      };
      break;
    case actionTypes.USERS_SEARCH_SUCCESSFUL:
      state = {
        ...state,
        usersSearch: action.payload,
        usersSearchErr: null
      };
      break;
    case actionTypes.USERS_SEARCH_ERROR:
      state = {
        ...state,
        usersSearch: null,
        usersSearchErr: action.payload
      };
      break;
    case actionTypes.CLEAR_USERS_SEARCH:
      state = {
        ...state,
        usersSearch: null,
        usersSearchErr: null
      };
      break;
    case actionTypes.MESSAGE_READ_SUCCESSFUL:
      state = {
        ...state,
        messageRead: action.payload,
        messageReadErr: null
      };
      break;
    case actionTypes.MESSAGE_READ_ERROR:
      state = {
        ...state,
        messageRead: null,
        messageReadErr: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};
export default groupReducer;
