import React from 'react';
import {mount} from 'enzyme';
// internal
import ItemList from './component.js';


test('Renders the same prop children in separate divs', () => {
  let children = [];
  let wrapper = mount(
      <ItemList>{children}</ItemList>,
  );
  let list = wrapper.find('div.itemList');

  expect(list.children()).toHaveLength(children.length);
  expect(list.children().map((d) => d.type()))
      .toEqual(children.map((d) => 'div'));

  children = [
    <p key='1'>Some sample text</p>,
  ];
  wrapper = mount(
      <ItemList>{children}</ItemList>,
  );
  list = wrapper.find('div.itemList');

  expect(list.children()).toHaveLength(children.length);
  expect(list.children().map((d) => d.type()))
      .toEqual(children.map((d) => 'div'));

  children = [
    <p key='1'>Some sample text</p>,
    <p key='2'>Some other text</p>,
    <p key='3'><b>Some</b> sample text</p>,
  ];
  wrapper = mount(
      <ItemList>{children}</ItemList>,
  );
  list = wrapper.find('div.itemList');

  expect(list.children()).toHaveLength(children.length);
  expect(list.children().map((d) => d.type()))
      .toEqual(children.map((d) => 'div'));
});
test('correct gap size classes are set', () => {
  const allowedSizeClasses = [
    'gap--space-small',
    'gap--space-medium',
    'gap--space-large',
  ];
  let wrapper = mount(
      <ItemList></ItemList>,
  );
  let list = wrapper.find('div.itemList');
  let hasValidSizeClass = allowedSizeClasses.map((c) => list.hasClass(c));
  expect(hasValidSizeClass).toContain(true);

  wrapper = mount(
      <ItemList gapSizeClass='--space-small'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[0]));

  wrapper = mount(
      <ItemList gapSizeClass='--space-medium'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[1]));

  wrapper = mount(
      <ItemList gapSizeClass='--space-large'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[2]));

  // testing good defaults
  wrapper = mount(
      <ItemList gapSizeClass='--small'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  hasValidSizeClass = allowedSizeClasses.map((c) => list.hasClass(c));
  expect(hasValidSizeClass).toContain(true);
});
test('correct padding size classes are set', () => {
  const allowedSizeClasses = [
    'padding--space-small',
    'padding--space-medium',
    'padding--space-large',
  ];
  let wrapper = mount(
      <ItemList></ItemList>,
  );
  let list = wrapper.find('div.itemList');
  let hasValidSizeClass = allowedSizeClasses.map((c) => list.hasClass(c));
  expect(hasValidSizeClass).toContain(true);

  wrapper = mount(
      <ItemList paddingSizeClass='--space-small'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[0]));

  wrapper = mount(
      <ItemList paddingSizeClass='--space-medium'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[1]));

  wrapper = mount(
      <ItemList paddingSizeClass='--space-large'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass(allowedSizeClasses[2]));

  // testing good defaults
  wrapper = mount(
      <ItemList paddingSizeClass='--small'></ItemList>,
  );
  list = wrapper.find('div.itemList');
  hasValidSizeClass = allowedSizeClasses.map((c) => list.hasClass(c));
  expect(hasValidSizeClass).toContain(true);
});
test('class ".stripped" is added only if props[stripped]=true', () => {
  let wrapper = mount(
      <ItemList></ItemList>,
  );
  let list = wrapper.find('div.itemList');
  expect(list.hasClass('stripped')).toBe(false);

  wrapper = mount(
      <ItemList stripped={false}></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass('stripped')).toBe(false);

  wrapper = mount(
      <ItemList stripped={true}></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass('stripped')).toBe(true);
});
test('class ".withSeparator" is added only if props[useSeparator]=true', () => {
  let wrapper = mount(
      <ItemList></ItemList>,
  );
  let list = wrapper.find('div.itemList');
  expect(list.hasClass('withSeparator')).toBe(false);

  wrapper = mount(
      <ItemList useSeparator={false}></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass('withSeparator')).toBe(false);

  wrapper = mount(
      <ItemList useSeparator={true}></ItemList>,
  );
  list = wrapper.find('div.itemList');
  expect(list.hasClass('withSeparator')).toBe(true);
});
