import cn from 'classnames';
import React from 'react';
import useTranslate from 'Hooks/useTranslate';

interface IDescription extends React.HTMLAttributes<HTMLDivElement> {
  sizeName?: 'l' | 'm' | 's' | 'xs';
  className?: string;
  marginSizeName?: 'l' | 'm' | 's' | 'xs';
  dangerHTML?: string;
  color?: 'gray' | 'green';
}

const Description = ({
  sizeName,
  children,
  className,
  color,
  marginSizeName,
  dangerHTML,
}: IDescription) => {
  const translate = useTranslate();
  const descriptionClassName = cn('description', className, {
    [`description--${sizeName}`]: sizeName,
    [`description--${color}`]: color,
    [`description--margin--${marginSizeName}`]: marginSizeName,
  });

  return dangerHTML ? (
    <p
      className={descriptionClassName}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: translate(dangerHTML as string) }}
    />
  ) : (
    <p className={descriptionClassName}>
      {translate(children as string) || children}
    </p>
  );
};

export default Description;
