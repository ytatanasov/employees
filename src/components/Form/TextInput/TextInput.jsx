import React from 'react';
import PropTypes from 'prop-types';

import styles from './TextInput.module.scss';

const TextInput = ({
  id,
  label,
  type = 'text',
  value = '',
  onChange = () => {
  },
  onBlur = () => {
  },
  required,
  error,
  errorText
}) => {
  const inputClasses = [styles.input];
  if (error) {
    inputClasses.push(styles.error);
  }

  return (
    <div className={styles.TextInput} data-testid="text-input-wrapper">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
      )}
      <input
        id={id}
        className={inputClasses.join(' ')}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
        value={value}
        required={required}
      />
      <p className={styles.errorText}>{error ? errorText : ''}</p>
    </div>
  )
};

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.bool,
  errorText: PropTypes.string
};

export default TextInput;
