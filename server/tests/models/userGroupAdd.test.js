import { assert } from 'chai';
import models from './../../database/models';
import modelSeeder from '../seed/modelSeeder';

describe('UserGroupAdd Model', () => {
  before((done) => {
    modelSeeder.resetUserGroupAdd(modelSeeder.userGroupAddDetails, done);
  });

  after(modelSeeder.emptyUserGroupAdd);

  describe('Validations', () => {
    it('should throw validation error if addedById is not provided', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.addedById = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedById can\'t be empty');
        });
    });

    it('should throw validation error if addedById is not a number', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.addedById = 'x';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedById must be a number');
        });
    });

    it('should throw validation error if addedToId is not provided', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.addedToId = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedToId can\'t be empty');
        });
    });

    it('should throw validation error if addedToId is not a number', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.addedToId = 'y';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedToId must be a number');
        });
    });

    it('should throw validation error if groupId is not provided', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.groupId = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId can\'t be empty');
        });
    });

    it('should throw validation error if groupId is not a number', () => {
      const invalidUserAdd = { ...modelSeeder.userGroupAddDetails };
      invalidUserAdd.groupId = 'z';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId must be a number');
        });
    });
  });
  describe('CRUD operations on userGroupAdd model', () => {
    const newUserAddDetails = {
      addedToId: 11,
      addedById: 9,
      groupId: 7
    };
    const newGroupId = 8;

    it('should CREATE userGroupAdd data', (done) => {
      models.UserGroupAdd.create(newUserAddDetails)
        .then((createdUserAdd) => {
          assert.equal(createdUserAdd.addedToId, newUserAddDetails.addedToId);
          assert.equal(createdUserAdd.addedById, newUserAddDetails.addedById);
          assert.equal(createdUserAdd.groupId, newUserAddDetails.groupId);
          done();
        });
    });

    it('should READ data from userGroupAdd model', (done) => {
      models.UserGroupAdd.findOne({ where: { addedToId: newUserAddDetails.addedToId,
        groupId: newUserAddDetails.groupId } })
        .then((foundUserAdd) => {
          assert.equal(foundUserAdd.addedToId, newUserAddDetails.addedToId);
          assert.equal(foundUserAdd.addedById, newUserAddDetails.addedById);
          assert.equal(foundUserAdd.groupId, newUserAddDetails.groupId);
          done();
        });
    });

    it('should UPDATE data in userGroupAdd model', (done) => {
      models.UserGroupAdd.update(
        { groupId: newGroupId },
        {
          where: {
            addedToId: newUserAddDetails.addedToId,
            groupId: newUserAddDetails.groupId
          },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedUserAdd = result[1].dataValues;
          assert.equal(updatedUserAdd.addedToId, newUserAddDetails.addedToId);
          assert.equal(updatedUserAdd.addedById, newUserAddDetails.addedById);
          assert.equal(updatedUserAdd.groupId, newGroupId);
          done();
        });
    });

    it('should DELETE data from userGroupAdd model', (done) => {
      models.UserGroupAdd.destroy({ where: { addedToId: newUserAddDetails.addedToId,
        groupId: newGroupId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
