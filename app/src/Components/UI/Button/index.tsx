import cn from 'classnames';
import useTranslate from 'Hooks/useTranslate';
import ArrowIcon from 'Icons/ArrowIcon';
import PlusIcon from 'Icons/PlusIcon';
import StarIcon from 'Icons/StarIcon';
import React, { HTMLProps, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { TColors } from '../../../Icons/types';
import Spinner from '../Spinner';

export interface IButtonFilled extends HTMLProps<HTMLButtonElement> {
  color?: 'black' | 'white' | 'gray' | 'transparent';
  sizeName?: 's' | 'xs' | 'm' | 'l';
  id?: string;
  arrowColor?: TColors;
  type?: 'button' | 'submit' | 'reset';
  icon?: 'star' | 'plus';
  link?: string;
  circle?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  align?: 'left' | 'center' | 'right';
  sizeGrid?: 'm' | 'l';
  dataAttributes?: object;
  strached?: boolean;
  dataTcToken?: string;
  dataTcEvent?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  insideRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
  loading?: boolean;
}

const Icons = (props: Pick<IButtonFilled, 'icon' | 'arrowColor'>) => {
  const { icon = 'star', arrowColor = 'white' } = props;
  return (
    <>
      {icon === 'plus' ? <PlusIcon /> : <StarIcon />}
      <ArrowIcon color={arrowColor} />
    </>
  );
};

export default function Button({
  children,
  id,
  className,
  sizeName = 'm',
  circle,
  align,
  color = 'black',
  type = 'button',
  sizeGrid,
  icon,
  disabled,
  arrowColor,
  link,
  fullWidth,
  onClick,
  strached,
  insideRef,
  dataAttributes = {},
  loading = false,
}: IButtonFilled) {
  const classNames = cn(
    'button',
    {
      [`button--${color}`]: color,
      [`button--size-${sizeName}`]: sizeName,
      [`button--${align}`]: align,
      'button--no-icons': !icon,
      'button--circle': circle,
      'button--strached': strached,
      'button--full-width': fullWidth,
      'button--disabled': disabled && link,
      [`button--grid-wide-${sizeGrid}`]: sizeGrid,
    },
    className
  );
  const translate = useTranslate();

  if (link) {
    return (
      <Link
        id={id}
        ref={insideRef as React.Ref<HTMLAnchorElement>}
        to={link}
        className={classNames}
        {...dataAttributes}
      >
        {translate(children as string) || children}
        {icon && <Icons icon={icon} />}
      </Link>
    );
  }

  return (
    <button
      ref={insideRef as React.Ref<HTMLButtonElement>}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || loading}
      id={id}
      className={classNames}
      onClick={onClick}
      {...dataAttributes}
    >
      {translate(children as string) || children}
      {icon && <Icons icon={icon} arrowColor={arrowColor} />}
      {loading && (
        <Spinner size="s" color={color === 'black' ? 'white' : 'black'} />
      )}
    </button>
  );
}
