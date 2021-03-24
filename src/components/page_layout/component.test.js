import React from 'react';
import {mount} from 'enzyme';
// internal
import PageLayout from './component.js';

test('Renders the single children in the header container', () => {
  const wrapper = mount(
      <PageLayout>
        <p>Some sample text</p>
      </PageLayout>,
  );

  const layout = wrapper.find('div.pageLayout');

  expect(layout.children()).toHaveLength(3);
  expect(layout.childAt(0).containsMatchingElement(
      <p>Some sample text</p>,
  )).toBe(true);
  expect(layout.childAt(1).children()).toHaveLength(0);
  expect(layout.childAt(2).children()).toHaveLength(0);
});
test(('Renders the children in order in each container if' +
      ' provided with two children'), () => {
  const wrapper = mount(
      <PageLayout>
        <p>header content</p>
        <div>main content</div>
      </PageLayout>,
  );

  const layout = wrapper.find('div.pageLayout');

  expect(layout.children()).toHaveLength(3);
  expect(layout.childAt(0).containsMatchingElement(
      <p>header content</p>,
  )).toBe(true);
  expect(layout.childAt(1).containsMatchingElement(
      <div>main content</div>,
  )).toBe(true);
  expect(layout.childAt(2).children()).toHaveLength(0);
});
test(('Renders the children in order in each container if' +
      ' provided with three children'), () => {
  const wrapper = mount(
      <PageLayout>
        <p>header content</p>
        <div>main content</div>
        <span>footer content</span>
      </PageLayout>,
  );

  const layout = wrapper.find('div.pageLayout');

  expect(layout.children()).toHaveLength(3);
  expect(layout.childAt(0).containsMatchingElement(
      <p>header content</p>,
  )).toBe(true);
  expect(layout.childAt(1).containsMatchingElement(
      <div>main content</div>,
  )).toBe(true);
  expect(layout.childAt(2).containsMatchingElement(
      <span>footer content</span>,
  )).toBe(true);
});
test(('aggregates the extra middle children in the main section' +
      ' if provided with more than three children'), () => {
  const wrapper = mount(
      <PageLayout>
        <p>header content</p>
        <div>main content</div>
        <div>more content</div>
        <h1>another node for the main section</h1>
        <span>footer content</span>
      </PageLayout>,
  );

  const layout = wrapper.find('div.pageLayout');

  expect(layout.children()).toHaveLength(3);
  expect(layout.childAt(0).containsMatchingElement(
      <p>header content</p>,
  )).toBe(true);
  expect(layout.childAt(1).containsAllMatchingElements([
    <div key='1'>main content</div>,
    <div key='2'>more content</div>,
    <h1 key='3'>another node for the main section</h1>,
  ])).toBe(true);
  expect(layout.childAt(2).containsMatchingElement(
      <span>footer content</span>,
  )).toBe(true);
});
