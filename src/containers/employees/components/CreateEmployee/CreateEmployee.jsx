import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Form from '../../../../components/Form/Form';

import { EMPLOYEES_FORM_CONFIG, ROUTES } from '../../../../utils/constants';
import { deepCopy } from '../../../../utils/helpers';
import { employeeAdd } from '../../employee.service';

import styles from './CreateEmployee.module.scss';

const CreateEmployee = ({ tmpEmployee }) => {
  const history = useHistory();

  const formSubmit = async formData => {
    const data = await employeeAdd(formData);
    history.push(`${ROUTES.employee}/${data.id}`);
  };

  const title = `${tmpEmployee ? 'Edit' : 'Create'} Employee`;

  return (
    <section className={styles.CreateWrapper}>
      <section className={styles.card}>
        <h1>{title}</h1>
        <Form
          formData={deepCopy(EMPLOYEES_FORM_CONFIG)}
          handleSubmit={formSubmit}
          initialValues={tmpEmployee || null}
        />
      </section>
    </section>
  );
};

CreateEmployee.propTypes = {
  tmpEmployee: PropTypes.objectOf(PropTypes.any)
};

export default CreateEmployee;
