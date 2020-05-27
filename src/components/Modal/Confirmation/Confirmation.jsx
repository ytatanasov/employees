import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import Button from '../../Button/Button';

import styles from './Confirmation.module.scss'

const Confirmation = ({ message, success, isModalShown, closeModal }) => (
  isModalShown
    ? (
      <Modal
        title="Confirmation"
        isModalShown={isModalShown}
        closeModal={closeModal}
      >
        <div className={styles.message}>{message}</div>
        <div className={styles.buttons}>
          <Button handleClick={success} content="Yes" />
          <Button handleClick={closeModal} danger content="No" />
        </div>
      </Modal>
    )
    : null
);

Confirmation.propTypes = {
  message: PropTypes.string,
  isModalShown: PropTypes.bool,
  success: PropTypes.func,
  closeModal: PropTypes.func
};

export default Confirmation;
