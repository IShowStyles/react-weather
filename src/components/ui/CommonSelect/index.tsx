import { ChangeEvent, FC, useId } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IFormData } from '../CommonPopup';

export interface ICommonSelect {
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  errorMsg: string;
  name: keyof IFormData;
  register: UseFormRegister<IFormData>;
  label: string;
}

const CommonSelect: FC<ICommonSelect> = ({ options, register, label, name, errorMsg, onChange }) => {
  const ids = useId();
  return (
    <div className='select'>
      <label htmlFor={ids}>
        <span>*</span> {label}
      </label>
      {errorMsg && <div className='error-message'>{errorMsg}</div>}
      <select id={ids} {...register(name)} onChange={onChange} name={name}>
        <option value=''>Please select a {name}</option>
        {options.map((elem, idx) => (
          <option key={idx} value={elem.toString()}>
            {elem}
          </option>
        ))}
      </select>
    </div>
  );
};

export { CommonSelect };
