import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import ColorPickerField from 'Components/Form/ColorPicker';
import File from 'Components/Form/File';
import Checkbox from 'Components/Form/Checkbox';
import { SponsorContext } from 'Context/Sponsor';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import TypeSelect from './TypeSelect';
import { setDefaultValues } from './helpers';
import SeasonSelect from './SeasonSelect';

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

export default function SponsorForm() {
  const [sponsor, setSponsor] = useContext(SponsorContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(sponsor),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateSponsor = async (values) => {
    try {
      const response = await Api.put(Api.routes.sponsor(sponsor.id), values);
      setSponsor(response.results);
      enqueueSnackbar(`Спонсор "${response.results.name}" успешно обновлен`, {
        variant: 'success',
      });
    } catch (error) {
      handleError(error);
    }
  };

  const createSponsor = async (values) => {
    try {
      const response = await Api.post(Api.routes.sponsors(), values);
      setSponsor(response.results);
      enqueueSnackbar(`Спонсор "${response.results.name}" успешно создан`, {
        variant: 'success',
      });
      history.push(routes.sponsorPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (sponsor?.id) {
      updateSponsor(values);
    } else {
      createSponsor(values);
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
            {sponsor && (
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
                  redirectLink={routes.sponsors()}
                  deleteUrl={Api.routes.sponsor(sponsor.id)}
                />
              </>
            )}
          </Grid>
        </Grid>

        <SeasonSelect name="season_id" label="Сезон" required />
        <TypeSelect name="sponsor_type_id" label="Тип спонсора" required />
        <SimpleFormField
          variant="outlined"
          name="name"
          label="Название"
          required
        />
        <File
          name="logo"
          label="Логотип"
          accept={['.png', '.svg', '.jpg', '.jpeg']}
          required
        />
        <SimpleFormField
          variant="outlined"
          name="link"
          label="Ссылка"
          type="link"
        />
        <ColorPickerField
          name="background_color_logo"
          label="Цвет фона спикера"
        />
        <Checkbox name="published" label="Статус видимости" />
        <Checkbox name="accented" label="Блок во всю ширину" />
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
