import {
  Box,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';
import routes from 'Dictionaries/routes';
import HelpIcon from '@material-ui/icons/Help';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: '12px',
    '& p': {
      margin: '10px 0 0',
    },
  },
  button: {
    padding: 0,
    '& span': {
      height: '100%',
    },
    '& a': {
      textDecoration: 'none',
      color: '#fff',
      height: '100%',
      padding: '8px 16px',
      lineHeight: 2,
    },
  },
  tooltipContainer: {
    marginLeft: '10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function Content() {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item className={classes.container}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <NavLink to={routes.sponsorTypes()}>
                Я хочу создать тип спонсора
              </NavLink>
            </Button>

            <Tooltip
              className={classes.tooltipContainer}
              title={
                <div style={{ fontSize: '14px' }} className={classes.tooltip}>
                  <p>Например, тип спонсора «Организатор» или «Партнеры»</p>
                </div>
              }
              placement="right"
            >
              <IconButton aria-label="delete">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item className={classes.container}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
            >
              <NavLink to={routes.sponsors()}>Я хочу создать спонсора</NavLink>
            </Button>

            <Tooltip
              className={classes.tooltipContainer}
              title={
                <div style={{ fontSize: '14px' }} className={classes.tooltip}>
                  <p>Добавить иконку спонсора и гиперссылку</p>
                </div>
              }
              placement="right"
            >
              <IconButton aria-label="delete">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
