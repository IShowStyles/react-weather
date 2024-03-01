import { FC, useEffect, useId, useState } from 'react';
import { ICommonInput } from './CommonInput';
import { FaSearch } from 'react-icons/fa';

const CommonInput: FC<ICommonInput> = ({ value, setValue, type, label }) => {
  const ids = useId();
  const [inputStates, setInputStates] = useState({
    focus: false,
    blur: true,
    showLabel: true,
  });

  const handleFocus = () => {
    setInputStates({
      ...inputStates,
      focus: true,
      blur: false,
    });
  };

  const handleBlur = () => {
    setInputStates({
      ...inputStates,
      focus: false,
      blur: true,
    });
  };

  useEffect(() => {
    const valBoolean = value.length > 0 || !inputStates.focus;
    setInputStates({
      ...inputStates,
      showLabel: valBoolean,
    });
  }, [setValue]);

  useEffect(() => {
    setInputStates({
      ...inputStates,
      showLabel: false,
    });
  }, []);

  console.log(inputStates);

  return (
    <div className='input__wrapper'>
      <label htmlFor={ids} className={inputStates.showLabel ? 'focused' : ''}>
        {' '}
        <div className='icon'>
          <FaSearch />
        </div>
        {!inputStates.showLabel && <p>{label}</p>}
      </label>
      <div className='input__inner'>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={({ target: { value } }) => {
            setValue(value);
          }}
          value={value}
          type={type}
        />
      </div>
    </div>
  );
};

export { CommonInput };
