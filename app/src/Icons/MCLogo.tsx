import React from 'react';

interface IMCLogo {
  className: string;
}

export default function MCLogo({ className }: IMCLogo) {
  return (
    <svg
      className={className}
      viewBox="0 0 46 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="31.5" cy="14.5" r="14.5" fill="#F79E1B" />
      <circle cx="14.5" cy="14.5" r="14.5" fill="#EB001B" />
      <path
        d="M23 27C26.629 24.346 29 19.9606 29 15C29 10.0394 26.629 5.65396 23 3C19.371 5.65396 17 10.0394 17 15C17 19.9606 19.371 24.346 23 27Z"
        fill="#FF5F00"
      />
    </svg>
  );
}
