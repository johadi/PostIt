import 'babel-polyfill';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import UserDetail from '../../../src/components/groups/UserDetail';
import { userDetail } from '../../seeds/componentsSeeder';

const props = { userDetail };
const wrapper = mount(<UserDetail {...props} />);
describe('<UserDetail/>', () => {
  it('should check that the div with profile-items class exists', () => {
    expect(wrapper.find('.profile-items').length).toBe(1);
  });
  it('should check that "your profile" text exists', () => {
    expect(wrapper.find('h5').at(0).text()).toBe('Your profile');
  });
  it('should check that the proper user details are displayed', () => {
    expect(wrapper.find('h5').at(1).text()).toBe(props.userDetail.username);
    expect(wrapper.find('h5').at(2).text()).toBe(props.userDetail.fullname);
    expect(wrapper.find('h5').at(3).text()).toBe(props.userDetail.mobile);
    expect(wrapper.find('h5').at(4).text()).toBe(props.userDetail.email);
  });
});
