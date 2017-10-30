import { assert } from 'chai';
import db from './../../database/models';

describe('Existing Models', () => {
  it('should check that Group model exists', () => {
    assert.exists(db.Group);
  });
  it('should check that Group model exists', () => {
    assert.exists(db.Message);
  });
  it('should check that Message model exists', () => {
    assert.exists(db.User);
  });
  it('should check that Group model exists', () => {
    assert.exists(db.PasswordRecovery);
  });
  it('should check that UserGroupAdd model exists', () => {
    assert.exists(db.UserGroupAdd);
  });
});
