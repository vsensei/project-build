import React from 'react';

const FormInput = ({ handleChange, label, multiline, ...otherProps }) => (
  <div className={`group${multiline ? ' textarea' : ''}`}>
    {multiline ? (
      <textarea
        className="forminput"
        rows="5"
        onChange={handleChange}
        {...otherProps}
      />
    ) : (
      <input className="forminput" onChange={handleChange} {...otherProps} />
    )}

    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''} forminputlabel`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
