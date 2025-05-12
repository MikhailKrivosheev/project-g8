import { DevTool } from '@hookform/devtools';
import { Button, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Api from 'Api';
import Checkbox from 'Components/Form/Checkbox';
import Form from 'Components/Form';
import SimpleFormField from 'Components/Form/Simple';
import ModalDelete from 'Components/modals/ModalDelete';
import { AlbumContext } from 'Context/Album';
import routes from 'Dictionaries/routes';
import useAPIError from 'Hooks/useAPIError';
import { useSnackbar } from 'notistack';
import React, { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import TypeSelect from './TypeSelect';
import GalleryFiles from './Gallery';
import SeasonSelect from './SeasonSelect';
import { setDefaultValues } from './helpers';

export default function AlbumForm() {
  const [album, setAlbum] = useContext(AlbumContext);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const history = useHistory();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(album),
  });
  const { enqueueSnackbar } = useSnackbar();
  const {
    reset,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting },
  } = methods;
  const typeWatcher = watch('type');

  const { handleError } = useAPIError(setError);

  const updateAlbum = async (values) => {
    try {
      const response = await Api.put(Api.routes.album(album.id), values);
      setAlbum(response.results);
      enqueueSnackbar(
        `Галерея "${response.results.title_ru}" успешно обновлена`,
        {
          variant: 'success',
        }
      );
    } catch (error) {
      handleError(error);
    }
  };

  const createAlbum = async (values) => {
    try {
      const response = await Api.post(Api.routes.albums(), values);
      // reset(setDefaultValues(response.results));
      setAlbum(response.results);
      enqueueSnackbar(
        `Галерея "${response.results.title_ru}" успешно создана`,
        {
          variant: 'success',
        }
      );
      history.push(routes.albumPage(response.results.id));
    } catch (error) {
      handleError(error);
    }
  };

  function onSubmit(values) {
    const { gallery_photo: galleryPhoto, gallery_video: galleryVideo } = values;
    const modificatedValues = {
      ...values,
      gallery: values.type === 'photo' ? galleryPhoto : galleryVideo,
    };
    delete modificatedValues.gallery_photo;
    if (album?.id) {
      updateAlbum(modificatedValues);
    } else {
      createAlbum(modificatedValues);
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
        <SimpleFormField
          variant="outlined"
          name="title_ru"
          label="Наименование галереи на русском"
          required
        />
        <SimpleFormField
          variant="outlined"
          name="title_en"
          label="Наименование галереи на английском"
          required
        />
        <TypeSelect name="type" label="Тип галереи" required />
        <SimpleFormField variant="outlined" name="year" label="год" />
        <SeasonSelect name="album_season" label="Время года" />
        <GalleryFiles type={typeWatcher} />
        <Checkbox name="is_home" label="Показать альбом на главной" required />
        <Grid container spacing={3}>
          <Grid item>
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 0 }}
              startIcon={
                isSubmitting && <CircularProgress color="secondary" size={20} />
              }
            >
              Сохранить
            </Button>
          </Grid>
          <Grid item>
            {album && (
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
                  redirectLink={routes.albums()}
                  deleteUrl={Api.routes.album(album.id)}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Form>
      <DevTool control={methods.control} />
    </FormProvider>
  );
}
