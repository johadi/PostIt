import actionTypes from '../../actions/actionTypes';

const initialState = {
  error: null,
  addUserErr: null,
  addUserSuccess: false,
  postMessageErr: null,
  groupMessagesErr: null,
  groupMessages: null,
  groupViewMessage: null, // hold a single message detail for view
  groupViewMessageErr: null,
  groupUsersStore: null,
  groupUsersError: null,
  groupUsersPaginated: null,
  groupUsersPaginatedErr: null,
  groupsUserBelongs: null,
  groupsUserBelongsErr: null,
  userGroupsPaginated: null,
  userGroupsPaginatedErr: null,
  boardMessagesPaginated: null,
  boardMessagesPaginatedErr: null,
  usersSearch: null,
  usersSearchErr: null,
  messageRead: false,
  messageReadErr: null
};
const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GROUP_CREATE_SUCCESSFUL:
      state = {
        ...state,
        error: null
      };
      break;
    case actionTypes.GROUP_CREATE_ERROR:
      state = {
        ...state,
        error: action.payload
      };
      break;
    case actionTypes.GROUP_ADD_USER_SUCCESSFUL:
      state = {
        ...state,
        addUserErr: null,
        addUserSuccess: true
      };
      break;
    case actionTypes.GROUP_ADD_USER_ERROR:
      state = {
        ...state,
        addUserSuccess: false,
        addUserErr: action.payload
      };
      break;
    case actionTypes.ADD_USER_TO_GROUP_CLEAR:
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
    case actionTypes.GET_GROUP_MESSAGES_CLEAR:
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
    case actionTypes.GROUP_USERS_PAGINATED_SUCCESS:
      state = {
        ...state,
        groupUsersPaginated: action.payload,
        groupUsersPaginatedErr: null
      };
      break;
    case actionTypes.GROUP_USERS_PAGINATED_ERROR:
      state = {
        ...state,
        groupUsersPaginated: null,
        groupUsersPaginatedErr: action.payload
      };
      break;
    case actionTypes.GROUP_USERS_PAGINATED_CLEAR:
      state = {
        ...state,
        groupUsersPaginated: null,
        groupUsersPaginatedErr: null
      };
      break;
    case actionTypes.GET_USER_GROUPS_SUCCESS:
      state = {
        ...state,
        groupsUserBelongs: action.payload,
        groupsUserBelongsErr: null
      };
      break;
    case actionTypes.GET_USER_GROUPS_ERROR:
      state = {
        ...state,
        groupsUserBelongs: null,
        groupsUserBelongsErr: action.payload
      };
      break;
    case actionTypes.GET_USER_GROUPS_CLEAR:
      state = {
        ...state,
        groupsUserBelongs: null,
        groupsUserBelongsErr: null
      };
      break;
    case actionTypes.USER_GROUPS_PAGINATED_SUCCESS:
      state = {
        ...state,
        userGroupsPaginated: action.payload,
        userGroupsPaginatedErr: null
      };
      break;
    case actionTypes.USER_GROUPS_PAGINATED_ERROR:
      state = {
        ...state,
        userGroupsPaginated: null,
        userGroupsPaginatedErr: action.payload
      };
      break;
    case actionTypes.USER_GROUPS_PAGINATED_CLEAR:
      state = {
        ...state,
        userGroupsPaginated: null,
        userGroupsPaginatedErr: null
      };
      break;
    case actionTypes.GET_BOARD_MESSAGES_SUCCESS:
      state = {
        ...state,
        boardMessagesPaginated: action.payload,
        boardMessagesPaginatedErr: null
      };
      break;
    case actionTypes.GET_BOARD_MESSAGES_ERROR:
      state = {
        ...state,
        boardMessagesPaginated: null,
        boardMessagesPaginatedErr: action.payload
      };
      break;
    case actionTypes.CLEAR_BOARD_MESSAGES_ERROR:
      state = {
        ...state,
        boardMessagesPaginated: null,
        boardMessagesPaginatedErr: null
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
    case actionTypes.CLEAR_USERS_SEARCH_ERROR:
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
