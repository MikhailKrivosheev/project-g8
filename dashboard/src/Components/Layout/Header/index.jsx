import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserContext } from 'Context/global/UserContext';
import routes from 'Dictionaries/routes';
import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import utilities from 'Utilities';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IconButton } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import Signout from './SignOut';

const ROUTES = {
  [`${routes.accounts}`]: 'Аккаунты',
  [`${routes.faq}`]: 'Вопросы',
  [`${routes.cards}`]: 'Карточки',
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${utilities.constants.NAVIGATION_WIDTH})`,
    marginLeft: utilities.constants.NAVIGATION_WIDTH,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  user: {
    textTransform: 'uppercase',
    marginRight: '10px',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      background: 'none',
    },
  },
  quit: {
    '&:hover': {
      background: 'none',
    },
  },
}));

export default function Header() {
  const [user] = useContext(UserContext);
  const classes = useStyles();
  const location = useLocation();

  if (!user.logged) {
    return null;
  }

  const onClick = () => {
    window.location.href = routes.client();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {ROUTES[location.pathname]}
        </Typography>
        {user?.role && (
          <Box mx={5} className={classes.container}>
            <Typography variant="h5" className={classes.user}>
              {user?.role}
            </Typography>
            <AccountCircleIcon fontSize="medium" />
          </Box>
        )}
        <Box mx={5}>
          <IconButton
            onClick={onClick}
            disableRipple
            color="inherit"
            className={classes.container}
          >
            <Typography variant="h5" className={classes.user}>
              на сайт
            </Typography>
            <ArrowUpward fontSize="medium" />
          </IconButton>
        </Box>

        {/* {user.logged && <Signout />} */}
        <Signout />
      </Toolbar>
    </AppBar>
  );
}
