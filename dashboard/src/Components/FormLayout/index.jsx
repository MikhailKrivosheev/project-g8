/* eslint-disable no-nested-ternary */
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import BreadCrumbs from 'Components/Breadcrumbs';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    position: 'relative',
  },
}));

export default function FormLayout({
  children,
  condition,
  context: Context,
  breadCrumbsExact,
  title,
}) {
  const classes = useStyles();

  return (
    <Context.Consumer>
      {([state]) => (
        <>
          <Typography variant="h1" gutterBottom>
            {condition ? state && title?.(state) : title?.(null)}
          </Typography>
          <BreadCrumbs
            context={Context}
            condition={condition}
            exact={breadCrumbsExact}
          />

          <Box p={2} className={classes.root}>
            {(boxProps) => (
              <Paper {...boxProps}>
                {condition ? state && children : children}
              </Paper>
            )}
          </Box>
        </>
      )}
    </Context.Consumer>
  );
}
