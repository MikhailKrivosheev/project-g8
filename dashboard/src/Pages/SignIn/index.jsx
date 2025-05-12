import { CircularProgress, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import { UserContext } from 'Context/global/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import utilities from 'Utilities';
import Form from './Form';

export default function SignIn() {
  // const history = useHistory();
  const { search } = useLocation();
  const [, setUser] = useContext(UserContext);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const fetchTokenComplete = async (tokenSearch) => {
      const response = await Api.get(Api.routes.tokenComplete(), {
        token: tokenSearch,
      });
      utilities.apiTokenStorage.set(response.results.api_token);
      const profileResponse = await Api.get(Api.routes.profile());
      setUser({ logged: true, ...profileResponse.results });
    };

    if (search) {
      const { tokenSearch } = utilities.params.toObject(search);
      if (tokenSearch) {
        setToken(true);
        fetchTokenComplete(tokenSearch);
      }
    }
  }, []);

  return (
    <>
      <Grid
        container
        xs={12}
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <Typography style={{ width: 'auto' }} variant="h1">
          Вход
        </Typography>
        {!token ? <Form /> : <CircularProgress />}
      </Grid>
    </>
  );
}
