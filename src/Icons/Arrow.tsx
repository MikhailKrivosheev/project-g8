import React from 'react';

interface IArrow {
  color?: string;
  className?: string;
}

export default function Arrow({ color, className }: IArrow) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 27"
      fill="none"
      width="42"
      height="27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.1 26.2L26.7 23.8L35.76 14.8H3.57628e-07V11.5H35.7L26.7 2.5L29.1 0.1L42 13V13.3L29.1 26.2Z"
        fill={color}
      />
    </svg>
  );
}
