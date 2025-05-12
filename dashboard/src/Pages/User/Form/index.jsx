import { DevTool } from '@hookform/devtools';
import {
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Api from 'Api';
import Form from 'Components/Form';
import Checkbox from 'Components/Form/Checkbox';
import EditorField from 'Components/Form/Editor';
import File from 'Components/Form/File';
import PhoneFormField from 'Components/Form/PhoneField';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import { UserContext } from 'Context/User';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import ContestSelect from './ContestSelect';
import { setDefaultValues } from './helpers';
import JuryTypeSelect from './JuryTypeSelect';
import RoleSelectField from './RoleSelect';
import StatusSelectField from './StatusSelect';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    marginBottom: '15px',
  },
});

export default function UserForm() {
  const [user, setUser] = useContext(UserContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(user),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    getValues,
    watch,
    formState: { isSubmitting },
  } = methods;
  const judgeWatcher = watch('roles');
  const judgeTypeWatcher = watch('judge_type');

  const { handleError } = useAPIError(setError);

  const updateUser = async (values) => {
    try {
      const response = await Api.put(Api.routes.user(user.id), values);
      setUser(response.results);
      enqueueSnackbar(
        `Данные пользователя "${response.results.first_name_ru} ${response.results.last_name_ru}" успешно обновлены`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createUser = async (values) => {
    try {
      const response = await Api.post(Api.routes.users(), values);
      // reset(setDefaultValues(response.results));
      setUser(response.results);
      enqueueSnackbar(
        `Пользователь "${response.results.first_name_ru} ${response.results.last_name_ru} успешно создан`,
        {
          variant: 'success',
        }
      );
      history.push(routes.userPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (user?.id) {
      updateUser(values);
    } else {
      createUser(values);
    }
  }

  function onError(errors) {
    const errorField = Object.values(errors).find((obj) => obj.ref.name);
    if (!errorField) return;
    const { name } = errorField.ref;
    const input = document.querySelector(`input[name=${name}]`);
    try {
      input.focus();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  const onButtonDeleteClick = () => {
    setOpenConfirmModal(true);
  };

  const handleClickShowPassword = () => {
    if (showPassword === false) {
      setShowPassword(true);
    } else {
      setShowPassword(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          className={classes.buttons}
        >
          <Grid item>
            {user && (
              <>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={onButtonDeleteClick}
                >
                  Удалить
                </Button>
                <ModalDelete
                  open={openConfirmModal}
                  setOpen={setOpenConfirmModal}
                  redirectLink={routes.users()}
                  deleteUrl={Api.routes.user(user.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <RoleSelectField name="roles" label="Роль пользователя" required />

        {(judgeWatcher.includes('judge') ||
          judgeWatcher.includes('chairman')) && (
          <ContestSelect name="contest_ids" label="Выберите категорию" />
        )}
        {(judgeWatcher.includes('speaker') ||
          judgeWatcher.includes('curator')) && (
          <>
            <Checkbox
              name="in_conference"
              label="Показывать в блоке «Конференция»"
            />
            <Checkbox
              name="in_category_and_nomination"
              label="Показывать в блоке «Категории и номинации»"
            />
          </>
        )}
        <StatusSelectField name="status" label="Статус пользователя" />
        <SimpleFormField
          variant="outlined"
          name="email"
          label="Email"
          type="email"
          required
        />
        <Grid container spacing={3} className={classes.container}>
          <Grid item xs={12}>
            <SimpleFormField
              variant="outlined"
              name="password"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>
        <SimpleFormField
          variant="outlined"
          name="first_name_ru"
          label="Имя пользователя (русский)"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="first_name_en"
          label="Имя пользователя (английский)"
        />
        <SimpleFormField
          variant="outlined"
          name="last_name_ru"
          label="Фамилия пользователя (русский)"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="last_name_en"
          label="Фамилия пользователя (английский)"
        />
        <SimpleFormField
          variant="outlined"
          name="company_ru"
          label="Компания"
        />
        <SimpleFormField
          variant="outlined"
          name="company_en"
          label="Компания (английский)"
        />
        <SimpleFormField
          variant="outlined"
          name="job_title_ru"
          label="Должность "
        />
        <SimpleFormField
          variant="outlined"
          name="job_title_en"
          label="Должность (английский)"
        />
        <EditorField variant="outlined" name="biography_ru" label="Биография" />
        <EditorField
          variant="outlined"
          name="biography_en"
          label="Биография (английский)"
        />
        <PhoneFormField variant="outlined" name="phone" label="Телефон" />
        <File name="image" label="Аватар" accept={['.png', '.jpg', '.jpeg']} />
        {judgeWatcher.includes('speaker') && (
          <File
            name="image_2"
            label="Аватар для блока 'Спикеры'"
            accept={['.png', '.jpg', '.jpeg']}
          />
        )}
        <SimpleFormField
          variant="outlined"
          name="facebook"
          label="Ссылка на facebook"
        />
        <SimpleFormField
          variant="outlined"
          name="telegram"
          label="Telegram ник (например @g8)"
        />
        <SimpleFormField
          variant="outlined"
          name="instagram"
          label="Ссылка на instagram"
        />
        <SimpleFormField
          variant="outlined"
          name="vkontakte"
          label="Ссылка на vkontakte"
        />
        <SimpleFormField
          variant="outlined"
          name="site"
          label="Ссылка на сайт"
        />
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={
            isSubmitting && <CircularProgress color="secondary" size={20} />
          }
        >
          Сохранить
        </Button>
      </Form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
