import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Layout from './Layout/Layout';
import Employees from '../../employees/components/Employees/Employees';
import Employee from '../../employees/components/Employee/Employee';
import CreateEmployee from '../../employees/components/CreateEmployee/CreateEmployee';

import { ROUTES } from '../../../utils/constants';

const App = () => {
  const [tmpEmployee, setTmpEmployee] = useState(null);

  /**
   * Sets temporary employee which is passed to `CreateEmployee` component
   * @param {Object} value
   */
  const changeTmpEmployee = value => {
    setTmpEmployee(value ? value : null);
  };

  return (
    <Router>
      <Switch>
        <Layout>
          <Route
            path={ROUTES.employees}
            exact
            component={() => <Employees changeTmpEmployee={changeTmpEmployee} />}
          />
          <Route
            path={`${ROUTES.employee}/:id`}
            exact
            component={() => <Employee changeTmpEmployee={changeTmpEmployee} />}
          />
          <Route
            path={`${ROUTES.employeesCreate}`}
            exact
            component={() => <CreateEmployee tmpEmployee={tmpEmployee} />}
          />
          <Redirect to={ROUTES.employees} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default App;
