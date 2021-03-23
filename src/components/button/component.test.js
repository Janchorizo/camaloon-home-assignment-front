import React from 'react';
import {mount} from 'enzyme';
// internal
import Button from './component.js';


test('button is rendered', () => {
  const wrapper = mount(
      <Button></Button>,
  );

  const button = wrapper.find('button');
  expect(button).not.toBe(null);
  expect(button.text()).toBe('');
});
test('button content is rendered', () => {
  const wrapper = mount(
      <Button><span>some text</span></Button>,
  );

  const button = wrapper.find('button');
  expect(button).not.toBe(null);
  expect(button.children()).toHaveLength(1);
  expect(button.children().html()).toEqual('<span>some text</span>');
});
test('default text size CSS class is added', () => {
  let wrapper = mount(
      <Button></Button>,
  );

  let button = wrapper.find('button');
  expect(button.hasClass('text-medium')).toBe(true);
});
test('provided text size CSS class is added', () => {
  let wrapper = mount(
      <Button textSizeClass='text-large'></Button>,
  );

  let button = wrapper.find('button');
  expect(button.hasClass('text-large')).toBe(true);
});
test('extra "style.filled" CSS class is added for filled buttons', () => {
  let wrapper = mount(
      <Button></Button>,
  );

  let button = wrapper.find('button');
  let buttonClasses = wrapper
    .find('button')
    .prop('className')
    .trim()
    .split(' ');
  expect(buttonClasses.length).toEqual(2);
  expect(button.hasClass('button')).toBe(true);
  expect(button.hasClass('text-medium')).toBe(true);

  wrapper = mount(
      <Button filled={true}></Button>,
  );

  button = wrapper.find('button');
  buttonClasses = wrapper
    .find('button')
    .prop('className')
    .trim()
    .split(' ');
  expect(buttonClasses.length).toEqual(3);
  expect(button.hasClass('button')).toBe(true);
  expect(button.hasClass('filled')).toBe(true);
  expect(button.hasClass('text-medium')).toBe(true);
});
test('Calls the provided callback function', () => {
  const textState = {called: false};
  const wrapper = mount(
      <Button onClick={() => {textState.called = true;}}>
        <p>Some sample text</p>
      </Button>,
  );
  wrapper.find('button').simulate('click', {});
  expect(textState.called).toBe(true);
});
