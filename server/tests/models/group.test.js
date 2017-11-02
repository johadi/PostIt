import { assert } from 'chai';
import models from './../../database/models';
import modelSeeder from '../seed/modelSeeder';

describe('Group Model', () => {
  before((done) => {
    modelSeeder.resetGroup(modelSeeder.groupDetails, done);
  });
  after(modelSeeder.emptyGroup);
  describe('Validations', () => {
    it('should throw validation error if no group name is provided', () => {
      models.Group.create(modelSeeder.groupInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'group name can\'t be empty');
        });
    });
    it('should throw validation error if creatorId is not provided', () => {
      modelSeeder.groupInvalidDetails.creatorId = '';
      modelSeeder.groupInvalidDetails.name = 'soccer';
      models.Group.create(modelSeeder.groupInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'creatorId can\'t be empty');
        });
    });
    it('should throw validation error if creatorId is not a number', () => {
      modelSeeder.groupInvalidDetails.creatorId = 'x';
      models.Group.create(modelSeeder.groupInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'creatorId can only be a number');
        });
    });
  });
  describe('CRUD operations on group model', () => {
    const newGroupDetails = {
      name: 'phones',
      creatorId: 4
    };
    it('should CREATE group', (done) => {
      models.Group.create(newGroupDetails)
        .then((createdGroup) => {
          assert.equal(createdGroup.name, newGroupDetails.name);
          assert.equal(createdGroup.creatorId, newGroupDetails.creatorId);
          done();
        });
    });
    it('should READ data from group model', (done) => {
      models.Group.findOne({ where: { name: newGroupDetails.name } })
        .then((foundGroup) => {
          assert.equal(foundGroup.name, newGroupDetails.name);
          assert.equal(foundGroup.creatorId, newGroupDetails.creatorId);
          done();
        });
    });
    it('should UPDATE data in group model', (done) => {
      models.Group.update(
        { name: 'music' },
        {
          where: { name: newGroupDetails.name },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedGroup = result[1].dataValues;
          assert.equal(updatedGroup.name, 'music');
          assert.equal(updatedGroup.creatorId, newGroupDetails.creatorId);
          done();
        });
    });
    it('should DELETE data from group model', (done) => {
      models.Group.destroy({ where: { creatorId: newGroupDetails.creatorId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
