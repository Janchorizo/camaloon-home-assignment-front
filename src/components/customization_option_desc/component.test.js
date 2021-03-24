import React from 'react';
import {mount} from 'enzyme';
// internal
import {Subsection} from 'components';
import CustomizationOptionDesc from './component.js';


test('Image and subsection are rendered', () => {
  const props = {
    name: 'option name',
    desc: 'customization option description',
    thumbnailUrl: 'url',
  };
  const wrapper = mount(
      <CustomizationOptionDesc {...props} />,
  );

  const desc = wrapper.find('div.optionDescription');
  expect(desc).not.toBe(null);
  expect(desc.children()).toHaveLength(2);
  expect(wrapper.containsAllMatchingElements([
    <img src={props.thumbnailUrl}/>, // eslint-disable-line react/jsx-key
    <Subsection title={props.name}><p>{props.desc}</p></Subsection>, // eslint-disable-line react/jsx-key,max-len
  ])).toBe(true);
});
