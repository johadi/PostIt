import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import passwordReducer from '../../../src/reducers/auth/passwordReducer';

describe('passwordReducer', () => {
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
  it('should set welcome to true when Type is RECOVERY_SUCCESSFUL', () => {
    const passwordDispatch = {
      type: actionTypes.RECOVERY_SUCCESSFUL,
      payload: 'Password recovery link sent to your email'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.message).toEqual(passwordDispatch.payload);
    expect(newState.success).toEqual(true);
    expect(newState.fails).toEqual(null);
    expect(newState.errors).toEqual(null);
  });

  it('should set value for errors and set success to false when Type ' +
    'is RECOVERY_VALIDATION_ERROR', () => {
    const passwordDispatch = {
      type: actionTypes.RECOVERY_VALIDATION_ERROR,
      payload: 'The email field is required'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.errors).toEqual(passwordDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should set value for fails and set success to false when Type ' +
    'is RECOVERY_UNSUCCESSFUL', () => {
    const passwordDispatch = {
      type: actionTypes.RECOVERY_UNSUCCESSFUL,
      payload: 'This email doesn\'t match our records'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.fails).toEqual(passwordDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should set welcome to true when Type is RESET_SUCCESSFUL', () => {
    const passwordDispatch = {
      type: actionTypes.RESET_SUCCESSFUL,
      payload: 'Password changed successfully'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.resetMessage).toEqual(passwordDispatch.payload);
    expect(newState.resetFails).toEqual(null);
    expect(newState.resetErrors).toEqual(null);
    expect(newState.resetSuccess).toEqual(true);
  });

  it('should set value for errors and set success to false when Type ' +
    'is RESET_VALIDATION_ERROR', () => {
    const passwordDispatch = {
      type: actionTypes.RESET_VALIDATION_ERROR,
      payload: 'The password field is required'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.resetErrors).toEqual(passwordDispatch.payload);
    expect(newState.resetSuccess).toEqual(false);
  });
  it('should set value for fails and set success to false when Type ' +
    'is RESET_UNSUCCESSFUL', () => {
    const passwordDispatch = {
      type: actionTypes.RESET_UNSUCCESSFUL,
      payload: 'Passwords not matched'
    };
    const newState = passwordReducer(initialState, passwordDispatch);
    expect(newState.resetFails).toEqual(passwordDispatch.payload);
    expect(newState.resetSuccess).toEqual(false);
  });
  it('should return initial state if no action is passed', () => {
    const action = {};
    const newState = passwordReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});