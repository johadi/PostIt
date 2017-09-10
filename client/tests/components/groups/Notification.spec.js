/* eslint-disable newline-per-chained-call */
import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Notification from '../../../src/components/groups/Notification.jsx';

describe('<Notification/>', () => {
  const props = {
    message: {
      User: {
        username: 'jimoh'
      },
      createdAt: new Date(),
      body: 'lord of the ring'
    },
    name: 'andela'
  };
  const wrapper = mount(<Notification { ...props} />);
  const messageDiv = wrapper.find('div').first();
  it('should check that message exist', () => {
    expect(wrapper.props().message).toExist();
  });
  it('Should show sender name', () => {
    expect(messageDiv.find('p').at(0).find('span').first().text()).toEqual('jimoh');
  });
  it('Should show the group name the message was sent to', () => {
    expect(messageDiv.find('h2').at(0).text()).toEqual('andela group');
  });
  it('Should check that message body is displayed', () => {
    expect(messageDiv.find('p').at(2).text()).toEqual('lord of the ring');
  });
  // it('Should check that message sender is displayed', () => {
  //   expect(messageDiv.find().text()).toBe('Total groups you joined: 0');
  // });
});
