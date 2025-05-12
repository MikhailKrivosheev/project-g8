import { IButtonFilled } from 'Components/UI/Button';
import ArrowIcon from 'Icons/ArrowIcon';
import React from 'react';
import { Link } from 'react-router-dom';

export default function ReturnButton({
  onClick,
  link,
}: Pick<IButtonFilled, 'onClick' | 'link'>) {
  if (link) {
    return (
      <Link to={link} className="return-button">
        <ArrowIcon />
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="return-button" type="button">
      <ArrowIcon />
    </button>
  );
}
