import React from 'react';
import { useSetRecoilState } from 'recoil';
import ThemeAtom from 'Recoil/Atoms/Theme';

export default function ThemeButton() {
  const setTheme = useSetRecoilState(ThemeAtom);

  return (
    <button
      type="button"
      onClick={() =>
        setTheme((prevTheme: string) =>
          prevTheme === 'dark' ? 'light' : 'dark'
        )
      }
      className="header__theme"
    >
      <svg
        width="16"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 14A6 6 0 0 0 8 2v12Z" fill="#201F1E" />
        <circle cx="8" cy="8" r="5" stroke="#201F1E" strokeWidth="2" />
      </svg>
    </button>
  );
}
