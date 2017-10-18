import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { MessageBoard } from '../../../src/components/groups/MessageBoard.jsx';

describe('<MessageBoard/>', () => {
  const getAllUserGroups = sinon.spy();
  const getBoardMessages = sinon.spy();
  sinon.spy(MessageBoard.prototype, 'componentDidMount');
  sinon.spy(MessageBoard.prototype, 'handleSelect');
  const props = {
    getAllUserGroups,
    getBoardMessages,
    boardMessages: {
      messages: [],
      pages: 1,
      count: 0
    },
    groupState: {}
  };
  const wrapper = mount(<MessageBoard{ ...props} />);
  it('Should check if componentDidMount is called', () => {
    expect(MessageBoard.prototype.componentDidMount.calledOnce).toBe(true);
  });
  describe('No Messages', () => {
    before(() => {
      const boardMessages = {
        messages: [],
        pages: 1,
        count: 0
      };
      wrapper.setProps({ boardMessages });
    });
    it('should check that Pagination doesn\'t exist since our page is ' +
      'just 1, no pagination', () => {
      expect(wrapper.find('Pagination').length).toNotExist();
      // expect(wrapper.find('input').first().props().type).toBe('text');
    });
    it('Should return a default statement if there is no message. moreover,' +
      ' count is zero', () => {
      expect(wrapper.find('.no-message').text()).toBe('You have no unread ' +
        'notifications yet. Only notifications you have not read are shown here.');
    });
    it('Should check that no message div exists since our messages array' +
      ' is empty', () => {
      expect(wrapper.find('.message').length).toBe(0);
    });
  });
  describe('If there is at least one message', () => {
    const pages = 4;
    before(() => {
      const boardMessages = {
        messages: [
          {
            id: 1,
            body: 'world apart',
            createdAt: new Date(),
            User: {
              username: 'johadi'
            },
            Group: {
              id: '2',
              name: 'andela'
            }
          },
          {
            id: 4,
            body: 'hmmmmm not easy',
            createdAt: new Date(),
            User: {
              username: 'ovenje'
            },
            Group: {
              id: '4',
              name: 'ferrari'
            }
          }
        ],
        pages,
        count: 10
      };
      wrapper.setProps({ boardMessages });
    });
    it('should check that Pagination exist since our pages is ' +
      'now 3,there is pagination', () => {
      expect(wrapper.find('Pagination').length).toBe(1);
    });
    it('Should not return any default statement if messages ' +
      'are available', () => {
      expect(wrapper.find('.no-message').length).toBe(0);
    });
    it('Should check that 2 message divs exist since we have array ' +
      'of 2 messages available', () => {
      expect(wrapper.find('.message').length).toBe(2);
    });
    it('Should check whether our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
