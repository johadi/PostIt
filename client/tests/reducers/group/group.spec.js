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
  it('should return initial state if no action is passed', () => {
    const action = {};
    const newState = groupReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});