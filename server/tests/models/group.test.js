import { assert } from 'chai';
import models from './../../database/models';
import modelSeed from '../seed/models_seed';

describe('Group Model', () => {
  before((done) => {
    modelSeed.resetGroupDb(modelSeed.groupData, done);
  });
  after(modelSeed.emptyGroupDb);
  describe('Validations', () => {
    it('should throw validation error if no group name is provided', () => {
      models.Group.create(modelSeed.groupInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'group name can\'t be empty');
        });
    });
    it('should throw validation error if creatorId is not provided', () => {
      modelSeed.groupInvalidData.creatorId = '';
      modelSeed.groupInvalidData.name = 'soccer';
      models.Group.create(modelSeed.groupInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'creatorId can\'t be empty');
        });
    });
    it('should throw validation error if creatorId is not a number', () => {
      modelSeed.groupInvalidData.creatorId = 'x';
      models.Group.create(modelSeed.groupInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'creatorId can only be a number');
        });
    });
  });
  describe('CRUD operations on group model', () => {
    const newGroupData = {
      name: 'phones',
      creatorId: 4
    };
    it('should CREATE group', (done) => {
      models.Group.create(newGroupData)
        .then((createdGroup) => {
          assert.equal(createdGroup.name, newGroupData.name);
          assert.equal(createdGroup.creatorId, newGroupData.creatorId);
          done();
        });
    });
    it('should READ data from group model', (done) => {
      models.Group.findOne({ where: { name: newGroupData.name } })
        .then((foundGroup) => {
          assert.equal(foundGroup.name, newGroupData.name);
          assert.equal(foundGroup.creatorId, newGroupData.creatorId);
          done();
        });
    });
    it('should UPDATE data in group model', (done) => {
      models.Group.update(
        { name: 'music' },
        {
          where: { name: newGroupData.name },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedGroup = result[1].dataValues;
          assert.equal(updatedGroup.name, 'music');
          assert.equal(updatedGroup.creatorId, newGroupData.creatorId);
          done();
        });
    });
    it('should DELETE data from group model', (done) => {
      models.Group.destroy({ where: { creatorId: newGroupData.creatorId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
