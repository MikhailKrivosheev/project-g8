import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import useTableFilter from 'Hooks/useTableFilter';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

function getTotalPages(total, perPage) {
  return Math.ceil(total / perPage);
}

export default function NumberedPagination({
  meta,
  updatePagination,
  className,
}) {
  const [page, setPage] = useState(1);
  const filter = useTableFilter();
  const classes = useStyles();

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    updatePagination(page);
  }, [page]);

  if (!meta?.has_more_pages && page === 1) {
    return null;
  }

  return (
    <Box className={`${classes.root} ${className}`}>
      <Pagination
        count={getTotalPages(meta.total, meta.per_page) || 1}
        page={page}
        onChange={(event, value) => setPage(value)}
        size="large"
        shape="rounded"
      />
    </Box>
  );
}
