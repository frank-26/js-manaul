import React, { useMemo } from 'react';
import { Radio } from 'antd';
const useRadios = (vm: Map<number, string>) =>
  useMemo(
    () =>
      Array.from(vm).map(item => (
        <Radio value={item[0]} key={item[0]}>
          {item[1]}
        </Radio>
      )),
    [vm]
  );
export default useRadios;
