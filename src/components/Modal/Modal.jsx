import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import Button from '../Button/Button';

import styles from './Modal.module.scss';

const Modal = ({
  isModalShown,
  title,
  children,
  toggleModal
}) => {
  const modalEl = useRef(null);

  useEffect(() => {
    isModalShown && (document.body.style.overflow = 'hidden');
    !isModalShown && (document.body.style.overflow = 'unset');
  }, [isModalShown]);

  return (
    isModalShown
      ? createPortal(
      <>
        <div className={styles.overlay} />
        <div className={styles.ModalWrapper}>
          <div ref={modalEl} className={styles.modal}>
            <div className={styles.header}>
              <h1>{title}</h1>
              <Button handleClick={() => toggleModal(false)} md icon lite content="&times;" />
            </div>
            {children}
          </div>
        </div>
      </>
      , document.body
      )
      : null
  )
};

Modal.propTypes = {
  title: PropTypes.string,
  isModalShown: PropTypes.bool,
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func
};

export default Modal;
