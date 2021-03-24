import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * TwoThirdsLayout component
 * @component
 * @return {React.Component}
 */
export default function TwoThirdsLayout({children}) {
  const childrenCopy = (children?.length === undefined ?
    children :
    [...children]);
  const [side, ...main] = (childrenCopy?.length === undefined ?
    ['', childrenCopy] :
    [childrenCopy.pop(), ...childrenCopy]);

  return <div className={style.layout}>
    <div>{main}</div>
    <div>{side}</div>
  </div>;
}

TwoThirdsLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
