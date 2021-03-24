import React from 'react';
import {mount} from 'enzyme';
// internal
import TabSelector from './component.js';


test('renders the <a> links for each label', () => {
  let labels = [];
  let wrapper = mount(
      <TabSelector labels={labels}/>,
  );
  let list = wrapper.find('div.tabSelector');

  expect(list.children()).toHaveLength(0);

  labels = [
    'label1',
  ];
  wrapper = mount(
      <TabSelector labels={labels}/>,
  );
  list = wrapper.find('div.tabSelector');

  expect(list.children()).toHaveLength(labels.length);
  expect(list.children().map((d) => d.type()))
      .toEqual(labels.map((d) => 'a'));
  expect(list.children().map((d) => d.text())).toEqual(labels);

  labels = [
    'label1',
    'label2',
    'label3',
  ];
  wrapper = mount(
      <TabSelector labels={labels}/>,
  );
  list = wrapper.find('div.tabSelector');

  expect(list.children()).toHaveLength(labels.length);
  expect(list.children().map((d) => d.type()))
      .toEqual(labels.map((d) => 'a'));
  expect(list.children().map((d) => d.text())).toEqual(labels);
});
test('the "selected" class is added to the correct link', () => {
  const labels = [
    'label1',
    'label1',
    'label1',
  ];
  let wrapper = mount(
      <TabSelector labels={labels}/>,
  );
  let list = wrapper.find('div.tabSelector');

  let selectedChildren = list.children().map((d) => d.hasClass('selected'));
  expect(selectedChildren).toEqual([false, false, false]);

  wrapper = mount(
      <TabSelector labels={labels} selected={0}/>,
  );
  list = wrapper.find('div.tabSelector');

  selectedChildren = list.children().map((d) => d.hasClass('selected'));
  expect(selectedChildren).toEqual([true, false, false]);

  wrapper = mount(
      <TabSelector labels={labels} selected={-3}/>,
  );
  list = wrapper.find('div.tabSelector');

  selectedChildren = list.children().map((d) => d.hasClass('selected'));
  expect(selectedChildren).toEqual([false, false, false]);

  wrapper = mount(
      <TabSelector labels={labels} selected={2}/>,
  );
  list = wrapper.find('div.tabSelector');

  selectedChildren = list.children().map((d) => d.hasClass('selected'));
  expect(selectedChildren).toEqual([false, false, true]);

  wrapper = mount(
      <TabSelector labels={labels} selected={5}/>,
  );
  list = wrapper.find('div.tabSelector');

  selectedChildren = list.children().map((d) => d.hasClass('selected'));
  expect(selectedChildren).toEqual([false, false, false]);
});
test('the "onChange" callback is called with appropiate parameters', () => {
  const mockCallback = jest.fn();
  const labels = [
    'label1',
    'label2',
    'label3',
  ];
  const wrapper = mount(
      <TabSelector labels={labels} onChange={mockCallback}/>,
  );
  const list = wrapper.find('div.tabSelector');
  list.childAt(0).simulate('click', {});
  expect(mockCallback).toHaveBeenCalledWith({target: {value: 0}});

  list.childAt(1).simulate('click', {});
  expect(mockCallback).toHaveBeenCalledWith({target: {value: 1}});

  list.childAt(2).simulate('click', {});
  expect(mockCallback).toHaveBeenCalledWith({target: {value: 2}});
});
