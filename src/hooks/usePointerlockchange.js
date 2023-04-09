import { useEffect, useRef } from 'react';

export default function usePointerlockchange(callback) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function pointerLockChange() {
      const isLock =
        document.pointerLockElement ||
        document.mozPointerLockElement ||
        document.webkitPointerLockElement;

      const current = savedCallback.current;
      current && current(!!isLock);
    }

    document.addEventListener('pointerlockchange', pointerLockChange, false);
    document.addEventListener('mozpointerlockchange', pointerLockChange, false);
    document.addEventListener(
      'webkitpointerlockchange',
      pointerLockChange,
      false
    );

    return () => {
      document.removeEventListener(
        'pointerlockchange',
        pointerLockChange,
        false
      );
      document.removeEventListener(
        'mozpointerlockchange',
        pointerLockChange,
        false
      );
      document.removeEventListener(
        'webkitpointerlockchange',
        pointerLockChange,
        false
      );
    };
  }, []);
}
