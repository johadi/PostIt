import { assert } from 'chai';
import models from './../../database/models';

describe('Existing Models', () => {
  it('should check that Group model exists', () => {
    assert.exists(models.Group);
  });

  it('should check that Group model exists', () => {
    assert.exists(models.Message);
  });

  it('should check that Message model exists', () => {
    assert.exists(models.User);
  });

  it('should check that Group model exists', () => {
    assert.exists(models.PasswordRecovery);
  });

  it('should check that UserGroupAdd model exists', () => {
    assert.exists(models.UserGroupAdd);
  });
});
