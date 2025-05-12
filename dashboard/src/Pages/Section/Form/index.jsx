import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import Checkbox from 'Components/Form/Checkbox';
import EditorField from 'Components/Form/Editor';
import { SectionContext } from 'Context/Section';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// import StatusSelectField from './StatusSelect';
import { setDefaultValues } from './helpers';
import SeasonsSelect from './SeasonSelect';

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

export default function SectionForm() {
  const [section, setSection] = useContext(SectionContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(section),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const { handleError } = useAPIError(setError);

  const updateSection = async (values) => {
    try {
      const response = await Api.put(Api.routes.section(section.id), values);
      setSection(response.results);
      enqueueSnackbar(
        `Секция "${response.results.name_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createSection = async (values) => {
    try {
      const response = await Api.post(Api.routes.sections(), values);
      // reset(setDefaultValues(response.results));
      setSection(response.results);
      enqueueSnackbar(`Секция "${response.results.name_ru}" успешно создана`, {
        variant: 'success',
      });
      history.push(routes.sectionPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    if (section?.id) {
      updateSection(values);
    } else {
      createSection(values);
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
            {section && (
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
                  redirectLink={routes.sections()}
                  deleteUrl={Api.routes.section(section.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
        <SeasonsSelect name="season_id" label="Сезон" />
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
        <EditorField name="description_ru" label="Описание на русском" />
        <EditorField name="description_en" label="Описание на английском" />
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
