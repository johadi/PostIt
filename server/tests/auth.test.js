const request = require('supertest');
const assert = require('chai').assert;

describe('Signup test', () => {
  it('should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {

  });
  it('should return status code 400 and a message if there is an existing username', (done) => {

  });
  it('should return status code 400 and a message if there is an existing email', (done) => {

  });
  it('should return status code 400 and a message if there is an existing mobile number', (done) => {

  });
  it('with valid input, should create a new user account and return status code 201 with some user detail, no password', (done) => {

  });
  it('since the password will be hashed, it should return true if password not equal to password in database', (done) => {

  });
  it('it should verify that there is only one user with this detail in database', (done) => {

  });
});
