import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
  const callbackCached = useRef<Function>();
  // mouted时存储callback
  useEffect(() => {
    callbackCached.current = callback;
  });

  useEffect(() => {
    function tick() {
      callbackCached.current && callbackCached.current();
    }
    // clear interval when delay's 0
    if (delay) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
