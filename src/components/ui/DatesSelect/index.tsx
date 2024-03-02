import { FC, useState } from 'react';
import { CommonSelect, ICommonSelect } from '../CommonSelect';

type DatesSelectType = Pick<ICommonSelect, 'onChange' | 'label' | 'errorMsg' | 'name'>;

interface IDatesSelect extends DatesSelectType {
  datesFn: () => string[];
}

const DatesSelect: FC<IDatesSelect> = ({ datesFn, errorMsg, label, name, onChange }) => {
  const [options] = useState(datesFn());
  return <CommonSelect options={options} label={label} name={name} onChange={onChange} errorMsg={errorMsg} />;
};

export { DatesSelect };
