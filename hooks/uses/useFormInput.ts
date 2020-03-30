import React, { useState } from 'react';

export function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange
  };
}

export function useFormInputWithSet(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
    setValue
  };
}
