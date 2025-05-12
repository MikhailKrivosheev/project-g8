import React, { forwardRef, HTMLAttributes } from 'react';
import cn from 'classnames';

// eslint-disable-next-line no-unused-vars
type CellType = (row: object) => React.ReactNode;

interface ICustomTable extends HTMLAttributes<HTMLDivElement> {
  headers: string[];
  data: object[];
  cells: CellType[];
}

type ArrayHeadersType = Pick<ICustomTable, 'headers'>;

const TableHeader = ({ headers }: ArrayHeadersType) => {
  return (
    <div className="custom-table__head">
      {headers.map((header, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <span className="custom-table__head-cell" key={index}>
          {header}
        </span>
      ))}
    </div>
  );
};

function CustomTable(props: ICustomTable, ref: any) {
  const { className, headers, data, cells } = props;
  const classNames = cn('custom-table', className);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={classNames} ref={ref}>
      {headers && <TableHeader headers={headers} />}
      {data?.map((row, indexRow) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div className="custom-table__row" key={indexRow}>
            {cells.map((cell, indexCell) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div className="custom-table__row-cell" key={indexCell}>
                  {cell(row)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef(CustomTable);
