import { assert } from 'chai';
import models from './../../database/models';
import modelSeeder from '../seed/modelSeeder';

describe('User Model', () => {
  before((done) => {
    modelSeeder.resetUser(modelSeeder.userDetails, done);
  });

  after(modelSeeder.emptyUser);

  describe('Validations', () => {
    it('should throw validation error if no username is provided',
      (done) => {
        const userInvalidDetails = { ...modelSeeder.userDetails };
        userInvalidDetails.username = '';
        models.User.create(userInvalidDetails)
          .catch((error) => {
            assert.equal(error.errors[0].message, 'Username can\'t be empty');
            done();
          });
      });

    it('should throw validation error if username already exists', (done) => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      // we already used this data to create user in our before hook
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This username has been used');
          done();
        });
    });

    it('should throw validation error if no fullname is provided', (done) => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      userInvalidDetails.fullname = '';
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'Fullname can\'t be empty');
          done();
        });
    });

    it('should throw validation error if no email is provided', (done) => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      userInvalidDetails.email = '';
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'Email can\'t be empty');
          done();
        });
    });

    it('should throw validation error if email is already used', (done) => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      // since username is used before,
      // to test for email only, we have to change it
      userInvalidDetails.username = 'ortega';
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'A user with this email already exists');
          done();
        });
    });

    it('should throw validation error if email is invalid', (done) => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      userInvalidDetails.email = 'john.samuel';
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'This email is invalid');
          done();
        });
    });

    it('should throw validation error if password is empty', () => {
      const userInvalidDetails = { ...modelSeeder.userDetails };
      userInvalidDetails.username = 'samuel';
      userInvalidDetails.email = 'samuel@email.com';
      userInvalidDetails.password = ''; // no password
      models.User.create(userInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'Password must be at least 6 characters long');
        });
    });

    it('should throw validation error if password length not up to 6',
      () => {
        const userInvalidDetails = { ...modelSeeder.userDetails };
        userInvalidDetails.username = 'batman';
        userInvalidDetails.email = 'batman@email.com';
        userInvalidDetails.password = '234'; // no password
        models.User.create(userInvalidDetails)
          .catch((error) => {
            assert.equal(error.errors[0].message,
              'Password must be at least 6 characters long');
          });
      });
  });

  describe('CRUD operations', () => {
    const newUserDetails = modelSeeder.newUserDetails;

    it('Should be able to add new user', (done) => {
      models.User.create(newUserDetails)
        .then((createdUser) => {
          assert.equal(createdUser.username, newUserDetails.username);
          assert.equal(createdUser.fullname, newUserDetails.fullname);
          assert.equal(createdUser.email, newUserDetails.email);
          assert.equal(createdUser.mobile, newUserDetails.mobile);
          done();
        });
    });

    it('Should be able to get user\'s details', (done) => {
      models.User.findOne({ where: { username: newUserDetails.username } })
        .then((foundUser) => {
          assert.equal(foundUser.username, newUserDetails.username);
          assert.equal(foundUser.fullname, newUserDetails.fullname);
          assert.equal(foundUser.email, newUserDetails.email);
          assert.equal(foundUser.mobile, newUserDetails.mobile);
          done();
        });
    });

    it('Should be able to update user\'s details', (done) => {
      const newEmail = 'alisuly@email.com';
      models.User.update(
        { email: newEmail },
        {
          where: { username: newUserDetails.username },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedUser = result[1].dataValues;
          assert.equal(updatedUser.username, newUserDetails.username);
          assert.equal(updatedUser.fullname, newUserDetails.fullname);
          assert.equal(updatedUser.email, newEmail);
          assert.equal(updatedUser.mobile, newUserDetails.mobile);
          done();
        });
    });

    it('Should be able to delete user', (done) => {
      models.User.destroy({ where: { username: newUserDetails.username } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
