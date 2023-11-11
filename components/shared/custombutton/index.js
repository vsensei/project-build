import React from 'react';

const CustomButton = ({
  children,
  inverted,
  abort,
  transparent,
  ...otherProps
}) => (
  <button
    className={`${inverted ? 'inverted ' : ''}
    ${abort ? 'abort ' : ''}
    ${transparent ? 'transparent ' : ''}
    custombutton`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
