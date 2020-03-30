import { useState } from 'react';

export function useLogState<S>(
  initialState: S | (() => S)
): [S, (state: S) => void] {
  const [state, setState] = useState(initialState);
  const setStateLog = (currentState: S) => {
    console.log('%cprev State: ', 'color:red', state);
    console.log('%ccurrent State: ', 'color:green', currentState);
    return setState(currentState);
  };
  return [state, setStateLog];
}
