/* eslint-disable no-nested-ternary */
import { makeStyles } from '@material-ui/core';
import Api from 'Api';
import LocalBreadcrumbs from 'Components/LocalBreadcrumbs';
import routes from 'Dictionaries/routes';
import { useContext, useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: '90%',
    position: 'relative',
  },
}));

export default function Layout({
  children,
  context: Context,
  seasonId,
  contestId,
}) {
  const classes = useStyles();
  const [seasonYear, setSeasonYear] = useState();
  const [nominations] = useContext(Context);

  useEffect(() => {
    const fetchSeason = async () => {
      const response = await Api.get(Api.routes.season(seasonId));
      const results = await response?.results;
      setSeasonYear(results?.year);
    };
    fetchSeason();
  }, []);

  return (
    <>
      <LocalBreadcrumbs
        path={[seasonYear]}
        backLinkRoute={routes.seasons()}
        title={nominations.results?.[0]?.contest?.name_ru}
        editLink={routes.contestPage(seasonId, contestId)}
      />
      {children}
    </>
  );
}
