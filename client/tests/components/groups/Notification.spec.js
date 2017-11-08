import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { Notification } from '../../../src/components/groups/Notification';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<Notification/>', () => {
  sinon.spy(Notification.prototype, 'componentDidMount');
  const updateReadMessage = sinon.spy();
  const { message, name } = componentsSeeder.notification;
  const props = {
    updateReadMessage,
    message,
    name,
    groupState: {}
  };
  const wrapper = mount(<Notification { ...props} />);
  const messageDiv = wrapper.find('div').first();
  it('Should check if componentDidMount is called', () => {
    expect(Notification.prototype.componentDidMount.calledOnce).toBe(true);
  });
  it('should check that message exist', () => {
    expect(wrapper.props().message).toExist();
  });
  it('Should show sender name', () => {
    expect(messageDiv.find('p').at(0).find('span').first()
      .text()).toEqual('jimoh');
  });
  it('Should show the group name the message was sent to', () => {
    expect(messageDiv.find('h3').at(0).text()).toEqual('andela group');
  });
  it('Should check that message body is displayed', () => {
    expect(messageDiv.find('p').at(2).text()).toEqual('lord of the ring');
  });
});
