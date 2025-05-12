/* eslint-disable react/no-danger */
import cn from 'classnames';
import React, { ReactNode } from 'react';

interface IQuillText {
  dangerHTML: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'normal' | 'big';
  marginSizeName?: string;
  children?: ReactNode;
}

export default function QuillText({
  children,
  dangerHTML,
  className,
  align,
  size,
  marginSizeName,
}: IQuillText) {
  const holderClassName = cn('quill-text', className, {
    [`quill-text--${size}`]: size,
    [`quill-text--${align}`]: align,
    [`quill-text--margin--${marginSizeName}`]: marginSizeName,
  });

  return (
    <div className={holderClassName}>
      {children}
      {dangerHTML && (
        <div
          dangerouslySetInnerHTML={{ __html: dangerHTML }}
          suppressContentEditableWarning
        />
      )}
    </div>
  );
}
