import React from 'react';
import cn from 'classnames';
import { IArrowIcon } from './types';

export default function ArrowIcon({ color, className }: IArrowIcon) {
  const classNames = cn(
    'icon-arrow',
    {
      [`icon-arrow--${color}`]: color,
    },
    className
  );
  return (
    <svg
      className={classNames}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 25"
    >
      <path d="M29.1 26.2L26.7 23.8L35.76 14.8H3.57628e-07V11.5H35.7L26.7 2.5L29.1 0.1L42 13V13.3L29.1 26.2Z" />
    </svg>
  );
}
