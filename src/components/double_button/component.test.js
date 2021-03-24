import React from 'react';
import {mount} from 'enzyme';
// internal
import Button from '../button';
import DoubleButton from './component.js';


test('double button is rendered', () => {
  const props = {
    label1: '',
    onClick1: null,
    label2: '',
    onClick2: null,
  };
  const wrapper = mount(
      <DoubleButton {...props}/>,
  );

  const doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton).not.toBe(null);
  expect(doubleButton.children()).toHaveLength(3);
  expect(doubleButton.childAt(0).type()).toEqual(Button);
  expect(doubleButton.childAt(1).type()).toEqual('span');
  expect(doubleButton.childAt(2).type()).toEqual(Button);
});
test('double button content is rendered', () => {
  const props = {
    label1: 'text for button1',
    onClick1: null,
    label2: 'text for button2',
    onClick2: null,
  };
  const wrapper = mount(
      <DoubleButton {...props}/>,
  );

  const doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton.childAt(0).text()).toEqual('text for button1');
  expect(doubleButton.childAt(2).text()).toEqual('text for button2');
});
test('vertical layout is correctly set', () => {
  const props = {
    label1: '',
    onClick1: null,
    label2: '',
    onClick2: null,
  };
  let wrapper = mount(
      <DoubleButton {...props}/>,
  );
  let doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton.hasClass('vertical')).toEqual(false);

  props.verticalLayout = true;
  wrapper = mount(
      <DoubleButton {...props}/>,
  );
  doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton.hasClass('vertical')).toEqual(true);
});
test('provided text size CSS class is added', () => {
  const props = {
    label1: '',
    onClick1: null,
    label2: '',
    onClick2: null,
    textSizeClass: 'text-xlarge',
  };
  const wrapper = mount(
      <DoubleButton {...props}/>,
  );

  const doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton.childAt(0).prop('textSizeClass')).toEqual('text-xlarge');
  expect(doubleButton.childAt(2).prop('textSizeClass')).toEqual('text-xlarge');
});
test('extra "style.filled" CSS class is added for the first button', () => {
  const props = {
    label1: '',
    onClick1: null,
    label2: '',
    onClick2: null,
  };
  const wrapper = mount(
      <DoubleButton {...props}/>,
  );

  const doubleButton = wrapper.find('div.doubleButton');
  expect(doubleButton.childAt(0).prop('filled')).toBe(true);
  expect(doubleButton.childAt(2).prop('filled')).toBe(false);
});
test('Calls the provided callback function', () => {
  const testState = {called: false};
  const props = {
    label1: '',
    onClick1: () => {
      testState.button1clicked = true;
    },
    label2: '',
    onClick2: () => {
      testState.button2clicked = true;
    },
  };
  const wrapper = mount(
      <DoubleButton {...props}/>,
  );

  const doubleButton = wrapper.find('div.doubleButton');
  doubleButton.childAt(0).simulate('click', {});
  expect(testState.button1clicked).toBe(true);
  doubleButton.childAt(2).simulate('click', {});
  expect(testState.button2clicked).toBe(true);
});
