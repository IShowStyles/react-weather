import { ChangeEvent, FC } from 'react';

export interface ICommonSelect {
  options: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  errorMsg: string;
  name: string;
  label: string;
}

const CommonSelect: FC<ICommonSelect> = ({ options, name, errorMsg, onChange }) => {
  return (
    <div className='select'>
      <label htmlFor='city'>
        <span>*</span> City
      </label>
      {errorMsg && <div className='error-message'>{errorMsg}</div>}
      <select id='city' onChange={onChange} name={name}>
        <option value=''>Please select a city</option>
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
