import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * ItemList component
 * @component
 * @return {React.Component}
 */
export default function ItemList({
  stripped=false,
  useSeparator=false,
  gapSizeClass='--space-small',
  paddingSizeClass='--space-small',
  children,
}) {
  const _gapSizeClass = [
    '--space-small',
    '--space-medium',
    '--space-large'].includes(gapSizeClass) ? gapSizeClass : '--space-small';
  const _paddingSizeClass = ([
    '--space-small',
    '--space-medium',
    '--space-large'].includes(paddingSizeClass) ?
      paddingSizeClass :
      '--space-small');

  const cssClasses = [
    style.itemList,
    stripped === true ? style.stripped : '',
    useSeparator === true ? style.withSeparator : '',
    style['gap' + _gapSizeClass],
    style['padding' + _paddingSizeClass],
  ].join(' ');

  return <div className={cssClasses}>
    {children?.map?.((c, i) => <div key={i}>{c}</div>)}
  </div>;
}

ItemList.propTypes = {
  stripped: PropTypes.bool,
  useSeparator: PropTypes.bool,
  gapSizeClass: PropTypes.string,
  paddingSizeClass: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
