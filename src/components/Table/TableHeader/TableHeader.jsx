import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button/Button';

import styles from './TableHeader.module.scss';

const TableHeader = ({
  title,
  placeholder,
  filterValue,
  handleInputChange,
  handleButtonClick
}) => {

  return (
    <div className={styles.TableHeader}>
      <h1>{title}</h1>
      {handleInputChange
      && (
        <form>
          <input
            className={styles.search}
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={filterValue}
          />
        </form>
      )}
      {handleButtonClick
      && (
        <Button
          handleClick={handleButtonClick}
          content="Create"
        />
      )}
    </div>
  )
};

TableHeader.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  filterValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleButtonClick: PropTypes.func
};

export default TableHeader;

