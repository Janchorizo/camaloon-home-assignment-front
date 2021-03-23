import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * Subsection component
 * @component
 * @return {React.Component}
 */
export default function Subsection({title=null, children}) {
  const isValidTitle = title != null && title.toString().length > 0;
  const titleElement = isValidTitle ? <h1>{title.toString()}</h1> : '';

  return <div className={style.subsection}>
    {titleElement}
    <div>
      {children}
    </div>
  </div>;
}

Subsection.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

