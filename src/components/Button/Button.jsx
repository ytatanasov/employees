import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.scss';

const Button = ({
  id = '',
  content,
  handleClick = () => {},
  disabled,
  icon,
  danger,
  md,
  lite,
  title
}) => {
  const buttonClasses = [styles.Button];

  if (md) {
    buttonClasses.push(styles.medium);
  }

  if (icon) {
    buttonClasses.push(styles.icon);
  }

  if (lite) {
    buttonClasses.push(styles.lite);
  }

  if (danger) {
    buttonClasses.push(styles.danger);
  }

  const onClick = event => {
    event.stopPropagation();

    if (handleClick) {
      handleClick();
    }
  };

  return (
    <button
      data-testid={id}
      tabIndex="0"
      className={buttonClasses.join(' ')}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {content}
    </button>
  )
};

Button.propTypes = {
  content: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  icon: PropTypes.bool,
  danger: PropTypes.bool,
  md: PropTypes.bool,
  lite: PropTypes.bool
};

export default Button;

