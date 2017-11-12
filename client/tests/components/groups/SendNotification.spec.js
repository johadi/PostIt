import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {
  SendNotification
} from '../../../src/components/groups/SendNotification';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<SendNotification/>', () => {
  const clearMessageError = sinon.spy();
  const postMessage = sinon.spy();
  sinon.spy(SendNotification.prototype, 'handleChange');
  sinon.spy(SendNotification.prototype, 'handleSubmit');
  sinon.spy(SendNotification.prototype, 'handleKeyUp');

  const { groupId, name, priority, firstMessage, secondMessage }
  = componentsSeeder.sendNotification;
  const props = {
    clearMessageError,
    postMessage,
    groupId,
    name,
    groupState: { postMessageErr: '' }
  };
  const wrapper = mount(<SendNotification{...props} />);
  it('should check that post message div exists', () => {
    expect(wrapper.find('div').first()).toExist();
  });
  it('Should check that form element exists',
    () => {
      expect(wrapper.find('form')).toExist();
    });
  it('Should check the group name for the message exists',
    () => {
      expect(wrapper.find('form').find('p').first().find('span')
        .text()).toBe('andela group');
    });
  it('Should check textarea and select fields exist',
    () => {
      expect(wrapper.find('form').find('textarea').length).toBe(1);
      expect(wrapper.find('form').find('select').length).toBe(1);
    });
  it('Should check a submit button exists', () => {
    expect(wrapper.find('form').find('button').props().type).toBe('submit');
  });
  describe('User wants to send message with no message body', () => {
    before(() => {
      const input = {
        priority,
        message: firstMessage,
      };
      wrapper.setState({ input });
    });
    wrapper.find('form').simulate('submit');
    it('should display message body is required when body is empty',
      () => {
        expect(wrapper.find('h4').text()).toBe('Notification body required.');
      });
    it('Should trigger handleSubmit event handler', () => {
      expect(SendNotification.prototype.handleSubmit.called).toBe(true);
    });
    it('Should not trigger postMessage action', () => {
      expect(postMessage.notCalled).toBe(true);
    });
  });
  describe('If message body is not empty', () => {
    before(() => {
      const input = {
        priority,
        message: secondMessage,
      };
      wrapper.setState({ input });
    });
    wrapper.find('form').simulate('submit');

    it('Should trigger handleSubmit event handler', () => {
      expect(SendNotification.prototype.handleSubmit.called).toBe(true);
    });

    it('Should change the state of message body from nothing to hello',
      () => {
        expect(wrapper.state(['input']).message).toBe('hello');
      });
  });

  describe('handleChange event', () => {
    it('Should trigger handleChange method when textarea changes', () => {
      wrapper.find('textarea').simulate('change');
      expect(SendNotification.prototype.handleChange.called).toBe(true);
    });

    it('Should trigger handleKeyUp when typing in textarea', () => {
      wrapper.find('textarea').simulate('keyup');
      expect(SendNotification.prototype.handleKeyUp.called).toBe(true);
    });

    it('Should trigger handlechange when select option changes', () => {
      wrapper.find('select').simulate('change');
      expect(SendNotification.prototype.handleChange.called).toBe(true);
    });
  });
});
