import { useEffect, useRef } from 'react';

const useEventListener = (eventType, handler, target = document) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const internalHandler = event => {
      return handlerRef.current(event);
    };

    target.addEventListener(eventType, internalHandler);

    return () => {
      target.removeEventListener(eventType, internalHandler);
    };
  }, [eventType, target]);
};

export default useEventListener;
