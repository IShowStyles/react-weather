import { FC } from 'react';

interface IPopupButton {
  onClick?: () => void;
  type: 'reset' | 'submit' | 'button';
  classes: string;
  text: string;
  dissabled?: boolean;
}

const CommonButton: FC<IPopupButton> = ({ onClick, dissabled, text, classes, type }) => (
  <button type={type} className={classes} disabled={dissabled} onClick={onClick}>
    {text}
  </button>
);

export { CommonButton };
