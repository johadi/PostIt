import { assert } from 'chai';
import db from './../../database/models';
import modelSeed from '../seed/models_seed';

describe('Message Model', () => {
  before((done) => {
    modelSeed.resetMessageDb(modelSeed.messageData, done);
  });
  after(modelSeed.emptyMessageDb);

  describe('Validations', () => {
    it('should throw validation error if no message body provided',
      (done) => {
        const messageInvalidData = { ...modelSeed.messageData };
        messageInvalidData.body = '';
        db.Message.create(messageInvalidData)
          .catch((error) => {
            assert.equal(error.errors[0].message,
              'Message body can\' be empty');
            done();
          });
      });
    it('should throw validation error if userId is not provided', () => {
      const messageInvalidData = { ...modelSeed.messageData };
      messageInvalidData.userId = '';
      db.Message.create(messageInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'userId can\'t be empty');
        });
    });
    it('should throw validation error if userId is not a number', () => {
      const messageInvalidData = { ...modelSeed.messageData };
      messageInvalidData.userId = 'y';
      db.Message.create(messageInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'userId must be a number');
        });
    });
    it('should throw validation error if groupId is not provided', () => {
      const messageInvalidData = { ...modelSeed.messageData };
      messageInvalidData.groupId = '';
      db.Message.create(messageInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId can\'t be empty');
        });
    });
    it('should throw validation error if groupId is not a number', () => {
      const messageInvalidData = { ...modelSeed.messageData };
      messageInvalidData.groupId = 'q';
      db.Message.create(messageInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId must be a number');
        });
    });
    it('should throw validation error if priority is neither normal, ' +
      'urgent nor critical', () => {
      const messageInvalidData = { ...modelSeed.messageData };
      messageInvalidData.priority = 'abnormal';
      db.Message.create(messageInvalidData)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'priority must be normal, urgent or critical');
        });
    });
  });
  describe('CRUD operations on message model', () => {
    const messageValidData = modelSeed.messageData;
    let messageId;
    it('should CREATE message', (done) => {
      db.Message.create(messageValidData)
        .then((createdMessage) => {
          messageId = createdMessage.id;
          assert.equal(createdMessage.body, messageValidData.body);
          assert.equal(createdMessage.userId, messageValidData.userId);
          assert.equal(createdMessage.groupId, messageValidData.groupId);
          assert.equal(createdMessage.priority, messageValidData.priority);
          assert.deepEqual(createdMessage.readersId, messageValidData.readersId);
          done();
        });
    });
    it('should READ data from message model', (done) => {
      db.Message.findById(messageId)
        .then((foundMessage) => {
          assert.equal(foundMessage.id, messageId);
          assert.equal(foundMessage.body, messageValidData.body);
          assert.equal(foundMessage.userId, messageValidData.userId);
          assert.equal(foundMessage.groupId, messageValidData.groupId);
          assert.equal(foundMessage.priority, messageValidData.priority);
          assert.deepEqual(foundMessage.readersId, messageValidData.readersId);
          done();
        });
    });
    it('should UPDATE data in message model', (done) => {
      db.Message.update(
        { body: 'no man is an island' },
        {
          where: { id: messageId },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedMessage = result[1].dataValues;
          assert.equal(updatedMessage.id, messageId);
          assert.equal(updatedMessage.body, 'no man is an island');
          assert.equal(updatedMessage.userId, messageValidData.userId);
          assert.equal(updatedMessage.groupId, messageValidData.groupId);
          assert.equal(updatedMessage.priority, messageValidData.priority);
          assert.deepEqual(updatedMessage.readersId, messageValidData.readersId);
          done();
        });
    });
    it('should DELETE data from message model', (done) => {
      db.Message.destroy({ where: { id: messageId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
