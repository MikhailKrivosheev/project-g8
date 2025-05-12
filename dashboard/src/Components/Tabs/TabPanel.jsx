import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
}));

export default function TabPanel({ value, index, children, renderAll }) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {(renderAll ? true : value === index) && (
        <Grid container>
          {children?.length > 1
            ? [...children].map((child, childIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid key={childIndex} item xs={12} lg={12}>
                  {child}
                </Grid>
              ))
            : [children].map((child, childIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid key={childIndex} item xs={12} lg={12}>
                  {child}
                </Grid>
              ))}
        </Grid>
      )}
    </div>
  );
}
