import cn from 'classnames';
import ArrowIcon from 'Icons/ArrowIcon';
import React, { HTMLProps } from 'react';
import { Link } from 'react-router-dom';
import useTranslate from 'Hooks/useTranslate';

export type IButtonLink = HTMLProps<HTMLLinkElement>;

export default function CustomLink({
  children,
  className,
  href = '/',
  target,
  direction = 'right',
}: IButtonLink & { direction?: 'right' | 'left' }) {
  const classNames = cn('link', className, {
    [`link--${direction}`]: direction,
  });
  const translate = useTranslate();

  return (
    <Link to={href} target={target} className={classNames}>
      {translate(children as string) || children}
      <ArrowIcon />
    </Link>
  );
}
