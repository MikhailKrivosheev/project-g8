import classNames from 'classnames';
import React from 'react';

export default function DeleteButton({ onClick, className }: any) {
  const buttonClassNames = classNames(
    'contest-radio__delete-button',
    className
  );

  return (
    <button className={buttonClassNames} type="button" onClick={onClick}>
      <svg
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="16" fill="#EEEAE7" />
        <path
          d="m10 10 6 6 6-6M10 22l6-6 6 6"
          stroke="#201F1E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
