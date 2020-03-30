import { useCallback, useState } from 'react';

export function useAutoFocus(dep: any) {
  const ref = useCallback(
    node => {
      if (node && dep) {
        node.focus();
      }
    },
    [dep]
  );
  return ref;
}

export function useRect(dep: any) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const target = useCallback(
    node => {
      if (node && dep) {
        const { height, width } = node.getBoundingClientRect();
        setHeight(height);
        setWidth(width);
      }
    },
    [dep]
  );
  return { height, width, target };
}
