import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import routes from 'Dictionaries/routes';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Api from 'Api';
import { UserContext } from 'Context/global/UserContext';
import Utilities from 'Utilities';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  quit: {
    '&:hover': {
      background: 'none',
    },
  },
}));

export default function SignOut() {
  // const { runApi, status } = useApi();
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const classes = useStyles();

  const onClick = async () => {
    await Api.post(Api.routes.signout());
    Utilities.apiTokenStorage.remove();
    Utilities.cookie.removeByName('sid');
    setUser((prev) => ({ ...prev, logged: false }));
    history.push(routes.signin());
    // runApi('auth.signout').then(() => {
    //   utilities.apiTokenStorage.remove();
    //   setUser((prev) => ({ ...prev, logged: false }));
    //   history.push(routes.signin);
    // });
  };

  return (
    <IconButton
      // disabled={status === 'pending'}
      onClick={onClick}
      disableRipple
      color="inherit"
      className={classes.quit}
    >
      <Typography variant="h5" style={{ marginRight: '10px' }}>
        ВЫЙТИ
      </Typography>
      <ExitToAppIcon fontSize="medium" />
    </IconButton>
  );
}
