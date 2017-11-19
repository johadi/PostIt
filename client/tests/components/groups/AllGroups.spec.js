import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { AllGroups } from '../../../src/components/groups/AllGroups';
import componentsSeeder from '../../seeds/componentsSeeder';

describe('<AllGroups/>', () => {
  const getUserGroups = sinon.spy();
  sinon.spy(AllGroups.prototype, 'handleSelect');
  const { userGroups, newUserGroups } = componentsSeeder.allGroups;
  const props = {
    getUserGroups,
    userGroups,
    groupState: {}
  };
  const wrapper = mount(<AllGroups { ...props} />);

  describe('No Groups', () => {
    before(() => {
      wrapper.setProps({ userGroups });
    });

    it('should check that Pagination doesn\'t exist when number of pages' +
      ' is just 1', () => {
      expect(wrapper.find('Pagination').length).toNotExist();
      // expect(wrapper.find('.yo').length).toBe(1);
    });

    it('Should check no group div exists when groups array is empty',
      () => {
        expect(wrapper.find('.group-div').length).toBe(0);
      });

    it('Should check group count is zero when groups array is empty', () => {
      expect(wrapper.find('.group-count').text())
        .toBe('Total groups you joined: 0');
    });
  });

  describe('Groups with Pagination', () => {
    const pages = 3;
    before(() => {
      wrapper.setProps({ userGroups: newUserGroups });
    });

    it('Should check that group count is 20 since our props ' +
      'changes count to 20', () => {
      expect(wrapper.find('.group-count').text())
        .toBe('Total groups you joined: 20');
    });

    it('should check that Pagination exist since our pages is now 3.',
      () => {
        expect(wrapper.find('Pagination').length).toBe(1);
      });

    it('Should check 2 group divs exist since we now have array of 2 ' +
      'groups', () => {
      expect(wrapper.find('.group-div').length).toBe(2);
    });

    it('Should check that our pages are paginated correctly', () => {
      // assert that items is equal to no of our pages
      expect(wrapper.find('Pagination').props().items).toBe(pages);
    });
  });
});
