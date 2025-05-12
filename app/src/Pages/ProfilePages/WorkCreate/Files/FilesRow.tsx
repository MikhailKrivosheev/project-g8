import classNames from 'classnames';
import React from 'react';

interface IFilesRow {
  className?: string;
  gap?: number;
  columns?: number;
  children?: React.ReactNode;
  columnGap?: number;
  rowGap?: number;
}

export default function FilesRow({
  className,
  children,
  columns = 1,
  gap,
  columnGap,
  rowGap,
}: IFilesRow) {
  const rowClassNames = classNames('work-create__files-row', className);
  return (
    <div
      className={rowClassNames}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap,
        columnGap,
        rowGap,
      }}
    >
      {children}
    </div>
  );
}
