import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { usePagination } from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import useTableFilter from 'Hooks/useTableFilter';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

export default function PagePagination({ meta, updatePagination }) {
  const [page, setPage] = useState(1);
  const filter = useTableFilter();
  const [disabled, setDisabled] = useState({
    previous: true,
    next: false,
  });
  const classes = useStyles();
  const { items } = usePagination({
    count: 0,
  });

  const handleClick = (type) => {
    if (type === 'previous') {
      setPage((prev) => prev - 1);
    } else {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filter]);

  useEffect(() => {
    updatePagination(page);
  }, [page]);

  useEffect(() => {
    setDisabled({
      previous: page === 1,
      next: !meta?.has_more_pages,
    });
  }, [meta]);

  if (page === 1 && !meta?.has_more_pages) {
    return null;
  }

  return (
    <Box className={classes.root}>
      {items.map((item) => (
        <PaginationItem
          size="large"
          key={item.type}
          {...item}
          onClick={() => handleClick(item.type)}
          disabled={disabled[item.type]}
        >
          {item.type}
        </PaginationItem>
      ))}
    </Box>
  );
}
