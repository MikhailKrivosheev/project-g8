/* eslint-disable no-nested-ternary */
import { Box, makeStyles } from '@material-ui/core';
import BreadCrumbsWrapper from 'Components/LocalBreadcrumbs/Wrapper';
import routes from 'Dictionaries/routes';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    position: 'relative',
  },
}));

export default function FormLayout({ children, condition, context: Context }) {
  const classes = useStyles();

  return (
    <Context.Consumer>
      {([state]) => (
        <>
          <BreadCrumbsWrapper backLinkRoute={routes.seasons()} />
          <Box p={2} className={classes.root}>
            {() => (condition ? state && children : children)}
          </Box>
        </>
      )}
    </Context.Consumer>
  );
}
