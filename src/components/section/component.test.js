import React from 'react';
import {mount} from 'enzyme';
// internal
import Section from './component.js';


test('Section title is rendered', () => {
  const title = 'some section title';
  const wrapper = mount(
      <Section title={title}>
      </Section>,
  );

  const h1 = wrapper.find('h1');
  expect(h1).not.toBe(null);
  expect(h1.text()).toBe(title);
});
test('Unasigned, null or empty title is not rendered', () => {
  let wrapper = mount(
      <Section>
      </Section>,
  );

  let h1 = wrapper.find('h1');
  expect(h1.exists()).toBe(false);

  let title = null;
  wrapper = mount(
      <Section title={title}>
      </Section>,
  );

  h1 = wrapper.find('h1');
  expect(h1.exists()).toBe(false);

  title = '';
  wrapper = mount(
      <Section title={title}>
      </Section>,
  );

  h1 = wrapper.find('h1');
  expect(h1.exists()).toBe(false);
});
test('Renders the children', () => {
  const title = 'some section title';
  const wrapper = mount(
      <Section title={title}>
        <p>Some sample text</p>
      </Section>,
  );

  expect(wrapper.containsAllMatchingElements([
    <h1 key='0'>some section title</h1>,
    <p key='1'>Some sample text</p>,
  ])).toBe(true);
});

