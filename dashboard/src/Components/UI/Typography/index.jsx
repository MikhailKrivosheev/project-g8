import cn from 'classnames';
import { createElement } from 'react';

export default function Typography({
  children,
  className,
  color = 'black',
  tag = 'p',
  type,
  size,
  ...props
}) {
  const typographyClassNames = cn('text', className, {
    [`text-${type}`]: type,
    [`text-${type}--${size}`]: type && size,
    [`text--${color}`]: color,
  });
  return createElement(
    tag,
    { className: typographyClassNames, ...props },
    children
  );
}
