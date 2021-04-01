import React from 'react';
import {mount} from 'enzyme';
// internal
import Paginator from './component.js';


test('div is rendered', () => {
  const wrapper = mount(
      <Paginator/>,
  );

  const paginator = wrapper.find('div.paginator');
  expect(paginator).not.toBe(null);
  expect(paginator.text()).toBe('');
});
