export const URL_BASE = 'https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api';
export const URL_EMPLOYEE = 'employee';

export const ROUTES = {
  employees: '/employees',
  employee: '/employee',
  employeesCreate: '/employees/create'
};

export const KEY_CODES = {
  enter: 13,
  space: 32
};

export const TABLE_OPTIONS = {
  singleActionWidth: 35,
  arrowsClasses: {
    asc: 'activeAscArrow',
    desc: 'activeDescArrow'
  }
};

export const TABLE_EMPLOYEES_HEADER = [
  {
    name: 'id',
    sortBy: 'id',
    dataKey: 'id'
  }, {
    name: 'name',
    sortBy: 'employee_name',
    sortType: 'string',
    dataKey: 'employee_name'
  }, {
    name: 'salary',
    sortBy: 'employee_salary',
    dataKey: 'employee_salary'
  }, {
    name: 'age',
    sortBy: 'employee_age',
    dataKey: 'employee_age'
  }
];

export const EMPLOYEES_FORM_CONFIG = {
  employee_name: {
    id: 'employee_name',
    label: 'Employee name',
    value: '',
    type: 'text',
    required: true,
    errorText: `Please enter the client's name!`
  },
  employee_salary: {
    id: 'employee_salary',
    label: 'Employee salary',
    value: '',
    type: 'number',
    required: true,
    errorText: `Please enter valid salary!`
  },
  employee_age: {
    id: 'employee_age',
    label: 'Employee age',
    value: '',
    type: 'number',
    required: true,
    errorText: `Please enter valid age!`
  },
  profile_image: {
    id: 'profile_image',
    label: 'Employee profile picture',
    value: '',
    type: 'text',
  },
};
