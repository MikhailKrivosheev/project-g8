/* eslint-disable no-nested-ternary */
import { Box, makeStyles } from '@material-ui/core';
import BreadCrumbsWrapper from 'Components/LocalBreadcrumbs/Wrapper';
import routes from 'Dictionaries/routes';
import useQueryParams from 'Hooks/useQueryParams';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    position: 'relative',
  },
}));

export default function FormLayout({ children, condition, context: Context }) {
  const classes = useStyles();
  const { seasonId, contestId, seasonName, contestName } = useQueryParams();

  return (
    <Context.Consumer>
      {([state]) => (
        <>
          <BreadCrumbsWrapper
            backLinkRoute={`${routes.nominations(
              seasonId,
              contestId
            )}?season_name=${seasonName}&contest_name=${contestName}`}
          />
          <Box p={2} className={classes.root}>
            {() => (condition ? state && children : children)}
          </Box>
        </>
      )}
    </Context.Consumer>
  );
}
