import React from 'react';
import PropTypes from 'prop-types';
// internal
import style from './style.module.css';


const defaultColor = 'var(--white)';


/**
 * Returns true if the browser is able to determine a color
 * out of the string provided.
 * @param {string} color The color string
 * @return {boolean} Wether it is a valid color or not
 */
export function isValidColor(color) {
  const s=new Option().style;
  s.color = color;
  return s.color !== '';
}


/**
 * Section component
 * @component
 * @return {React.Component}
 */
export default function PageLayout({
  headerBgColor=defaultColor,
  bodyBgColor=defaultColor,
  footerBgColor=defaultColor,
  children,
  ...extraProps
}) {
  const headerStyle = {backgroundColor: (isValidColor(headerBgColor) ?
    headerBgColor :
    defaultColor)};
  const bodyStyle = {backgroundColor: (isValidColor(bodyBgColor) ?
    bodyBgColor :
    defaultColor)};
  const footerStyle = {backgroundColor: (isValidColor(footerBgColor) ?
    footerBgColor :
    defaultColor)};

  let [header, body, footer] = [children || '', '', ''];
  if (children.length !== undefined) {
    [header, ...body] = children;
    footer = body.length > 1 ? body.pop() : '';
  }

  return <div className={style.pageLayout} {...extraProps}>
    <div style={headerStyle} className={style.header}>{header}</div>
    <div style={bodyStyle} className={style.body}>{body}</div>
    <div style={footerStyle} className={style.footer}>{footer}</div>
  </div>;
}

PageLayout.propTypes = {
  headerBgColor: PropTypes.string,
  bodyBgColor: PropTypes.string,
  footerBgColor: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

