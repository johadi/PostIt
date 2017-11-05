import expect from 'expect';
import actionTypes from '../../../src/actions/actionTypes';
import signUpReducer from '../../../src/reducers/auth/signupReducer';
import { signupInitialState } from '../../seeds/reducersSeeder';

describe('signUpReducer', () => {
  // initial state
  const initialState = signupInitialState;
  it('should set welcome to true when Type is SIGNUP_SUCCESSFUL', () => {
    const signUpDispatch = {
      type: actionTypes.SIGNUP_SUCCESSFUL
    };
    const newState = signUpReducer(initialState, signUpDispatch);
    expect(newState.fails).toEqual(null);
    expect(newState.errors).toEqual(null);
    expect(newState.success).toEqual(true);
    expect(newState.welcome).toEqual(true);
  });

  it('should set value for errors and set success to false when Type ' +
    'is SIGNUP_VALIDATION_ERROR', () => {
    const signUpDispatch = {
      type: actionTypes.SIGNUP_VALIDATION_ERROR,
      payload: 'The username field is required'
    };
    const newState = signUpReducer(initialState, signUpDispatch);
    expect(newState.errors).toEqual(signUpDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should set value for fails and set success to false when Type ' +
    'is SIGNUP_UNSUCCESSFUL', () => {
    const signUpDispatch = {
      type: actionTypes.SIGNUP_UNSUCCESSFUL,
      payload: 'This email has already been used'
    };
    const newState = signUpReducer(initialState, signUpDispatch);
    expect(newState.fails).toEqual(signUpDispatch.payload);
    expect(newState.success).toEqual(false);
  });
  it('should set welcome to false when Type is CANCEL_MODAL', () => {
    const signUpDispatch = {
      type: actionTypes.CANCEL_MODAL,
      payload: false
    };
    // SIGNUP_SUCCESSFUL has already changed welcome to true
    initialState.welcome = true;
    const newState = signUpReducer(initialState, signUpDispatch);
    expect(newState.welcome).toEqual(signUpDispatch.payload);
  });
  it('should return initial state if no action is passed', () => {
    const action = {};
    const newState = signUpReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
