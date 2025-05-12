import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import PagePagination from './Pagination';
import Table from './Table';

export default function PageTable({
  columns,
  data,
  meta,
  updatePagination,
  standalone,
}) {
  if (!data) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress fontSize="large" color="secondary" />
      </Grid>
    );
  }

  return (
    <>
      <Table data={data} columns={columns} />
      {!standalone && (
        <PagePagination meta={meta} updatePagination={updatePagination} />
      )}
    </>
  );
}
