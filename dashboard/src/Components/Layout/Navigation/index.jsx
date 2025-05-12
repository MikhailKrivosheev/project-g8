import {
  Divider,
  Drawer,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { UserContext } from 'Context/global/UserContext';
import routes from 'Dictionaries/routes';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import utilities from 'Utilities';
import logo from './logo.svg';

const COMMUNITY = {
  [`${routes.users()}`]: 'Пользователи',
  [`${routes.personalArea()}`]: 'ЛК пользователя',
};

const CONTENT = {
  [`${routes.editableContent()}`]: 'Редактируемое',
  [`${routes.sponsorsPages()}`]: 'Спонсоры и партнеры',
  [`${routes.costs()}`]: 'Блоки стоимости',
  [`${routes.articles()}`]: 'Журнал',
  [`${routes.albums()}`]: 'Галерея',
};

const CONTEST = {
  [`${routes.seasons()}`]: 'Конкурсы',
  [`${routes.works()}`]: 'Работы',
  [`${routes.votingLogs()}`]: 'Голосование',
};

const CONFERENCE = {
  [`${routes.reports()}`]: 'Доклады',
  [`${routes.sections()}`]: 'Секции',
  [`${routes.places()}`]: 'Места проведения',
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: utilities.constants.NAVIGATION_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: utilities.constants.NAVIGATION_WIDTH,
    boxSizing: 'border-box',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function NavigationList() {
  const classes = useStyles();
  const [user] = useContext(UserContext);
  if (!user.logged) {
    return null;
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <Toolbar className={classes.toolbar}>
        <NavLink to={routes.home()}>
          <img src={logo} alt="logo" />
        </NavLink>
      </Toolbar>

      <Divider />
      <Typography variant="h4">Пользователи</Typography>
      {Object.entries(COMMUNITY).map(([key, value]) => (
        <NavLink
          key={key}
          to={key}
          className="navigationLink"
          activeClassName="navigationLink-is-active"
        >
          {value}
        </NavLink>
      ))}
      <Divider />
      <Typography variant="h4">Контент</Typography>
      {Object.entries(CONTENT).map(([key, value]) => (
        <NavLink
          key={key}
          to={key}
          className="navigationLink"
          activeClassName="navigationLink-is-active"
        >
          {value}
        </NavLink>
      ))}
      <Divider />
      <Typography variant="h4">Конкурс</Typography>
      {Object.entries(CONTEST).map(([key, value]) => (
        <NavLink
          key={key}
          to={key}
          className="navigationLink"
          activeClassName="navigationLink-is-active"
        >
          {value}
        </NavLink>
      ))}
      <Divider />
      <Typography variant="h4">Конференция</Typography>
      {Object.entries(CONFERENCE).map(([key, value]) => (
        <NavLink
          key={key}
          to={key}
          className="navigationLink"
          activeClassName="navigationLink-is-active"
        >
          {value}
        </NavLink>
      ))}
      <Divider />
    </Drawer>
  );
}
