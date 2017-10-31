import { assert } from 'chai';
import models from './../../database/models';
import modelSeed from '../seed/models_seed';

describe('UserGroupAdd Model', () => {
  before((done) => {
    modelSeed.resetUserAddDb(modelSeed.userAddData, done);
  });
  after(modelSeed.emptyUserAddDb);
  describe('Validations', () => {
    it('should throw validation error if addedById is not provided', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.addedById = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedById can\'t be empty');
        });
    });
    it('should throw validation error if addedById is not a number', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.addedById = 'x';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedById must be a number');
        });
    });
    it('should throw validation error if addedToId is not provided', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.addedToId = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedToId can\'t be empty');
        });
    });
    it('should throw validation error if addedToId is not a number', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.addedToId = 'y';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'addedToId must be a number');
        });
    });
    it('should throw validation error if groupId is not provided', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.groupId = '';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId can\'t be empty');
        });
    });
    it('should throw validation error if groupId is not a number', () => {
      const invalidUserAdd = { ...modelSeed.userAddData };
      invalidUserAdd.groupId = 'z';
      models.UserGroupAdd.create(invalidUserAdd)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId must be a number');
        });
    });
  });
  describe('CRUD operations on userGroupAdd model', () => {
    const newUserAddData = {
      addedToId: 11,
      addedById: 9,
      groupId: 7
    };
    const newGroupId = 8;
    it('should CREATE userGroupAdd data', (done) => {
      models.UserGroupAdd.create(newUserAddData)
        .then((createdUserAdd) => {
          assert.equal(createdUserAdd.addedToId, newUserAddData.addedToId);
          assert.equal(createdUserAdd.addedById, newUserAddData.addedById);
          assert.equal(createdUserAdd.groupId, newUserAddData.groupId);
          done();
        });
    });
    it('should READ data from userGroupAdd model', (done) => {
      models.UserGroupAdd.findOne({ where: { addedToId: newUserAddData.addedToId,
        groupId: newUserAddData.groupId } })
        .then((foundUserAdd) => {
          assert.equal(foundUserAdd.addedToId, newUserAddData.addedToId);
          assert.equal(foundUserAdd.addedById, newUserAddData.addedById);
          assert.equal(foundUserAdd.groupId, newUserAddData.groupId);
          done();
        });
    });
    it('should UPDATE data in userGroupAdd model', (done) => {
      models.UserGroupAdd.update(
        { groupId: newGroupId },
        {
          where: {
            addedToId: newUserAddData.addedToId,
            groupId: newUserAddData.groupId
          },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedUserAdd = result[1].dataValues;
          assert.equal(updatedUserAdd.addedToId, newUserAddData.addedToId);
          assert.equal(updatedUserAdd.addedById, newUserAddData.addedById);
          assert.equal(updatedUserAdd.groupId, newGroupId);
          done();
        });
    });
    it('should DELETE data from userGroupAdd model', (done) => {
      models.UserGroupAdd.destroy({ where: { addedToId: newUserAddData.addedToId,
        groupId: newGroupId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
