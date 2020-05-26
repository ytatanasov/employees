import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';

import EmployeeCard from '../EmployeeCard/EmployeeCard';
import Confirmation from '../../../../components/Modal/Confirmation/Confirmation';
import useModal from '../../../../components/Modal/useModal';

import { ROUTES } from '../../../../utils/constants';
import { employeeDelete, employeeGet } from '../../employee.service';

import defaultImage from '../../../../assets/default-avatar.png';
import styles from './Employee.module.scss';

const Employee = ({ changeTmpEmployee }) => {
  const [employee, setEmployee] = useState(null);
  const { isModalShown, closeModal, openModal } = useModal();
  const { id } = useParams();
  const history = useHistory();

  /**
   * Gets single employee by id and updates state
   * @type {Function}
   */
  const getEmployee = useCallback(async () => {
    const data = await employeeGet(id);
    setEmployee(data);
  }, [id]);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]);

  /**
   * Calls callback to update `tmpEmployee` so it could be edited
   * and redirects to `createPage`
   * @param {Object} employee
   */
  const editEmployee = employee => {
    changeTmpEmployee(employee);
    history.push(ROUTES.employeesCreate);
  };

  /**
   * Deletes employee by given id
   * and redirects to `employees` page
   * @param employeeId
   * @returns {Promise<void>}
   */
  const deleteEmployee = async employeeId => {
    await employeeDelete(employeeId);
    history.push(ROUTES.employees)
  };

  return (
    <section className={styles.EmployeeWrapper}>
      <Confirmation
        message={`Are you sure want to remove this employee?`}
        success={() => deleteEmployee(employee.id)}
        isModalShown={isModalShown}
        closeModal={closeModal}
      />
      {employee
      && (
        <EmployeeCard
          defaultImage={defaultImage}
          actions={{
            edit: editEmployee,
            delete: openModal
          }}
          employee={employee}
        />
      )}
    </section>
  )
};

Employee.propTypes = {
  changeTmpEmployee: PropTypes.func
};

export default Employee;

