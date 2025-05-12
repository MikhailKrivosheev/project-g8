import React from 'react';
import cn from 'classnames';

interface IPlus {
  color?: string;
  className?: string;
}

export default function Plus({ color, className }: IPlus) {
  const classNames = cn('icon-plus', className);
  return (
    <svg
      className={classNames}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0621 20.4655C10.3843 21.3361 11.6157 21.3361 11.9379 20.4655L14.0815 14.6723C14.1828 14.3986 14.3986 14.1828 14.6723 14.0815L20.4655 11.9379C21.3361 11.6157 21.3361 10.3843 20.4655 10.0621L14.6723 7.91849C14.3986 7.8172 14.1828 7.60139 14.0815 7.32767L11.9379 1.53451C11.6157 0.663889 10.3843 0.663888 10.0621 1.53451L7.91849 7.32767C7.8172 7.60139 7.60139 7.8172 7.32767 7.91848L1.53451 10.0621C0.663889 10.3843 0.663888 11.6157 1.53451 11.9379L7.32767 14.0815C7.60139 14.1828 7.8172 14.3986 7.91848 14.6723L10.0621 20.4655Z"
        fill={color}
      />
    </svg>
  );
}
