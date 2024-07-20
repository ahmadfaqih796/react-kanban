import React from "react";

/**
 * SvgIcon Component
 * @param {Object} props - Properties passed to the component
 * @param {string} props.icon - The icon name (e.g., 'ic-settings-mode-moon')
 * @param {string} [props.prefix='icon'] - The prefix for the icon ID
 * @param {string} [props.color='currentColor'] - The color of the icon
 * @param {string} [props.size='1em'] - The size of the icon
 * @param {string} [props.className=''] - Additional class names
 * @param {Object} [props.style={}] - Additional styles
 */
const SvgIcon = ({
  icon,
  prefix = "icon",
  color = "currentColor",
  size = "1em",
  className = "",
  style = {},
}) => {
  const symbolId = `#${prefix}-${icon}`;
  const svgStyle = {
    verticalAlign: "middle",
    width: size,
    height: size,
    color,
    ...style,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" // Adjust the viewBox according to your SVG
      className={`anticon fill-current inline-block overflow-hidden outline-none ${className}`}
      style={svgStyle}
    >
      <use href={symbolId} fill={color} />
    </svg>
  );
};

export default SvgIcon;
