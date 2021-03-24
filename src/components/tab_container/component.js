import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * TabContainer component
 * @component
 * @return {React.Component}
 */
export default function TabContainer({
  selectedIdx=-1,
  children,
}) {
  let selectedChild = (children?.length === undefined && selectedIdx === 0 ?
    children :
    '');

  if (children?.length !== undefined) {
    selectedChild = children.filter((d, i) => i === selectedIdx)?.[0];
  }

  return <div className={style.tabContainer}>
    {selectedChild}
  </div>;
}

TabContainer.propTypes = {
  selectedIdx: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
