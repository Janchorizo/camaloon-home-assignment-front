import React from 'react';
import {mount} from 'enzyme';
// internal
import ModelInput from './component.js';


test('button is rendered', () => {
  const wrapper = mount(
      <ModelInput/>,
  );

  const button = wrapper.find('div.modelInput');
  expect(button).not.toBe(null);
  expect(button.text()).toBe('');
});
