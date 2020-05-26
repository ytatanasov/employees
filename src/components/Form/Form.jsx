import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import TextInput from './TextInput/TextInput';
import Button from '../Button/Button';

import styles from './Form.module.scss';
import { deepCopy, isInputValid } from '../../utils/helpers';

const Form = ({ handleSubmit, formData, initialValues }) => {
  const [formState, setFormState] = useState({});

  /**
   * Sets initial `formState`
   * if `initialValues` is passed fills the values in formState
   * @type {Function}
   */
  const setInitialFormState = useCallback(() => {
    const newFormState = deepCopy(formData);

    if (initialValues) {
      Object.keys(newFormState).forEach(key => {
        newFormState[key].value = initialValues[key];
      });
    }

    setFormState(newFormState);
  }, [formData, initialValues]);

  useEffect(() => {
    setInitialFormState();
  }, [setInitialFormState]);

  /**
   * Updates value of input in formState
   * @param {Object} event
   */
  const handleInputChange = event => {
    const { id, value } = event.target;
    const { type, required } = formState[id];
    const isValid = isInputValid(value, type, required);
    const newFormState = deepCopy(formState);

    newFormState[id].value = value;
    newFormState[id].error = !isValid;

    setFormState(newFormState);
  };

  /**
   * Handles input's blur and updates error prop in formState
   * @param {Object} event
   */
  const handleInputBlur = event => {
    const { id, value, type, required } = event.target;
    const newFormState = deepCopy(formState);
    const isValid = isInputValid(value, type, required);
    newFormState[id].error = !isValid;
    setFormState(newFormState);
  };

  /**
   * Checks if form is invalid
   * return {Boolean}
   */
  const isFormInvalid = () => Object.values(formState).some(input =>
    !isInputValid(input.value, input.type, input.required)
  );

  /**
   * Constructs the formData object and passes it to `handleSubmit` callback
   * @param {Object} event
   */
  const handleFormSubmit = event => {
    event.preventDefault();

    if (isFormInvalid()) {
      return;
    }

    const formData = {};
    Object.keys(formState).forEach(fieldKey => {
      formData[fieldKey] = formState[fieldKey].type === 'text'
        ? formState[fieldKey].value
        : +formState[fieldKey].value;
    });

    if (initialValues && initialValues.id) {
      formData.id = initialValues.id;
    }

    handleSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {Object.keys(formState).map(key => (
        <TextInput
          key={key}
          onChange={handleInputChange}
          onBlur={formState[key].required && handleInputBlur}
          {...formState[key]}
        />
      ))}
      <div className={styles.button}>
        <Button content="Submit" disabled={isFormInvalid()} />
      </div>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  formData: PropTypes.objectOf(PropTypes.any),
  initialValues: PropTypes.objectOf(PropTypes.any)
};

export default Form;
