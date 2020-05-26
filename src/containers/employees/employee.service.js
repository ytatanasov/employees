import { URL_EMPLOYEE } from '../../utils/constants';
import request from '../../utils/request';

/**
 * Sends request to:
 * get a single employee if `id` is passed
 * or to get all employees otherwise
 * @param {Number} id
 * @returns {Promise<*>}
 */
export const employeeGet = async id => {
  const url = id
    ? `${URL_EMPLOYEE}/${id}`
    : URL_EMPLOYEE;

  return await request(url);
};

/**
 * Sends request to:
 * updates a single employee if `employee` is passed
 * or create a new one otherwise
 * @param {Object} employee
 * @returns {Promise<*>}
 */
export const employeeAdd = async employee => {
  const method = employee.id ? 'PUT' : 'POST';
  const url = employee.id
    ? `${URL_EMPLOYEE}/${employee.id}`
    : URL_EMPLOYEE;

  return await request(url, {
    method: method,
    body: JSON.stringify(employee),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

/**
 * Sends request to delete an employee by given id
 * @param {Number} id
 * @returns {Promise<void>}
 */
export const employeeDelete = async id => {
  await request(`${URL_EMPLOYEE}/${id}`, {
    method: 'DELETE'
  });
};
