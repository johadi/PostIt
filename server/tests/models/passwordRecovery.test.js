import { assert } from 'chai';
import db from './../../database/models';
import modelSeed from '../seed/models_seed';

describe('PasswordRecovery Model', () => {
  before((done) => {
    modelSeed.resetPasswordRecoveryDb(modelSeed.passwordRecoveryData, done);
  });
  after(modelSeed.emptyPasswordRecoveryDb);
  describe('Validations', () => {
    it('should throw validation error if no email is provided', (done) => {
      const invalidRecoveryData = { ...modelSeed.passwordRecoveryData };
      invalidRecoveryData.email = '';
      db.PasswordRecovery.create(invalidRecoveryData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'email can\'t be empty');
          done();
        });
    });
    it('should throw validation error if email is invalid', (done) => {
      const invalidRecoveryData = { ...modelSeed.passwordRecoveryData };
      invalidRecoveryData.email = 'jimoh.hadi';
      db.PasswordRecovery.create(invalidRecoveryData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This email is invalid');
          done();
        });
    });
  });
  describe('CRUD operations on passwordRecovery model', () => {
    const newRecoveryData = { ...modelSeed.passwordRecoveryData };
    newRecoveryData.email = 'johadi@mail.com';
    it('should CREATE passwordRecoveryData', (done) => {
      db.PasswordRecovery.create(newRecoveryData)
        .then((createdRecovery) => {
          assert.equal(createdRecovery.email, newRecoveryData.email);
          assert.equal(createdRecovery.hashed, newRecoveryData.hashed);
          done();
        });
    });
    it('should READ data from passwordRecovery model', (done) => {
      db.PasswordRecovery.findOne({ where: { email: newRecoveryData.email } })
        .then((foundRecovery) => {
          assert.equal(foundRecovery.email, newRecoveryData.email);
          assert.equal(foundRecovery.hashed, newRecoveryData.hashed);
          done();
        });
    });
    it('should UPDATE data in passwordRecovery model', (done) => {
      const newHashed = 'xyhhjjsajsjksaksaklkslalksalksalsal';
      db.PasswordRecovery.update(
        { hashed: newHashed },
        {
          where: { email: newRecoveryData.email },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedRecovery = result[1].dataValues;
          assert.equal(updatedRecovery.email, newRecoveryData.email);
          assert.equal(updatedRecovery.hashed, newHashed);
          done();
        });
    });
    it('should DELETE data from passwordRecovery model', (done) => {
      db.PasswordRecovery.destroy({ where: { email: newRecoveryData.email } })
        .then((deletedRows) => {
          assert.equal(deletedRows, 1);
          done();
        });
    });
  });
});
