import cn from 'classnames';
import React, { forwardRef, useRef } from 'react';

const baseClassName = 'section';

interface ISection {
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  isWide?: boolean;
  noMargin?: boolean;
  noRightPadding?: boolean;
  overflow?: 'hidden' | 'scroll';
}

const Section = (
  {
    children,
    className,
    fullWidth,
    overflow,
    noMargin,
    noRightPadding,
    isWide,
  }: ISection,
  ref?: React.Ref<HTMLDivElement>
) => {
  const localRef = useRef(null);
  const containerRef = ref || localRef;
  const sectionClassName = cn(baseClassName, className, {
    'section--full-width': fullWidth,
    'section--wide': isWide,
    'section--no-margin': noMargin,
    'section--no-right-padding': noRightPadding,
    [`section--overflow--${overflow}`]: overflow,
  });

  return (
    <section className={sectionClassName} ref={containerRef}>
      {children}
    </section>
  );
};

export default forwardRef(Section);
