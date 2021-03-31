import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


/**
 * ModelInput component
 * @component
 * @return {React.Component}
 */
export default function ModelInput({
  value='',
  updateEndpoint,
  onSubmit,
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    setCurrentValue(value);
  }, [value])

  const cssClasses = [
    style.modelInput,
    value == currentValue ? '' : style.edited
  ].join(' ');

  return <div className={cssClasses}>
    {value == currentValue ? '' : (
      <div className={style.changeButtons}>
        <button onClick={() => setCurrentValue(value)}>Undo changes</button>
        <button onClick={() => onCommit(currentValue)}>Commit changes</button>
      </div>
    )}
    <input
      value={currentValue}
      onChange={e => setCurrentValue(e.target.value)}
      {...props}/>
  </div>;
}

ModelInput.propTypes = {
  value: PropTypes.string
};

