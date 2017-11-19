import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { MessageBoard } from '../../../src/components/groups/MessageBoard';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<MessageBoard/>', () => {
  const getBoardMessages = sinon.spy();
  sinon.spy(MessageBoard.prototype, 'handleSelect');
  const { boardMessages, newBoardMessages } = componentsSeeder.messageBoard;
  const props = {
    getBoardMessages,
    boardMessages,
    groupState: {}
  };
  const wrapper = mount(<MessageBoard{ ...props} />);

  describe('No Messages', () => {
    before(() => {
      wrapper.setProps({ boardMessages });
    });

    it('should check Pagination doesn\'t exist when our number of pages is ' +
      'just 1', () => {
      expect(wrapper.find('Pagination').length).toNotExist();
      // expect(wrapper.find('input').first().props().type).toBe('text');
    });

    it('Should return a default statement when there is no message', () => {
      expect(wrapper.find('.no-message').text()).toBe('You have no unread ' +
        'notifications yet. Only notifications you have not read are shown here.');
    });

    it('Should check that no message div exists when our messages array' +
      ' is empty', () => {
      expect(wrapper.find('.message').length).toBe(0);
    });
  });

  describe('Messages with Pagination', () => {
    const pages = 4;
    before(() => {
      wrapper.setProps({ boardMessages: newBoardMessages });
    });

    it('should check that Pagination exist when our number of pages is now 3',
      () => {
        expect(wrapper.find('Pagination').length).toBe(1);
      });

    it('Should not return any default statement when messages are available',
      () => {
        expect(wrapper.find('.no-message').length).toBe(0);
      });

    it('Should check 2 message divs exist since the array now has 2 messages',
      () => {
        expect(wrapper.find('.message').length).toBe(2);
      });

    it('Should check that our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
