/* eslint-disable react/no-unescaped-entities */
import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  row: {
    padding: '20px 0 35px',
    border: '1px solid #eeeeee',
    borderLeft: 0,
    borderRight: 0,
  },
  rowFlex: {
    padding: '20px 0 35px',
    border: '1px solid #eeeeee',
    borderLeft: 0,
    borderRight: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  link: {
    marginTop: '4px',
    color: '#0028e0',
    fontSize: '12px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'all ease 0.2s',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
}));

export default function Home() {
  const classes = useStyles();
  const [season, setSeason] = useState();

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await Api.get(Api.routes.seasonCurrent(), {});
        setSeason(response.results);
      } catch (error) {
        console.log(error, 'error');
      }
    };

    fetchSeason();
  }, []);

  return (
    <>
      <Typography style={{ width: 'auto', marginBottom: '36px' }} variant="h1">
        G8 — фестиваль креативных индустрий
      </Typography>

      <Box className={classes.row}>
        <Typography variant="h2">Текущий сезон: {season?.year}</Typography>
        <p>Текущий этап: {season?.contest_stage_code}</p>
      </Box>

      <Box className={(classes.row, classes.rowFlex)}>
        <Typography variant="h2">
          ДОКЛАДОВ: {season?.reports_count || '0'}
        </Typography>
        <Link className={classes.link} to={routes.reports()}>
          Все доклады
        </Link>
      </Box>
      <Box className={(classes.row, classes.rowFlex)}>
        <Typography variant="h2">
          Участников: {season?.account_count || '0'}
        </Typography>
        <Link className={classes.link} to={routes.users()}>
          Все участники
        </Link>
      </Box>
      <Box className={(classes.row, classes.rowFlex)}>
        <Box>
          <Typography variant="h2">
            Работ: {season?.works_count || '0'}
          </Typography>
          <ul className={classes.list}>
            <li>
              В статусе "Одобрено": {season?.works_confirmed_count || '0'}
            </li>

            <li>
              В статусе "На модерации": {season?.works_moderation_count || '0'}
            </li>

            <li>
              В статусе "Не оплачено": {season?.works_unpaid_count || '0'}
            </li>

            <li>В статусе "Черновик": {season?.works_draft_count || '0'}</li>

            {/* <li>
              Кол-во отжюренных на 1-ом этапе:{' '}
              {season?.works_confirmed_count || '0'}
            </li>

            <li>
              Кол-во работ в лонг листе: {season?.works_longlist_count || '0'}
            </li>

            <li>
              Кол-во работ в шорт листе: {season?.works_shortlist_count || '0'}
            </li> */}
          </ul>
        </Box>
        <Link className={classes.link} to={routes.works()}>
          Все работы
        </Link>
      </Box>
    </>
  );
}
