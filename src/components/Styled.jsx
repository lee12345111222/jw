import { useMemo } from 'react';

import { Select } from 'antd';
const { Option } = Select;

export const Selector = ({
  selection,
  dropdownClassName,
  onChange,
  defaultValue
}) => {
  const optionList = useMemo(
    () =>
      selection.map((item) => (
        <Option value={item} key={item}>
          {item}
        </Option>
      )),
    [selection]
  );

  return (
    <Select
      defaultValue={defaultValue}
      dropdownClassName={dropdownClassName}
      onChange={(val) => onChange(val)}
    >
      {optionList}
    </Select>
  );
};
