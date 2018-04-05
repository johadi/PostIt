export default {
  signupInitialState: {
    success: false,
    welcome: false,
    errors: null,
    fails: null
  },
  signinInitialState: {
    success: false,
    errors: null,
    fails: null
  },
  passwordInitialState: {
    message: null,
    success: false,
    errors: null,
    fails: null,
    resetMessage: null,
    resetSuccess: false,
    resetErrors: null,
    resetFails: null
  },
  groupInitialState: {
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
  }
};
