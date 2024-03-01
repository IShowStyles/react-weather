import { FC } from 'react';

interface IPopupButton {
  onClick?: () => void;
  type: 'reset' | 'submit' | 'button';
  classes: string;
  text: string;
}

const CommonButton: FC<IPopupButton> = ({ onClick, text, classes, type }) => (
  <button type={type} className={classes} onClick={onClick}>
    {text}
  </button>
);

export { CommonButton };
