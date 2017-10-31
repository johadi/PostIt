import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import {
  SendNotification
} from '../../../src/components/groups/SendNotification';

describe('<SendNotification/>', () => {
  const clearMessageError = sinon.spy();
  const postMessage = sinon.spy();
  sinon.spy(SendNotification.prototype, 'handleChange');
  sinon.spy(SendNotification.prototype, 'handleSubmit');
  sinon.spy(SendNotification.prototype, 'handleKeyUp');

  const props = {
    clearMessageError,
    // postMessage,
    groupId: '4',
    name: 'andela',
    groupState: { postMessageErr: '' }
  };
  const wrapper = mount(<SendNotification{...props} />);
  it('should check that post message div exists', () => {
    expect(wrapper.find('div').first()).toExist();
  });
  it('Should check that message form element exists',
    () => {
      expect(wrapper.find('form')).toExist();
    });
  it('Should check that group name (andela) for the message exists',
    () => {
      expect(wrapper.find('form').find('p').first().find('span')
        .text()).toBe('andela group');// eslint-disable-line newline-per-chained-call
    });
  it('Should check that textarea and select required for sending message exist',
    () => {
      expect(wrapper.find('form').find('textarea').length).toBe(1);
      expect(wrapper.find('form').find('select').length).toBe(1);
    });
  it('Should check that there is a button of type submit', () => {
    expect(wrapper.find('form').find('button').props().type).toBe('submit');
  });
  describe('User wants to send message with no message body', () => {
    before(() => {
      const input = {
        message: '',
        priority: 'normal'
      };
      wrapper.setState({ input });
    });
    wrapper.find('form').simulate('submit');
    it('should display a message that message body is required', () => {
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
        message: 'hello',
        priority: 'normal'
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
