import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import Checkbox from 'Components/Form/Checkbox';
import EditorField from 'Components/Form/Editor';
import { RoomContext } from 'Context/Room';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import StatusSelectField from './StatusSelect';
import { setDefaultValues } from './helpers';
import SeasonsSelect from './PlaceSelect';

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

export default function RoomForm() {
  const [room, setRoom] = useContext(RoomContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(room),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateRoom = async (values) => {
    try {
      const response = await Api.put(Api.routes.room(room.id), values);
      setRoom(response.results);
      enqueueSnackbar(
        `Комната "${response.results.name_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createRoom = async (values) => {
    try {
      const response = await Api.post(Api.routes.rooms(), values);
      // reset(setDefaultValues(response.results));
      setRoom(response.results);
      enqueueSnackbar(`Комната "${response.results.name_ru}" успешно создана`, {
        variant: 'success',
      });
      history.push(routes.roomPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (room?.id) {
      updateRoom(values);
    } else {
      createRoom(values);
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
            {room && (
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
                  redirectLink={routes.rooms()}
                  deleteUrl={Api.routes.room(room.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <SeasonsSelect name="place_id" label="Место проведения" />
        <SimpleFormField
          variant="outlined"
          name="name_ru"
          label="Наименование на русском"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="name_en"
          label="Наименование на английском"
          required
        />
        <Checkbox name="published" label="Отображать ли страницу" />
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
