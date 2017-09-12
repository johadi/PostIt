import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import signinReducer from '../../../src/reducers/auth/signinReducer';

describe('signinReducer', () => {
  const initialState = {
    success: false,
    errors: null,
    fails: null
  };
  it('should set welcome to true when Type is SIGNIN_SUCCESSFUL', () => {
    const signinDispatch = {
      type: actionTypes.SIGNIN_SUCCESSFUL
    };
    const newState = signinReducer(initialState, signinDispatch);
    expect(newState.fails).toEqual(null);
    expect(newState.errors).toEqual(null);
    expect(newState.success).toEqual(true);
  });

  it('should set value for errors and set success to false when Type ' +
    'is SIGNIN_VALIDATION_ERROR', () => {
    const signinDispatch = {
      type: actionTypes.SIGNIN_VALIDATION_ERROR,
      payload: 'The username field is required'
    };
    const newState = signinReducer(initialState, signinDispatch);
    expect(newState.errors).toEqual(signinDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should set value for fails and set success to false when Type ' +
    'is SIGNIN_UNSUCCESSFUL', () => {
    const signinDispatch = {
      type: actionTypes.SIGNIN_UNSUCCESSFUL,
      payload: 'User not found'
    };
    const newState = signinReducer(initialState, signinDispatch);
    expect(newState.fails).toEqual(signinDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should return initial state if no action is passed', () => {
    const action = {};
    const newState = signinReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});