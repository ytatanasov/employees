import { useState } from 'react';

const useModal = () => {
  const [isModalShown, setIsModalShown] = useState(false);

  /**
   * Updates `isModalShown` in state by given value
   * @param {Boolean} value
   */
  const toggleModal = value => {
    setIsModalShown(value);
  };

  return {
    isModalShown,
    toggleModal
  }
};

export default useModal;
