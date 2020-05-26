import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Button from '../../Button/Button';

import styles from './Confirmation.module.scss'

const Confirmation = ({ message, success, isModalShown, toggleModal }) => (
  <Modal
    title="Confirmation"
    isModalShown={isModalShown}
    toggleModal={toggleModal}
  >
    <div className={styles.message}>{message}</div>
    <div className={styles.buttons}>
      <Button handleClick={success} content="Yes" />
      <Button handleClick={toggleModal} danger content="No" />
    </div>
  </Modal>
);

Confirmation.propTypes = {
  message: PropTypes.string,
  isModalShown: PropTypes.bool,
  success: PropTypes.func,
  toggleModal: PropTypes.func
};

export default Confirmation;
