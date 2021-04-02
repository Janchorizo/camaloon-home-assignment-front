import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * Section component
 * @component
 * @return {React.Component}
 */
export default function Button({
  filled=false,
  textSizeClass='text-medium',
  onClick=null,
  children,
}) {
  const cssClasses = [
    style.button,
    textSizeClass,
    filled === true ? style.filled : '',
  ].join(' ');

  const heightStyle = {
    height: `calc(2.5 * var(--${textSizeClass}))`
  }

  return <button
      style={heightStyle}
      className={cssClasses}
      onClick={() => onClick?.()}>
    {children}
  </button>;
}

Button.propTypes = {
  filled: PropTypes.bool,
  textSizeClass: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

