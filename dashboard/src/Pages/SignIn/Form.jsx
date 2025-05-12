import { DevTool } from '@hookform/devtools';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Api from 'Api';
import useAPIError from 'Hooks/useAPIError';
import Form from 'Components/Form';
import { UserContext } from 'Context/global/UserContext';
import routes from 'Dictionaries/routes';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Utilities from 'Utilities';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

export default function SignInForm() {
  const classes = useStyles();
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const onSubmit = async (values) => {
    Utilities.cookie.removeByName('sid');
    try {
      const response = await Api.post(Api.routes.signinStart(), values);
      Utilities.apiTokenStorage.set(response.results.api_token);
      setUser((prev) => ({ ...prev, logged: true }));
      const userResponse = await Api.get(Api.routes.profile());
      setUser((prev) => ({ ...prev, ...userResponse.results }));
      history.push(routes.home());
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Это поле обязательно для заполнения',
              validate: (value) =>
                Utilities.validate.email(value) || 'Некорректный email',
            }}
            render={({ field }) => (
              <TextField
                helperText={errors.email?.message}
                label="Email"
                type="email"
                fullWidth
                inputRef={field.ref}
                onChange={field.onChange}
                name={field.name}
                error={errors.email}
                margin="dense"
                required
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Это поле обязательно для заполнения',
            }}
            render={({ field }) => (
              <TextField
                helperText={errors?.password?.message}
                label="Пароль"
                type="password"
                fullWidth
                inputRef={field.ref}
                onChange={field.onChange}
                name={field.name}
                margin="dense"
                required
                error={!!errors?.password}
                inputProps={{
                  autoComplete: 'nope',
                  form: {
                    autoComplete: 'nope',
                  },
                }}
              />
            )}
          />
          <Button
            type="submit"
            disabled={!(isValid && !isSubmitting)}
            variant="contained"
            color="primary"
            startIcon={
              isSubmitting ? (
                <CircularProgress color="secondary" size={20} />
              ) : null
            }
          >
            Войти
          </Button>
          <DevTool control={control} />
        </Form>
      </Container>
    </>
  );
}
