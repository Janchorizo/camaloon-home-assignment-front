import React from 'react';
import {mount} from 'enzyme';
// internal
import TabContainer from './component.js';


test('renders the selected nth child', () => {
  const wrapper = mount(
      <TabContainer>

      </TabContainer>,
  );
  const container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);
});
test('does not render content if no children is supplied', () => {
  const wrapper = mount(
      <TabContainer selectedIdx={0}>

      </TabContainer>,
  );
  const container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);
});
test('does not render content if the index is out of range', () => {
  let wrapper = mount(
      <TabContainer selectedIdx={-1}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  let container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);

  wrapper = mount(
      <TabContainer selectedIdx={3}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);
});
test('does not render content if the index is not a valid number', () => {
  // Prevent prop type console error from breaking the test
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  let wrapper = mount(
      <TabContainer selectedIdx={null}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  let container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);

  wrapper = mount(
      <TabContainer selectedIdx={'234'}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);

  wrapper = mount(
      <TabContainer selectedIdx={'0'}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);

  wrapper = mount(
      <TabContainer selectedIdx={[]}>
        <span>content 1</span>
        <span>content 2</span>
        <span>content 3</span>
      </TabContainer>,
  );
  container = wrapper.find('div.tabContainer');
  expect(container.children()).toHaveLength(0);

  spy.mockRestore();
});
