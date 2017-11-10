import { assert } from 'chai';
import models from './../../database/models';
import modelSeeder from '../seed/modelSeeder';

describe('PasswordRecovery Model', () => {
  before((done) => {
    modelSeeder.resetPasswordRecovery(modelSeeder.passwordRecoveryDetails, done);
  });

  after(modelSeeder.emptyPasswordRecovery);

  describe('Validations', () => {
    it('Should throw validation error if no email is provided', (done) => {
      const invalidRecoveryDetails = { ...modelSeeder.passwordRecoveryDetails };
      invalidRecoveryDetails.email = '';
      models.PasswordRecovery.create(invalidRecoveryDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'email can\'t be empty');
          done();
        });
    });

    it('Should throw validation error if email is invalid', (done) => {
      const invalidRecoveryDetails = { ...modelSeeder.passwordRecoveryDetails };
      invalidRecoveryDetails.email = 'jimoh.hadi';
      models.PasswordRecovery.create(invalidRecoveryDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This email is invalid');
          done();
        });
    });
  });

  describe('CRUD operations', () => {
    const newRecoveryDetails = { ...modelSeeder.passwordRecoveryDetails };
    newRecoveryDetails.email = 'johadi@mail.com';

    it('Should be able to add new password recovery details', (done) => {
      models.PasswordRecovery.create(newRecoveryDetails)
        .then((createdRecovery) => {
          assert.equal(createdRecovery.email, newRecoveryDetails.email);
          assert.equal(createdRecovery.hashed, newRecoveryDetails.hashed);
          done();
        });
    });

    it('Should be able to get password recovery details', (done) => {
      models.PasswordRecovery.findOne({ where: { email: newRecoveryDetails.email } })
        .then((foundRecovery) => {
          assert.equal(foundRecovery.email, newRecoveryDetails.email);
          assert.equal(foundRecovery.hashed, newRecoveryDetails.hashed);
          done();
        });
    });

    it('Should be able to update password recovery details', (done) => {
      const newHashed = 'xyhhjjsajsjksaksaklkslalksalksalsal';
      models.PasswordRecovery.update(
        { hashed: newHashed },
        {
          where: { email: newRecoveryDetails.email },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedRecovery = result[1].dataValues;
          assert.equal(updatedRecovery.email, newRecoveryDetails.email);
          assert.equal(updatedRecovery.hashed, newHashed);
          done();
        });
    });

    it('Should be able to delete password recovery details', (done) => {
      models.PasswordRecovery.destroy({ where: { email: newRecoveryDetails.email } })
        .then((deletedRows) => {
          assert.equal(deletedRows, 1);
          done();
        });
    });
  });
});
