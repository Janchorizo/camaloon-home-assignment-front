import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * Section component
 * @component
 * @return {React.Component}
 */
export default function Section({title=null, children}) {
  const isValidTitle = title != null && title.toString().length > 0;
  const titleElement = isValidTitle ? <h1>{title.toString()}</h1> : '';

  return <div className={style.section}>
    {titleElement}
    <div>
      {children}
    </div>
  </div>;
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

