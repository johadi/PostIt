import { assert } from 'chai';
import models from './../../database/models';
import modelSeeder from '../seed/modelSeeder';

describe('Message Model', () => {
  before((done) => {
    modelSeeder.resetMessage(modelSeeder.messageDetails, done);
  });
  after(modelSeeder.emptyMessage);

  describe('Validations', () => {
    it('should throw validation error if no message body provided',
      (done) => {
        const messageInvalidDetails = { ...modelSeeder.messageDetails };
        messageInvalidDetails.body = '';
        models.Message.create(messageInvalidDetails)
          .catch((error) => {
            assert.equal(error.errors[0].message,
              'Message body can\' be empty');
            done();
          });
      });
    it('should throw validation error if userId is not provided', () => {
      const messageInvalidDetails = { ...modelSeeder.messageDetails };
      messageInvalidDetails.userId = '';
      models.Message.create(messageInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'userId can\'t be empty');
        });
    });
    it('should throw validation error if userId is not a number', () => {
      const messageInvalidDetails = { ...modelSeeder.messageDetails };
      messageInvalidDetails.userId = 'y';
      models.Message.create(messageInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'userId must be a number');
        });
    });
    it('should throw validation error if groupId is not provided', () => {
      const messageInvalidDetails = { ...modelSeeder.messageDetails };
      messageInvalidDetails.groupId = '';
      models.Message.create(messageInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId can\'t be empty');
        });
    });
    it('should throw validation error if groupId is not a number', () => {
      const messageInvalidDetails = { ...modelSeeder.messageDetails };
      messageInvalidDetails.groupId = 'q';
      models.Message.create(messageInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message, 'groupId must be a number');
        });
    });
    it('should throw validation error if priority is neither normal, ' +
      'urgent nor critical', () => {
      const messageInvalidDetails = { ...modelSeeder.messageDetails };
      messageInvalidDetails.priority = 'abnormal';
      models.Message.create(messageInvalidDetails)
        .catch((error) => {
          assert.equal(error.errors[0].message,
            'priority must be normal, urgent or critical');
        });
    });
  });
  describe('CRUD operations on message model', () => {
    const messageValidDetails = modelSeeder.messageDetails;
    let messageId;
    it('should CREATE message', (done) => {
      models.Message.create(messageValidDetails)
        .then((createdMessage) => {
          messageId = createdMessage.id;
          assert.equal(createdMessage.body, messageValidDetails.body);
          assert.equal(createdMessage.userId, messageValidDetails.userId);
          assert.equal(createdMessage.groupId, messageValidDetails.groupId);
          assert.equal(createdMessage.priority, messageValidDetails.priority);
          assert.deepEqual(createdMessage.readersId, messageValidDetails.readersId);
          done();
        });
    });
    it('should READ data from message model', (done) => {
      models.Message.findById(messageId)
        .then((foundMessage) => {
          assert.equal(foundMessage.id, messageId);
          assert.equal(foundMessage.body, messageValidDetails.body);
          assert.equal(foundMessage.userId, messageValidDetails.userId);
          assert.equal(foundMessage.groupId, messageValidDetails.groupId);
          assert.equal(foundMessage.priority, messageValidDetails.priority);
          assert.deepEqual(foundMessage.readersId, messageValidDetails.readersId);
          done();
        });
    });
    it('should UPDATE data in message model', (done) => {
      const newBody = 'no man is an island';
      models.Message.update(
        { body: newBody },
        {
          where: { id: messageId },
          returning: true,
          plain: true
        })
        .then((result) => {
          const updatedMessage = result[1].dataValues;
          assert.equal(updatedMessage.id, messageId);
          assert.equal(updatedMessage.body, newBody);
          assert.equal(updatedMessage.userId, messageValidDetails.userId);
          assert.equal(updatedMessage.groupId, messageValidDetails.groupId);
          assert.equal(updatedMessage.priority, messageValidDetails.priority);
          assert.deepEqual(updatedMessage.readersId, messageValidDetails.readersId);
          done();
        });
    });
    it('should DELETE data from message model', (done) => {
      models.Message.destroy({ where: { id: messageId } })
        .then((deletedRow) => {
          assert.equal(deletedRow, 1);
          done();
        });
    });
  });
});
