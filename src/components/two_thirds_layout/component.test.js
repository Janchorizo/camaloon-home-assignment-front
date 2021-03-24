import React from 'react';
import {mount} from 'enzyme';
// internal
import TwoThirdsLayout from './component.js';


test('Renders the single children in the main container', () => {
  const wrapper = mount(
      <TwoThirdsLayout>
        <p>Some sample text</p>
      </TwoThirdsLayout>,
  );

  const layout = wrapper.find('div.layout');

  expect(layout.children()).toHaveLength(2);
  expect(layout.childAt(0).containsMatchingElement(
      <p>Some sample text</p>,
  )).toBe(true);
  expect(layout.childAt(1).children()).toHaveLength(0);
});
test(('Renders the children in order in each container if' +
      ' only provided two'), () => {
  const wrapper = mount(
      <TwoThirdsLayout>
        <p>main content</p>
        <div>side content</div>
      </TwoThirdsLayout>,
  );

  const layout = wrapper.find('div.layout');

  expect(layout.containsAllMatchingElements([
    <div key='1'><p>main content</p></div>,
    <div key='2'><div>side content</div></div>,
  ])).toBe(true);
});
test(('Renders the all the children in the main container' +
      ' except for the last if provided more'), () => {
  const wrapper = mount(
      <TwoThirdsLayout>
        <p>main content</p>
        <span>this goes to the main container too</span>
        <h1>this also goes to the left container</h1>
        <div>side content</div>
      </TwoThirdsLayout>,
  );

  const layout = wrapper.find('div.layout');

  expect(layout.containsAllMatchingElements([
    <div key='1'>
      <p>main content</p>
      <span>this goes to the main container too</span>
      <h1>this also goes to the left container</h1>
    </div>,
    <div key='2'><div>side content</div></div>,
  ])).toBe(true);
});
test('renders empty columns if no children is provided', () => {
  const wrapper = mount(
      <TwoThirdsLayout />,
  );

  const layout = wrapper.find('div.layout');

  expect(layout.children()).toHaveLength(2);
  expect(layout.childAt(0).children()).toHaveLength(0);
  expect(layout.childAt(1).children()).toHaveLength(0);
});

