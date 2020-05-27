import { useState } from 'react';

const useModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  /**
   * Set isModalShown to false
   */
  const closeModal = () => {
    setIsModalShown(false);
  };

  /**
   * Set isModalShown to true
   */
  const openModal = () => {
    setIsModalShown(true);
  };

  return {
    isModalShown,
    closeModal,
    openModal
  }
};

export default useModal;
