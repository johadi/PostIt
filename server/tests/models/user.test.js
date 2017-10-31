import { assert } from 'chai';
import models from './../../database/models';
import modelSeed from '../seed/models_seed';

describe('User Model', () => {
  before((done) => {
    modelSeed.resetUserDb(modelSeed.userData, done);
  });
  after(modelSeed.emptyUserDb);

  describe('Validations', () => {
    it('should throw validation error if no username is provided',
      (done) => {
        const userInvalidData = { ...modelSeed.userData };
        userInvalidData.username = '';
        models.User.create(userInvalidData)
          .catch((error) => {
            assert.equal(error.errors[0].message, 'Username can\'t be empty');
            done();
          });
      });
    it('should throw validation error if username already exists', (done) => {
      const userInvalidData = { ...modelSeed.userData };
      // we already used this data to create user in our before hook
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This username has been used');
          done();
        });
    });
    it('should throw validation error if no fullname is provided', (done) => {
      const userInvalidData = { ...modelSeed.userData };
      userInvalidData.fullname = '';
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'Fullname can\'t be empty');
          done();
        });
    });
    it('should throw validation error if no email is provided', (done) => {
      const userInvalidData = { ...modelSeed.userData };
      userInvalidData.email = '';
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'Email can\'t be empty');
          done();
        });
    });
    it('should throw validation error if email is already used', (done) => {
      const userInvalidData = { ...modelSeed.userData };
      // since username is used before,
      // to test for email only, we have to change it
      userInvalidData.username = 'ortega';
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'A user with this email already exists');
          done();
        });
    });
    it('should throw validation error if email is invalid', (done) => {
      const userInvalidData = { ...modelSeed.userData };
      userInvalidData.email = 'john.samuel';
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This email is invalid');
          done();
        });
    });
    it('should throw validation error if password is empty', () => {
      const userInvalidData = { ...modelSeed.userData };
      userInvalidData.username = 'samuel';
      userInvalidData.email = 'samuel@email.com';
      userInvalidData.password = ''; // no password
      models.User.create(userInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'Password must be at least 6 characters long');
        });
    });
    it('should throw validation error if password length not up to 6',
      () => {
        const userInvalidData = { ...modelSeed.userData };
        userInvalidData.username = 'batman';
        userInvalidData.email = 'batman@email.com';
        userInvalidData.password = '234'; // no password
        models.User.create(userInvalidData)
          .catch((error) => {
            assert.equal(error.errors[0].message,
              'Password must be at least 6 characters long');
          });
      });
  });
  describe('CRUD operations on user model', () => {
    const userNewData = modelSeed.userNewData;
    it('should CREATE new user', (done) => {
      models.User.create(userNewData)
        .then((createdUser) => {
          assert.equal(createdUser.username, userNewData.username);
          assert.equal(createdUser.fullname, userNewData.fullname);
          assert.equal(createdUser.email, userNewData.email);
          assert.equal(createdUser.mobile, userNewData.mobile);
          done();
        });
    });
    it('should READ data from user model', (done) => {
      models.User.findOne({ where: { username: userNewData.username } })
        .then((foundUser) => {
          assert.equal(foundUser.username, userNewData.username);
          assert.equal(foundUser.fullname, userNewData.fullname);
          assert.equal(foundUser.email, userNewData.email);
          assert.equal(foundUser.mobile, userNewData.mobile);
          done();
        });
    });
    it('should UPDATE data in user model', (done) => {
      const newEmail = 'alisuly@email.com';
      models.User.update(
        { email: newEmail },
        {
          where: { username: userNewData.username },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedUser = result[1].dataValues;
          assert.equal(updatedUser.username, userNewData.username);
          assert.equal(updatedUser.fullname, userNewData.fullname);
          assert.equal(updatedUser.email, newEmail);
          assert.equal(updatedUser.mobile, userNewData.mobile);
          done();
        });
    });
    it('should DELETE data from user model', (done) => {
      models.User.destroy({ where: { username: userNewData.username } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
