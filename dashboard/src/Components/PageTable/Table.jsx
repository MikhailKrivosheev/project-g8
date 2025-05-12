import {
  Paper,
  Table as MaUTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import { useTable, useFlexLayout } from 'react-table';

const useStyles = makeStyles(() => ({
  root: {
    wordBreak: 'break-word',
  },
}));

export default function Table({ data, columns }) {
  const classes = useStyles();
  const defaultColumn = useMemo(
    () => ({
      minWidth: 200,
      maxWidth: 500,
    }),
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
      },
      useFlexLayout
    );

  return (
    <TableContainer component={Paper}>
      <MaUTable {...getTableProps()} className={classes.root}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <TableCell
                    style={{
                      minWidth: column.minWidth,
                    }}
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
}
