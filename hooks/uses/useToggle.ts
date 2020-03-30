import { useState } from 'react';

export function useToggle (
  initialValue: boolean = false
): [boolean, () => void] {
  const [visible, setVisible] = useState<boolean>(initialValue);
  function toggle() {
    setVisible(!visible);
  }
  return [visible, toggle];
}
