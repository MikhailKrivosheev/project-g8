import cn from 'classnames';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';

interface IFooterLink {
  pdf?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function FooterLink({ pdf, children, className }: IFooterLink) {
  const FooterLinkClassName = cn('footer__link', className);
  const translate = useTranslate();

  return (
    <a
      href={pdf}
      target="_blank"
      rel="noreferrer"
      className={FooterLinkClassName}
    >
      {translate(children as string) || children}
    </a>
  );
}
