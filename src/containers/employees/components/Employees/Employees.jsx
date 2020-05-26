import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Table from '../../../../components/Table/Table';
import Confirmation from '../../../../components/Modal/Confirmation/Confirmation';
import useModal from '../../../../components/Modal/useModal';

import { deepCopy, sortByValue } from '../../../../utils/helpers';
import { ROUTES, TABLE_EMPLOYEES_HEADER } from '../../../../utils/constants';
import { employeeDelete, employeeGet } from '../../employee.service';

const Employees = ({ changeTmpEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [employeesToRender, setEmployeesToRender] = useState([]);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ sortBy: 'id', order: 'asc' });
  const [filterValue, setFilterValue] = useState('');

  const history = useHistory();
  const { isModalShown, toggleModal } = useModal();

  /**
   * Gets employees and updates state
   * @type {Function}
   */
  const getEmployees = useCallback(async () => {
    let data = await employeeGet();

    data = data.filter(employee => Object.keys(employee).length > 2);

    setEmployees(data);
    setEmployeesToRender(data);
  }, []);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  /**
   * Sort employees by given value and sortType
   * @param {String} sortBy
   * @param {String} sortType
   */
  const sortEmployees = (sortBy, sortType) => {
    const sortedEmployees = deepCopy(employeesToRender);
    const sortCoef = sortConfig.sortBy !== sortBy || sortConfig.order === 'desc' ? 1 : -1;

    setSortConfig({
      sortBy: sortBy,
      order: sortConfig.sortBy !== sortBy || sortConfig.order === 'desc' ? 'asc' : 'desc'
    });

    sortedEmployees.sort(sortByValue(sortBy, sortType, sortCoef));

    setEmployeesToRender(sortedEmployees);
  };

  /**
   * Filter employees by value of search input
   * @param {Object} event
   */
  const filterEmployees = event => {
    const value = event.target.value;
    let filteredEmployees = deepCopy(employees);

    filteredEmployees = filteredEmployees.filter(employee => {
      const target = employee.employee_name.toLowerCase();
      const filter = value.toLowerCase();

      return target.indexOf(filter) > -1;
    });

    setFilterValue(value);
    setEmployeesToRender(filteredEmployees);
  };

  /**
   * Calls callback to update `tmpEmployee` so it could be empty
   * and redirects to `createPage`
   */
  const addEmployee = () => {
    changeTmpEmployee();
    history.push(ROUTES.employeesCreate);
  };

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
   * Updates employeeId in the state so it could be deleted after confirmation
   * and opens confirmation modal
   * @param employeeId
   */
  const openConfirmationModal = employeeId => {
    setEmployeeToDeleteId(employeeId);
    toggleModal(true);
  };

  /**
   * Deletes employee by given id,
   * closes the modal
   * and redirects to `employees` page
   * @param employeeId
   * @returns {Promise<void>}
   */
  const deleteEmployee = async employeeId => {
    await employeeDelete(employeeId);
    toggleModal(false);
    await getEmployees();
  };

  return (
    <>
      <Confirmation
        message={`Are you sure want to remove this employee?`}
        success={() => deleteEmployee(employeeToDeleteId)}
        isModalShown={isModalShown}
        toggleModal={toggleModal}
      />
      <Table
        title="Employees"
        filterValue={filterValue}
        tableHeader={TABLE_EMPLOYEES_HEADER}
        tableData={employeesToRender}
        sortConfig={sortConfig}
        actions={{
          edit: editEmployee,
          delete: openConfirmationModal
        }}
        handleInputChange={filterEmployees}
        handleButtonClick={addEmployee}
        sortTableByColumn={sortEmployees} />
    </>
  )
};

Employees.propTypes = {
  changeTmpEmployee: PropTypes.func
};

export default Employees;

