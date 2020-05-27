import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import Button from '../Button/Button';
import useEventListener from '../../utils/hooks/useEventListener';

import styles from './Modal.module.scss';

const Modal = ({
  isModalShown,
  title,
  children,
  closeModal
}) => {
  const modalEl = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  });

  const handleClickOutside = e => {
    if (modalEl && modalEl.current && !modalEl.current.contains(e.target)) {
      closeModal();
    }
  };

  useEventListener('click', handleClickOutside, document);

  return (
    isModalShown
      ? createPortal(
      <>
        <div className={styles.overlay} />
        <div className={styles.ModalWrapper}>
          <div ref={modalEl} className={styles.modal}>
            <div className={styles.header}>
              <h1>{title}</h1>
              <Button handleClick={closeModal} md icon lite content="&times;" />
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
  closeModal: PropTypes.func
};

export default Modal;
