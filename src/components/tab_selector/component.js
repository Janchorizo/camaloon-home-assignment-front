import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * TabSelector component
 * @component
 * @return {React.Component}
 */
export default function TabSelector({
  selected=-1,
  labels=[],
  onChange=null,
}) {
  const labelLinks = labels.map((label, i) => {
    const cssClass = i !== selected ? '' : style.selected;
    const callback = (e) => {
      e.preventDefault();
      onChange?.({target: {value: i}});
    };
    return (
      <a key={i} href='#' className={cssClass} onClick={callback}>
        {labels[i]}
      </a>);
  });

  return <div className={style.tabSelector}>
    {labelLinks}
  </div>;
}

TabSelector.propTypes = {
  selected: PropTypes.number,
  labels: PropTypes.arrayOf(
      PropTypes.string,
  ),
  onChange: PropTypes.func,
};
