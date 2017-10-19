import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import groupReducer from '../../../src/reducers/group/groupReducer';

describe('groupReducer', () => {
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
    groupsUserBelongs: null,
    groupsUserBelongsErr: null,
    userGroupsStore: null,
    userGroupsError: null,
    boardMessagesStore: null,
    boardMessagesError: null,
    usersSearch: null,
    usersSearchErr: null,
    messageRead: false,
    messageReadErr: null
  };
  describe('CREATE GROUP', () => {
    it('should set error to null when Type is GROUP_CREATE_SUCCESSFUL', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_CREATE_SUCCESSFUL
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.error).toEqual(null);
    });

    it('should set value for error when Type is GROUP_CREATE_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_CREATE_ERROR,
        payload: 'The group name is required'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.error).toEqual(groupActionDispatch.payload);
    });
  });
  describe('ADD USER TO GROUP', () => {
    it('should set addUserSuccess to true when Type is GROUP_ADD_USER_SUCCESSFUL', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_ADD_USER_SUCCESSFUL
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.addUserSuccess).toEqual(true);
      expect(newState.addUserErr).toEqual(null);
    });

    it('should set value for addUserErr and set addUserSuccess to false when Type ' +
      'is GROUP_ADD_USER_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_ADD_USER_ERROR,
        payload: 'Username not found'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.addUserErr).toEqual(groupActionDispatch.payload);
      expect(newState.addUserSuccess).toEqual(false);
    });
    it('should clear values for addUserSuccess and addUserErr when Type ' +
      'is ADD_USER_TO_GROUP_CLEAR', () => {
      const groupActionDispatch = {
        type: actionTypes.ADD_USER_TO_GROUP_CLEAR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.addUserSuccess).toEqual(false);
      expect(newState.addUserErr).toEqual(null);
    });
  });
  describe('POST MESSAGE TO GROUP', () => {
    it('should set postMessageErr to null when Type is POST_MESSAGE_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.POST_MESSAGE_SUCCESSFUL
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.postMessageErr).toEqual(null);
      });

    it('should set value for postMessageErr when Type ' +
      'is POST_MESSAGE_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.POST_MESSAGE_ERROR,
        payload: 'Message body cannot be empty'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.postMessageErr).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for postMessageErr when Type ' +
      'is CLEAR_POST_MESSAGE_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.CLEAR_POST_MESSAGE_ERROR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupMessagesErr).toEqual(null);
    });
  });
  describe('GET GROUP MESSAGES', () => {
    it('should set value for groupMessages and set groupMessagesErr ' +
      'to null when Type is GET_GROUP_MESSAGES_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.GET_GROUP_MESSAGES_SUCCESSFUL,
          payload: 'Everyone but us is the enemy'
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.groupMessagesErr).toEqual(null);
        expect(newState.groupMessages).toEqual(groupActionDispatch.payload);
      });

    it('should set value for groupMessageErr when Type ' +
      'is GET_GROUP_MESSAGES_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_GROUP_MESSAGES_ERROR,
        payload: 'Invalid group Id'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupMessagesErr).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for postMessageErr when Type ' +
      'is GET_GROUP_MESSAGES_CLEAR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_GROUP_MESSAGES_CLEAR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupMessagesErr).toEqual(null);
    });
  });
  describe('VIEW A MESSAGE IN A GROUP', () => {
    it('should set value for groupViewMessage and set groupViewMessageErr ' +
      'to null when Type is VIEW_MESSAGE_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.VIEW_MESSAGE_SUCCESSFUL,
          payload: 'Everyone but us is the enemy'
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.groupViewMessageErr).toEqual(null);
        expect(newState.groupViewMessage).toEqual(groupActionDispatch.payload);
      });

    it('should set value for groupViewMessageErr when Type ' +
      'is VIEW_MESSAGE_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.VIEW_MESSAGE_ERROR,
        payload: 'Invalid group Id'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupViewMessageErr).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for groupViewMessageErr when Type ' +
      'is CLEAR_VIEW_MESSAGE_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.CLEAR_VIEW_MESSAGE_ERROR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupViewMessageErr).toEqual(null);
    });
  });
  describe('GET USERS IN A GROUP', () => {
    it('should set value for groupUsersStore and set groupUsersError ' +
      'to null when Type is GET_GROUP_USERS_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.GET_GROUP_USERS_SUCCESSFUL,
          payload: ['johadi', 'Rasheed']
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.groupUsersError).toEqual(null);
        expect(newState.groupUsersStore).toEqual(groupActionDispatch.payload);
      });

    it('should set value for groupUsersError when Type ' +
      'is GET_GROUP_USERS_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_GROUP_USERS_ERROR,
        payload: 'Invalid group'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupUsersError).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for groupUsersError when Type ' +
      'is CLEAR_GROUP_USERS_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.CLEAR_GROUP_USERS_ERROR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupUsersError).toEqual(null);
    });
  });
  describe('GET USERS IN A GROUP PAGINATED', () => {
    it('should set value for groupUsersStore and set groupUsersError ' +
      'to null when Type is GROUP_USERS_PAGINATED_SUCCESS',
      () => {
        const groupActionDispatch = {
          type: actionTypes.GROUP_USERS_PAGINATED_SUCCESS,
          payload: ['johadi', 'Rasheed']
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.groupUsersError).toEqual(null);
        expect(newState.groupUsersStore).toEqual(groupActionDispatch.payload);
      });

    it('should set value for groupUsersError when Type ' +
      'is GROUP_USERS_PAGINATED_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_USERS_PAGINATED_ERROR,
        payload: 'Invalid group'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupUsersError).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for groupUsersError when Type ' +
      'is GROUP_USERS_PAGINATED_CLEAR', () => {
      const groupActionDispatch = {
        type: actionTypes.GROUP_USERS_PAGINATED_CLEAR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupUsersError).toEqual(null);
    });
  });
  describe('GET GROUPS OF A USER', () => {
    it('should set value for groupsUserBelongs and set groupsUserBelongsErr ' +
      'to null when Type is GET_USER_GROUPS_SUCCESS',
      () => {
        const groupActionDispatch = {
          type: actionTypes.GET_USER_GROUPS_SUCCESS,
          payload: ['sport', 'music']
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.groupsUserBelongsErr).toEqual(null);
        expect(newState.groupsUserBelongs).toEqual(groupActionDispatch.payload);
      });

    it('should set value for groupsUserBelongsdErr when Type ' +
      'is GET_USER_GROUPS_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_USER_GROUPS_ERROR,
        payload: 'You are not a member of this group'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupsUserBelongsErr).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for groupsUserBelongsErr when Type ' +
      'is GET_USER_GROUPS_CLEAR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_USER_GROUPS_CLEAR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.groupsUserBelongsErr).toEqual(null);
    });
  });
  describe('GET GROUPS OF A USER PAGINATED', () => {
    it('should set value for userGroupsStore and set userGroupsError ' +
      'to null when Type is USER_GROUPS_PAGINATED_SUCCESS',
      () => {
        const groupActionDispatch = {
          type: actionTypes.USER_GROUPS_PAGINATED_SUCCESS,
          payload: ['sport', 'music']
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.userGroupsError).toEqual(null);
        expect(newState.userGroupsStore).toEqual(groupActionDispatch.payload);
      });

    it('should set value for userGroupsError when Type ' +
      'is USER_GROUPS_PAGINATED_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.USER_GROUPS_PAGINATED_ERROR,
        payload: 'You are not a member of this group'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.userGroupsError).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for userGroupsError when Type ' +
      'is USER_GROUPS_PAGINATED_CLEAR', () => {
      const groupActionDispatch = {
        type: actionTypes.USER_GROUPS_PAGINATED_CLEAR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.userGroupsError).toEqual(null);
    });
  });
  describe('GET MESSAGES FOR MESSAGE BOARD', () => {
    it('should set value for boardMessagesStore and set ' +
      'boardMessagesError to null when Type is GET_BOARD_MESSAGES_SUCCESS',
      () => {
        const groupActionDispatch = {
          type: actionTypes.GET_BOARD_MESSAGES_SUCCESS,
          payload: ['Hello young man', 'Who is young man ?']
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.boardMessagesError).toEqual(null);
        expect(newState.boardMessagesStore).toEqual(groupActionDispatch.payload);
      });

    it('should set value for boardMessagesError when Type ' +
      'is GET_BOARD_MESSAGES_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.GET_BOARD_MESSAGES_ERROR,
        payload: 'error occurred retrieving messages'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.boardMessagesError).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for boardMessagesError when Type ' +
      'is CLEAR_BOARD_MESSAGES_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.CLEAR_BOARD_MESSAGES_ERROR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.boardMessagesError).toEqual(null);
    });
  });
  describe('GET SEARCH RESULT OF USERS', () => {
    it('should set value for usersSearch and set usersSearchErr ' +
      'to null when Type is USERS_SEARCH_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.USERS_SEARCH_SUCCESSFUL,
          payload: [{ fullname: 'Jimoh Hadi', email: 'johadi@gmail.com' },
            { fullname: 'Jimoh obansa', email: 'obansa@gmail.com' }]
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.usersSearchErr).toEqual(null);
        expect(newState.usersSearch).toEqual(groupActionDispatch.payload);
      });

    it('should set value for usersSearchErr when Type ' +
      'is USERS_SEARCH_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.USERS_SEARCH_ERROR,
        payload: 'error occurred while trying to get users'
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.usersSearchErr).toEqual(groupActionDispatch.payload);
    });
    it('should clear values for usersSearchErr when Type ' +
      'is CLEAR_USERS_SEARCH_ERROR', () => {
      const groupActionDispatch = {
        type: actionTypes.CLEAR_USERS_SEARCH_ERROR,
      };
      const newState = groupReducer(initialState, groupActionDispatch);
      expect(newState.usersSearchErr).toEqual(null);
    });
  });
  describe('STATUS WHEN MESSAGE IS READ', () => {
    it('should set value for messageRead and set messageReadErr ' +
      'to null when Type is MESSAGE_READ_SUCCESSFUL',
      () => {
        const groupActionDispatch = {
          type: actionTypes.MESSAGE_READ_SUCCESSFUL,
          payload: true
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.messageReadErr).toEqual(null);
        expect(newState.messageRead).toEqual(groupActionDispatch.payload);
      });

    it('should set value for messageReadErr when Type is MESSAGE_READ_ERROR',
      () => {
        const groupActionDispatch = {
          type: actionTypes.MESSAGE_READ_ERROR,
          payload: 'message Id cannot be found'
        };
        const newState = groupReducer(initialState, groupActionDispatch);
        expect(newState.messageReadErr).toEqual(groupActionDispatch.payload);
      });
  });
  it('should return initial state if no action is passed', () => {
    const action = {};
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
