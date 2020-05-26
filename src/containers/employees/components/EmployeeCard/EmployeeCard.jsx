import React from 'react';
import PropTypes from 'prop-types';

import Actions from '../../../../components/Actions/Actions';

import styles from './EmployeeCard.module.scss';

const EmployeeCard = ({
  defaultImage,
  actions,
  employee
}) => {

  const { id, profile_image, employee_name, employee_salary, employee_age } = employee;

  /**
   * Handles error on loading the image
   * and sets a default one
   * @param {Object} event
   */
  const handleImageError = event => {
    event.target.src = defaultImage;
  };

  return (
    <div className={styles.CardWrapper}>
      <div className={styles.imageWrapper}>
        <img onError={handleImageError} src={profile_image ? profile_image : defaultImage} alt="Avatar" />
      </div>
      <div className={styles.infoWrapper}>
        <h1>{employee_name}</h1>
        <div className={styles.id}>Employee #{id}</div>
        <div className={styles.info}>
          <p className={styles.label}>Salary</p>
          <p>${employee_salary}</p>
        </div>
        <div className={styles.info}>
          <p className={styles.label}>Age</p>
          <p>{employee_age}</p>
        </div>
        {actions &&
        <div className={styles.actions}>
          <Actions actions={actions} currentData={employee} />
        </div>
        }
      </div>
    </div>
  )
};

EmployeeCard.propTypes = {
  defaultImage: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func),
  employee: PropTypes.objectOf(PropTypes.any)
};


export default EmployeeCard;

