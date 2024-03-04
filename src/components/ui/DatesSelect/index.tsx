import { FC, useState } from 'react';
import { CommonSelect, ICommonSelect } from '../CommonSelect';

type DatesSelectType = Pick<ICommonSelect, 'onChange' | 'label' | 'register' | 'errorMsg' | 'name'>;

interface IDatesSelect extends DatesSelectType {
  datesFn: () => string[];
}

const DatesSelect: FC<IDatesSelect> = ({ datesFn, errorMsg, register, label, name, onChange }) => {
  const [options] = useState(datesFn());
  return (
    <CommonSelect
      register={register}
      options={options}
      label={label}
      name={name}
      onChange={onChange}
      errorMsg={errorMsg}
    />
  );
};

export { DatesSelect };
