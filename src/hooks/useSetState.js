import { useCallback, useState } from 'react';

export default function useSetState(defaultState) {
  const [stateObject, setStateObject] = useState(defaultState);

  const setState = useCallback((patch) => {
    setStateObject((oldState) => {
      const newState = typeof patch === 'function' ? patch(oldState) : patch;
      return { ...oldState, ...newState };
    });
  }, []);

  return [stateObject, setState];
}
