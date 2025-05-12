/* eslint-disable react/button-has-type */
import cn from 'classnames';

// type = primary / secondary / third

export default function Button({
  className,
  variant = 'primary',
  type = 'button',
  onClick,
  children,
}) {
  const classes = cn('button', className, {
    [`button--${variant}`]: variant,
  });
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
