import cn from 'classnames';
import React from 'react';

interface ISpinnerProps {
  size?: 's' | 'm' | 'l';
  color?: 'white' | 'black' | 'gray';
  className?: string;
}

export default function Spinner({
  size = 'm',
  color = 'white',
  className,
}: ISpinnerProps) {
  const classNames = cn(
    'spinner',
    {
      [`spinner--${size}`]: size,
      [`spinner--${color}`]: color,
    },
    className
  );

  return (
    <div className={classNames}>
      <div className="spinner__circle"></div>
    </div>
  );
}
