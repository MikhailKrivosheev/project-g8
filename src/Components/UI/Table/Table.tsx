/* eslint-disable react/no-array-index-key */
import React from 'react';
import cn from 'classnames';

interface MinTableItem {
  id?: number | string;
}

// eslint-disable-next-line no-unused-vars
type TCustomCell<T extends MinTableItem> = (it: T) => React.ReactNode;

interface ITable<T extends MinTableItem> {
  className?: string;
  data: T[];
  headers?: string[];
  cells?: TCustomCell<T>[];
}

export default function Table<T extends MinTableItem>({
  className,
  headers,
  data,
  cells,
}: ITable<T>) {
  const tableClassName = cn('table', className);

  return (
    <table className={tableClassName}>
      <thead className="table__head">
        {headers?.map((headerValue, index) => (
          <th className="table__header" key={index}>
            {headerValue}
          </th>
        ))}
      </thead>
      <tbody>
        {data?.map((row) => {
          return (
            <tr className="table__row" key={row.id?.toString()}>
              {cells?.map((cell, index) => {
                return (
                  <td className="table__cell" key={index}>
                    {cell(row)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
