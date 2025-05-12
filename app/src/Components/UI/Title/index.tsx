import cn from 'classnames';
import React from 'react';
import useTranslate from 'Hooks/useTranslate';

interface ITitle extends React.HTMLProps<HTMLTitleElement> {
  sizeName?: 'l' | 'm' | 's' | 'semi-m' | 'semi-s' | 'xs';
  tag?: string;
  align?: 'left' | 'center' | 'right';
  marginSizeName?: 'l' | 'm' | 's' | 'xs' | 'xss';
  dangerHTML?: string;
}

export default function Title({
  children,
  className,
  sizeName,
  marginSizeName,
  align,
  dangerHTML,
  tag = 'h2',
}: ITitle) {
  const translate = useTranslate();
  const titleClassName = cn('title', className, {
    [`title--${sizeName}`]: sizeName,
    [`title--${align}`]: align,
    [`title--margin--${marginSizeName}`]: marginSizeName,
  });

  return dangerHTML
    ? React.createElement(tag, {
        className: titleClassName,
        dangerouslySetInnerHTML: { __html: translate(dangerHTML as string) },
      })
    : React.createElement(
        tag,
        {
          className: titleClassName,
        },
        translate(children as string) || children
      );
}
