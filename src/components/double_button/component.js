import React from 'react';
import PropTypes from 'prop-types';
// internal
import {Button} from 'components';
import style from './style.module.css';


/**
 * Section component
 * @component
 * @return {React.Component}
 */
export default function DoubleButton({
  label1='',
  onClick1=null,
  label2='',
  onClick2=null,
  textSizeClass='text-medium',
  verticalLayout=false,
}) {
  const cssClasses = [
    style.doubleButton,
    textSizeClass,
    verticalLayout === true ? style.vertical : '',
  ].join(' ');

  return <div className={cssClasses}>
    <Button filled={true}
      textSizeClass={textSizeClass}
      onClick={onClick1}>
      {label1}
    </Button>
    <span>- or -</span>
    <Button filled={false}
      textSizeClass={textSizeClass}
      onClick={onClick2}>
      {label2}
    </Button>
  </div>;
}

DoubleButton.propTypes = {
  verticalLayout: PropTypes.bool,
  textSizeClass: PropTypes.string,
  label1: PropTypes.string,
  onClick1: PropTypes.func,
  label2: PropTypes.string,
  onClick2: PropTypes.func,
};

