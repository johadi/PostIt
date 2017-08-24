import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { SendNotification } from '../../../src/components/groups/SendNotification';

describe('<SendNotification/>', () => {
  const clearPostMessageError = sinon.spy();
  const postMessage = sinon.spy();
  sinon.spy(SendNotification.prototype, 'handleChange');
  sinon.spy(SendNotification.prototype, 'handleSubmit');

  const props = {
    clearPostMessageError,
    // postMessage,
    groupId: '4',
    name: 'andela',
    groupState: { post_message_error: '' }
  };
  const wrapper = mount(<SendNotification{ ...props} />);
  it('should check that post message div exists', () => {
    expect(wrapper.find('div').first()).toExist();
  });
  it('Should check that message form element exists', () => {
    expect(wrapper.find('form')).toExist();
  });
  it('Should check that group name (andela) for the message exists', () => {
    expect(wrapper.find('form').find('p').first().find('span').text()).toBe('andela group');// eslint-disable-line newline-per-chained-call
  });
  it('Should check that textarea and select required for sending message exist', () => {
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
      // expect(wrapper.find('input').first().props().type).toBe('text');
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
    it('Should change the state of message body from nothing to hello', () => {
      expect(wrapper.state(['input']).message).toBe('hello');
    });
    // it('Should check that 2 message divs exist since we have array of 2 messages available', () => {
    //   expect(wrapper.find('.message').length).toBe(2);
    // });
    // it('Should check whether our pages are paginated correctly', () => {
    //   expect(wrapper.find('Pagination').props().items).toBe(pages); // assert that items is equal to no of our pages
    // });
  });
});
